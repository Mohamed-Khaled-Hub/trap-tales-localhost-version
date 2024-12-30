import { useState } from 'react'
// Types
import { TypeTitleProps } from '../types/Types.ts'
// Functions
import { getFromAssets } from '../functions/Functions.ts'
// Hooks
import { useTheme } from '../hooks/Hooks.ts'
// Styles
import '../styles/components/TypeTitle.css'

const TypeTitle = ({ children, onClick }: TypeTitleProps) => {
    // Change Arrow Image
    const [isDownOrUp, setIsDownOrUp] = useState<boolean>(true)
    // Current Theme
    const theme = useTheme()

    return (
        <h1
            className='type-title'
            onClick={() => {
                onClick()
                setIsDownOrUp((prev) => !prev)
            }}
        >
            {children}
            <img
                className='svg-standard'
                src={getFromAssets(
                    `svg/${theme}/ARROW_${isDownOrUp ? 'UP' : 'DOWN'}.svg`
                )}
                alt={isDownOrUp ? 'Close' : 'Open'}
            />
        </h1>
    )
}

export default TypeTitle
