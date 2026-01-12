'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type DispatchCommand = {
    id: string;
    assetId: string;
    targetMW: number;
    rampRate: number; // MW/min
    status: 'pending' | 'sending' | 'acknowledged' | 'executing' | 'completed' | 'failed';
    timestamp: string;
};

export default function DispatchSimulator() {
    const t = useTranslations('dispatch');
    const [targetMW, setTargetMW] = useState(10);
    const [selectedAsset, setSelectedAsset] = useState('BESS-0042');
    const [commands, setCommands] = useState<DispatchCommand[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleDispatch = () => {
        setIsProcessing(true);

        const newCommand: DispatchCommand = {
            id: Math.random().toString(36).substr(2, 9),
            assetId: selectedAsset,
            targetMW: targetMW,
            rampRate: 5,
            status: 'sending',
            timestamp: new Date().toLocaleTimeString(),
        };

        setCommands(prev => [newCommand, ...prev]);

        // 模拟指令执行流程
        setTimeout(() => {
            updateCommandStatus(newCommand.id, 'acknowledged');
        }, 1500);

        setTimeout(() => {
            updateCommandStatus(newCommand.id, 'executing');
        }, 3000);

        setTimeout(() => {
            updateCommandStatus(newCommand.id, 'completed');
            setIsProcessing(false);
        }, 6000);
    };

    const updateCommandStatus = (id: string, status: DispatchCommand['status']) => {
        setCommands(prev => prev.map(cmd => cmd.id === id ? { ...cmd, status } : cmd));
    };

    const getStatusColor = (status: DispatchCommand['status']) => {
        switch (status) {
            case 'sending': return 'text-slate-400';
            case 'acknowledged': return 'text-blue-400';
            case 'executing': return 'text-amber-400';
            case 'completed': return 'text-green-400';
            case 'failed': return 'text-red-400';
            default: return 'text-slate-500';
        }
    };

    const getStatusIcon = (status: DispatchCommand['status']) => {
        if (status === 'sending') return <span className="animate-spin mr-2">⟳</span>;
        if (status === 'executing') return <span className="animate-pulse mr-2">⚡</span>;
        if (status === 'completed') return <span className="mr-2">✓</span>;
        return null;
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* 控制面板 */}
            <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                    Manual Dispatch Control
                </h3>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Target Asset</label>
                        <select
                            value={selectedAsset}
                            onChange={(e) => setSelectedAsset(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                        >
                            <option value="BESS-0042">BESS-0042 (Battery Storage)</option>
                            <option value="PV-2847">PV-2847 (Solar Farm)</option>
                            <option value="WIND-0156">WIND-0156 (Wind Farm)</option>
                            <option value="CHP-Warsaw">CHP-Warsaw (Thermal)</option>
                        </select>
                    </div>

                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-medium text-slate-400">Set Point (MW)</label>
                            <span className="text-sm font-bold text-blue-400">{targetMW} MW</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="50"
                            step="1"
                            value={targetMW}
                            onChange={(e) => setTargetMW(Number(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-1">
                            <span>0 MW</span>
                            <span>25 MW</span>
                            <span>50 MW</span>
                        </div>
                    </div>

                    <button
                        onClick={handleDispatch}
                        disabled={isProcessing}
                        className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all
                    ${isProcessing
                                ? 'bg-blue-600/50 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/20 active:scale-[0.98]'
                            }`}
                    >
                        {isProcessing ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Sending Command...
                            </span>
                        ) : (
                            'EXECUTE DISPATCH'
                        )}
                    </button>
                </div>
            </div>

            {/* 指令日志 */}
            <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 h-full max-h-[400px] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Command Log</h3>
                    <span className="text-xs text-slate-500">Live Stream</span>
                </div>

                <div className="space-y-3">
                    {commands.length === 0 && (
                        <div className="text-center py-8 text-slate-500 border-2 border-dashed border-slate-700 rounded-lg">
                            No active commands
                        </div>
                    )}
                    {commands.map((cmd) => (
                        <div key={cmd.id} className="p-3 bg-slate-900/50 border border-slate-700/50 rounded-lg flex items-center justify-between group hover:border-blue-500/30 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg bg-slate-800 ${getStatusColor(cmd.status)}`}>
                                    {getStatusIcon(cmd.status) || '●'}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-sm text-white font-bold">{cmd.targetMW} MW</span>
                                        <span className="text-slate-600 text-xs">→</span>
                                        <span className="text-sm text-slate-300">{cmd.assetId}</span>
                                    </div>
                                    <span className="text-xs text-slate-500 font-mono">{cmd.id} • {cmd.timestamp}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className={`text-xs font-bold uppercase tracking-wider ${getStatusColor(cmd.status)}`}>
                                    {cmd.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
