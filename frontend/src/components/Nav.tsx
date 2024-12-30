import { useContext, useState } from 'react'
// Contexts
import { WindowResizeContext, SiteInfoContext } from '../contexts/Contexts.ts'
// Components
import Button from './Button.tsx'
import SearchInput from './SearchInput.tsx'
// Styles
import '../styles/components/Nav.css'

const Nav = () => {
    // SearchInput Input Value
    const [searchInputValue, setSearchInputValue] = useState<string>('')
    // Site Info Context
    const siteInfo = useContext(SiteInfoContext)
    // Window Size Context
    const windowResized = useContext(WindowResizeContext)

    return (
        <div className='nav'>
            <div className='left'>
                <SearchInput
                    searchQueryState={[searchInputValue, setSearchInputValue]}
                />
            </div>
            <div className='middle'>
                {windowResized && <div className='nav-square'></div>}
                <Button type='link' to={'/'} noBg={true} className='logo-link'>
                    {siteInfo.websiteName}
                </Button>
                {windowResized && <div className='nav-square'></div>}
            </div>
            <div className='right'></div>
        </div>
    )
}

export default Nav
