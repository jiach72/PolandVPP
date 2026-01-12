'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type Bid = {
    id: string;
    quantity: number;
    price: number;
    direction: 'upward' | 'downward';
    status: 'pending' | 'accepted' | 'rejected' | 'partial' | 'expired';
    time: string;
};

export default function BiddingSimulator({ initialBids }: { initialBids: Bid[] }) {
    const t = useTranslations('market');
    const [bids, setBids] = useState<Bid[]>(initialBids);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [direction, setDirection] = useState<'upward' | 'downward'>('upward');

    const statusColors: Record<string, string> = {
        pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
        accepted: 'bg-green-500/20 text-green-400 border-green-500/30',
        rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
        partial: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        expired: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate network delay
        setTimeout(() => {
            const newBid: Bid = {
                id: `BID-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
                quantity: Number(quantity),
                price: Number(price),
                direction: direction,
                status: 'pending',
                time: new Date().toLocaleTimeString('en-GB', { hour12: false }),
            };

            setBids([newBid, ...bids]);
            setIsSubmitting(false);
            setIsFormOpen(false);
            // Reset form
            setQuantity('');
            setPrice('');
        }, 1000);
    };

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">{t('title')}</h1>
                    <p className="text-slate-400 mt-1">{t('subtitle')}</p>
                </div>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors cursor-pointer"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    {t('bidding.newBid')}
                </button>
            </div>

            {/* Bidding Modal */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
                        <h2 className="text-xl font-bold text-white mb-4">{t('bidding.newBid')}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">{t('bidding.type')}</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setDirection('upward')}
                                        className={`py-2 px-3 rounded-lg border text-sm font-medium transition-colors ${direction === 'upward' ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}
                                    >
                                        Upward
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setDirection('downward')}
                                        className={`py-2 px-3 rounded-lg border text-sm font-medium transition-colors ${direction === 'downward' ? 'bg-amber-500/20 border-amber-500 text-amber-400' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}
                                    >
                                        Downward
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Quantity (MW)</label>
                                <input
                                    type="number"
                                    required
                                    min="0.1"
                                    step="0.1"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    placeholder="e.g. 10.5"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Price (PLN/MWh)</label>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    placeholder="e.g. 450"
                                />
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsFormOpen(false)}
                                    className="flex-1 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors border border-transparent"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Bid'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Inject this content back where My Bids list was, OR expose the bids state to the parent. 
          For simplicity in this task mode, I'll render the list directly here which replaces the static list in parent.
      */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* ... Other components will be passed as children or slots in a real app, 
                but here we need to fit into the existing page structure. 
                Wait, replacing the whole page logic might be better or extracting the BidsList.
                Let's make this component just handle the Header + Modal + Bids List. 
            */}
            </div>

            {/* NOTE: To integrate cleanly without rewriting the whole MarketPage structure again,
           I will export a component 'BiddingSection' that takes the place of the "My Bids" right column.
           But the user asked for the simulator.
           Let's rewrite this file to be just the "My Bids" section which manages its own state.
       */}
        </>
    );
}

// Redefining the component to just be the "My Bids" card
export function BiddingWidget({ initialBids }: { initialBids: Bid[] }) {
    const t = useTranslations('market');
    const [bids, setBids] = useState<Bid[]>(initialBids);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [direction, setDirection] = useState<'upward' | 'downward'>('upward');

    const statusColors: Record<string, string> = {
        pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
        accepted: 'bg-green-500/20 text-green-400 border-green-500/30',
        rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
        partial: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        expired: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate network delay
        setTimeout(() => {
            const newBid: Bid = {
                id: `BID-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
                quantity: Number(quantity),
                price: Number(price),
                direction: direction,
                status: 'pending',
                time: new Date().toLocaleTimeString('en-GB', { hour12: false }),
            };

            setBids([newBid, ...bids]);
            setIsSubmitting(false);
            setIsFormOpen(false);
            // Reset form
            setQuantity('');
            setPrice('');
        }, 1000);
    };

    return (
        <>
            <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">{t('bidding.myBids')}</h3>
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="text-xs px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors"
                    >
                        + New
                    </button>
                </div>
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
                    {bids.map((bid) => (
                        <div key={bid.id} className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/50">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-mono text-slate-300">{bid.id}</span>
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${statusColors[bid.status]}`}>
                                    {t(`bidding.status.${bid.status}`)}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-lg font-bold text-white">{bid.quantity} MW</p>
                                    <p className="text-sm text-slate-400">{bid.price} PLN/MWh</p>
                                </div>
                                <div className="text-right">
                                    <p className={`text-sm font-medium ${bid.direction === 'upward' ? 'text-green-400' : 'text-amber-400'}`}>
                                        {t(`bidding.${bid.direction}`)}
                                    </p>
                                    <p className="text-xs text-slate-500">{bid.time}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="w-full mt-4 py-2 text-sm text-blue-400 hover:text-blue-300 border border-slate-600 hover:border-blue-500/50 rounded-lg transition-colors cursor-pointer">
                    {t('bidding.bidHistory')}
                </button>
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
                        <h2 className="text-xl font-bold text-white mb-4">{t('bidding.newBid')}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">{t('bidding.type')}</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setDirection('upward')}
                                        className={`py-2 px-3 rounded-lg border text-sm font-medium transition-colors ${direction === 'upward' ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}
                                    >
                                        Upward
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setDirection('downward')}
                                        className={`py-2 px-3 rounded-lg border text-sm font-medium transition-colors ${direction === 'downward' ? 'bg-amber-500/20 border-amber-500 text-amber-400' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}
                                    >
                                        Downward
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Quantity (MW)</label>
                                <input
                                    type="number"
                                    required
                                    min="0.1"
                                    step="0.1"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    placeholder="e.g. 10.5"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Price (PLN/MWh)</label>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    placeholder="e.g. 450"
                                />
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsFormOpen(false)}
                                    className="flex-1 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors border border-transparent"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Bid'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
