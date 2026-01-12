'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type AssetControlPanelProps = {
    isOpen: boolean;
    onClose: () => void;
    assetName?: string;
    assetId?: string;
    maxOutput?: number;
};

export default function AssetControlPanel({ isOpen, onClose, assetName = 'Unknown Asset', assetId = '---', maxOutput = 50 }: AssetControlPanelProps) {
    const [output, setOutput] = useState(maxOutput * 0.8);
    const [isSyncing, setIsSyncing] = useState(false);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOutput(Number(e.target.value));
    };

    const handleApply = () => {
        setIsSyncing(true);
        setTimeout(() => {
            setIsSyncing(false);
            onClose();
        }, 1500);
    };

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
                    onClick={onClose}
                />
            )}

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-slate-900 border-l border-slate-700 shadow-2xl z-[101] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-bold text-white">Asset Control</h2>
                            <p className="text-sm text-slate-400 font-mono mt-1">{assetId}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 space-y-8 overflow-y-auto">
                        <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                            <p className="text-sm text-slate-400 mb-1">Asset Name</p>
                            <p className="text-lg font-bold text-white">{assetName}</p>
                        </div>

                        <div>
                            <div className="flex justify-between mb-4">
                                <label className="text-sm font-medium text-slate-300">Power Output Setpoint</label>
                                <span className="text-sm font-bold text-blue-400">{output.toFixed(1)} MW</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max={maxOutput}
                                step="0.1"
                                value={output}
                                onChange={handleSliderChange}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />
                            <div className="flex justify-between text-xs text-slate-500 mt-2">
                                <span>0 MW</span>
                                <span>{maxOutput} MW</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                                <p className="text-xs text-slate-400">Ramp Rate</p>
                                <p className="text-white font-mono">5 MW/min</p>
                            </div>
                            <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                                <p className="text-xs text-slate-400">Control Mode</p>
                                <p className="text-amber-400 font-mono">Remote</p>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-slate-700 bg-slate-900">
                        <button
                            onClick={handleApply}
                            disabled={isSyncing}
                            className={`w-full py-3.5 px-4 rounded-xl font-bold text-white transition-all
                        ${isSyncing
                                    ? 'bg-blue-600/50 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/25 active:scale-[0.98]'
                                }`}
                        >
                            {isSyncing ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Syncing with SCADA...
                                </span>
                            ) : (
                                'Apply New Setpoint'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
