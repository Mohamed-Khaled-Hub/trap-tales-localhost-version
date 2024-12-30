import { createContext } from 'react'
// Types
import { SiteInfoContextType } from '../types/Types.ts'

export const SiteInfoContext = createContext({} as SiteInfoContextType)

export const WindowResizeContext = createContext(window.innerWidth < 500)

export const AnotherWindowResizeContext = createContext(
    window.innerHeight < 400
)
