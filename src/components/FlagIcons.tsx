import React from 'react';

export function FlagPL({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="16" fill="#F5F5F5" />
            <mask id="pl-mask">
                <rect width="32" height="32" rx="16" fill="white" />
            </mask>
            <g mask="url(#pl-mask)">
                <path fill="#EB2D37" d="M0 16h32v16H0z" />
                <path fill="#FFFFFF" d="M0 0h32v16H0z" />
            </g>
            <rect width="32" height="32" rx="16" fill="none" stroke="rgba(0,0,0,0.1)" />
        </svg>
    );
}

export function FlagGB({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="16" fill="#012169" />
            <mask id="gb-mask">
                <rect width="32" height="32" rx="16" fill="white" />
            </mask>
            <g mask="url(#gb-mask)">
                <path stroke="#FFF" strokeWidth="6" d="M0 0l32 32M32 0L0 32" />
                <path stroke="#C8102E" strokeWidth="4" d="M0 0l32 32M32 0L0 32" />
                <path stroke="#FFF" strokeWidth="10" d="M16 0v32M0 16h32" />
                <path stroke="#C8102E" strokeWidth="6" d="M16 0v32M0 16h32" />
            </g>
            <rect width="32" height="32" rx="16" fill="none" stroke="rgba(0,0,0,0.1)" />
        </svg>
    );
}

export function FlagCN({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="16" fill="#DE2910" />
            <mask id="cn-mask">
                <rect width="32" height="32" rx="16" fill="white" />
            </mask>
            <g mask="url(#cn-mask)">
                <metadata>Created by Wikipedia User:Kallgan</metadata>
                <path fill="#FFDE00" d="M5.3 12.5l2.2-1.9 2.8 0.6-1.7-2.3 0.8-2.8-2.5 1.4-2.4-1.5 0.7 2.8-1.8 2.3 2.8-0.5z M10.4 7.4l0.3-0.9 0.9 0.2-0.5 0.7 0.2 0.8-0.8-0.4-0.8 0.5 0.2-0.9-0.6-0.6 0.9-0.1z M12.8 9.1l0.3-0.9 0.9 0.3-0.6 0.7 0.2 0.8-0.7-0.5-0.8 0.5 0.3-0.9-0.6-0.7 0.8-0.1z M12.9 12.3l0.4-0.9 0.9 0.2-0.5 0.8 0.2 0.8-0.8-0.4-0.8 0.4 0.2-0.9-0.6-0.6 0.9-0.1z M10.4 14.2l0.4-0.9 0.9 0.1-0.5 0.8 0.2 0.9-0.8-0.5-0.8 0.4 0.2-0.8-0.6-0.7 0.9 0z" />
            </g>
            <rect width="32" height="32" rx="16" fill="none" stroke="rgba(0,0,0,0.1)" />
        </svg>
    );
}
