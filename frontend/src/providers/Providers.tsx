import {
    QueryClient,
    QueryClientProvider as QueryProvider,
} from '@tanstack/react-query'
import { PropsWithChildren, useEffect, useState } from 'react'
// Types
import { SiteInfoContextType } from '../types/Types.ts'
// Contexts
import {
    SiteInfoContext,
    WindowResizeContext,
    AnotherWindowResizeContext,
} from '../contexts/Contexts.ts'

export const QueryClientProvider = ({ children }: PropsWithChildren) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                gcTime: 0,
                retry: false,
                staleTime: Infinity,
                refetchOnMount: 'always',
                refetchOnReconnect: 'always',
                refetchOnWindowFocus: false,
            },
        },
    })

    return <QueryProvider client={queryClient}>{children}</QueryProvider>
}

export const SiteInfoProvider = ({ children }: PropsWithChildren) => {
    const siteInfo: SiteInfoContextType = {
        websiteName: 'Trap Tales',
        frontendUrl: 'http://localhost:5173',
        backendUrl: 'http://localhost:7215',
        published: 2024,
    }

    return (
        <SiteInfoContext.Provider value={siteInfo}>
            {children}
        </SiteInfoContext.Provider>
    )
}

export const WindowResizeProvider = ({ children }: PropsWithChildren) => {
    const [windowResize, setWindowResize] = useState<boolean>(
        window.innerWidth < 500
    )

    useEffect(() => {
        // Handle Window Resizing
        const handleWindowResize = () =>
            setWindowResize(window.innerWidth < 500)

        // Add EventListener
        window.addEventListener('resize', handleWindowResize)

        // Remove EventListener
        return () => window.removeEventListener('resize', handleWindowResize)
    }, [])

    return (
        <WindowResizeContext.Provider value={windowResize}>
            {children}
        </WindowResizeContext.Provider>
    )
}

export const AnotherWindowResizeProvider = ({
    children,
}: PropsWithChildren) => {
    const [anotherWindowResize, setAnotherWindowResize] = useState<boolean>(
        window.innerHeight < 400
    )

    useEffect(() => {
        // Handle Window Resizing
        const handleWindowResize = () =>
            setAnotherWindowResize(window.innerHeight < 400)

        // Add EventListener
        window.addEventListener('resize', handleWindowResize)

        // Remove EventListener
        return () => window.removeEventListener('resize', handleWindowResize)
    }, [])

    return (
        <AnotherWindowResizeContext.Provider value={anotherWindowResize}>
            {children}
        </AnotherWindowResizeContext.Provider>
    )
}
