import { useState, useEffect } from 'react';

// 辅助函数：生成带波动的随机数
// value: 基准值, range: 波动范围百分比 (例如 0.02 表示 ±2%)
function fluctuate(baseValue: number, fluctuationRange: number = 0.01) {
    const delta = baseValue * fluctuationRange;
    const change = (Math.random() - 0.5) * 2 * delta;
    return baseValue + change;
}

export function useLiveData() {
    // 初始基准值
    const [data, setData] = useState({
        totalCapacity: 1250,
        activeAssets: 2847,
        upRegulation: 320,
        downRegulation: 185,
        marketPrice: 487.50,
        avgPrice: 465.20,
        maxPrice: 512.00,
        minPrice: 398.50,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setData(prev => ({
                totalCapacity: 1250, // 容量通常固定，或者是由于 asset 上下线缓慢变化，这里暂定固定
                activeAssets: Math.floor(fluctuate(2847, 0.005)), // 资产数量偶尔变动
                upRegulation: fluctuate(320, 0.05), // 调节量波动较大
                downRegulation: fluctuate(185, 0.05),
                marketPrice: fluctuate(487.50, 0.02), // 价格微小波动
                avgPrice: 465.20,
                maxPrice: 512.00,
                minPrice: 398.50,
            }));
        }, 2000); // 2秒刷新一次

        return () => clearInterval(interval);
    }, []);

    return data;
}
