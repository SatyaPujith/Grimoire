import React from 'react';

export const SkullIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2C7.58 2 4 5.58 4 10c0 2.62 1.27 4.94 3.25 6.38A3.003 3.003 0 007 19v1h2v-1c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v1h2v-1a3.003 3.003 0 00-.25-2.62C18.73 14.94 20 12.62 20 10c0-4.42-3.58-8-8-8zm-5 8c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1-.91.63-1.46 1.6-1.74 2.65l-.11.4H8l-.11-.4c-.28-1.05-.83-2.02-1.74-2.65A4.98 4.98 0 017 10zM9 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
    </svg>
);

export const GhostIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2a9 9 0 00-9 9v7c0 1.66 1.34 3 3 3 1.66 0 3-1.34 3-3 1.66 0 3 1.34 3 3s3-1.34 3-3 1.66 0 3 1.34 3 3 1.66 0 3-1.34 3-3v-7a9 9 0 00-9-9zm-3 10a2 2 0 110-4 2 2 0 010 4zm6 0a2 2 0 110-4 2 2 0 010 4z" />
    </svg>
);

export const SpiderWebIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 2v20" />
        <path d="M2 12h20" />
        <path d="M4.93 4.93l14.14 14.14" />
        <path d="M19.07 4.93L4.93 19.07" />
        <path d="M12 7a5 5 0 0 1 0 10 5 5 0 0 1 0-10" />
        <path d="M12 10a2 2 0 0 1 0 4 2 2 0 0 1 0-4" />
    </svg>
);

export const ScrollIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M14.5 2.5a2.5 2.5 0 00-5 0V4H8a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2h-1.5V2.5zM11 4V2.5a.5.5 0 011 0V4h-1z" opacity="0.8"/>
        <path d="M6 6a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H8a2 2 0 01-2-2V6z" />
    </svg>
);

export const BatIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className={className}>
         <path d="M495.4 163c-14.4-6.6-43.7-18.7-77.9-20.9-10.9-.7-23.7.2-34 3.7-8.2 2.8-15.3 7-22 13-17.7 15.9-32.3 35.8-49.4 53.6-6.1 6.3-12.7 12.3-19.4 18-5.7-4.8-11.3-9.9-16.7-15.3-20.8-21-39.7-43.2-61.6-61.9-8.3-7.1-17.1-11.9-27.1-14.8-12.2-3.6-26.9-3.9-39.3-1.8-35.8 5.7-65.7 21.3-79.6 28.7-15.6 8.3-25.1 26.2-22.1 41.7 2.4 12.6 15 21.8 28.3 20.6 11.2-1 25.8-8.5 37-14.5 9-4.8 17.5-10 26.3-14.1 8-3.7 16.5-7.3 26.6-7.5 12.1-.2 20.4 6 25.8 10.9 9.3 8.3 17.6 18.2 25.6 27.5 14.5 16.9 28.6 33.3 45.4 47.7 4.1 3.5 8.4 6.8 13.1 9.7 10.5 6.6 21.8 10.9 33.1 12.3 11.8 1.5 24.3-.8 34.6-6.7 5.6-3.2 10.7-7 15.6-11 19.3-15.9 35.3-33.8 51.7-52.2 9.2-10.4 18.9-21.4 30.1-30.7 6.4-5.3 16.2-12 28.9-11.8 10.4.2 19.3 4 27.8 8 10.9 5.2 19.8 11.2 29.5 16.9 11.8 7 24.8 15.2 36.3 15.8 13.5.7 25.9-8.8 27.9-21.3 2.2-13.6-5.8-31.5-18.9-40.3z"/>
    </svg>
);

export const PumpkinIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2c-.5 0-1 .45-1 1v2c-2.76 0-5 2.24-5 5v1c-1.1 0-2 .9-2 2s.9 2 2 2v2c0 2.76 2.24 5 5 5s5-2.24 5-5v-2c1.1 0 2-.9 2-2s-.9-2-2-2V10c0-2.76-2.24-5-5-5V3c0-.55-.5-1-1-1zm1 14h-2v-2h2v2zm-4 0H7v-2h2v2zm8 0h-2v-2h2v2z" />
    </svg>
);

export const SwordIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M14.5 17.5L3 6V3h3l11.5 11.5L21 11l3 3-5 5-1.5-1.5z" />
        <path d="M4 22l4-4" stroke="currentColor" strokeWidth="2" />
    </svg>
);