import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
// Types
import { SearchInputProps } from '../types/Types.ts'
// Functions
import { getFromAssets } from '../functions/Functions.ts'
// Hooks
import { useTheme } from '../hooks/Hooks.ts'
// Components
import Button from './Button.tsx'
// Styles
import '../styles/components/SearchInput.css'

const SearchInput = ({ searchQueryState }: SearchInputProps) => {
    const [searchQuery, setSearchQuery] = searchQueryState
    // Form Reference
    const formRef = useRef<HTMLFormElement>(null)
    // Current Theme
    const theme = useTheme()
    // Navigate
    const navigate = useNavigate()

    return (
        <form
            id='search-form'
            ref={formRef}
            onSubmit={() => {
                navigate(`/search/${searchQuery}`)
            }}
        >
            <input
                id='search-input'
                type='text'
                placeholder='Search'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
                type='button'
                onClick={() => formRef.current?.requestSubmit()}
                noBg={true}
            >
                <img
                    src={getFromAssets(`svg/${theme}/SEARCH.svg`)}
                    alt='Search'
                />
            </Button>
        </form>
    )
}

export default SearchInput
