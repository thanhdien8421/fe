"use client"
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
export const ProgressBarLayout = ( {
children
}: {
    children: React.ReactNode
}) => {
    return (
        <>
        <ProgressBar/>
        {children}
        </>
    )
}