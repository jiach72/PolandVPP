'use client';

import CountUp from 'react-countup';

type Props = {
    end: number;
    decimals?: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
    className?: string;
    separator?: string;
};

export default function CountUpNumber({
    end,
    decimals = 0,
    duration = 2,
    prefix = '',
    suffix = '',
    className = '',
    separator = ','
}: Props) {
    return (
        <CountUp
            end={end}
            decimals={decimals}
            duration={duration}
            prefix={prefix}
            suffix={suffix}
            separator={separator}
            className={className}
            preserveValue={true}
        />
    );
}
