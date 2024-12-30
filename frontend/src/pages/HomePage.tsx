import { useContext, useEffect } from 'react'
// Functions
import { getFromAssets } from '../functions/Functions.ts'
// Hooks
import { useTheme } from '../hooks/Hooks.ts'
// Contexts
import { SiteInfoContext } from '../contexts/Contexts.ts'
// Components
import Button from '../components/Button.tsx'
import BackgroundVideo from '../components/BackgroundVideo.tsx'
// Styles
import '../styles/pages/HomePage.css'

const HomePage = () => {
    // Site Info Context
    const siteInfo = useContext(SiteInfoContext)
    // Current Theme
    const theme = useTheme()

    useEffect(() => {
        document.title = `${siteInfo.websiteName} | Home`
    }, [])

    return (
        <div className='home-page'>
            <div className='section'>
                <BackgroundVideo videoSrc={getFromAssets('video/Home.mp4')} />
                <div className='logo-slogan-container'>
                    <h1>
                        <Button
                            type='link'
                            to={siteInfo.frontendUrl}
                            noBg={true}
                        >
                            {siteInfo.websiteName}
                        </Button>
                    </h1>
                    <p>Save your music experience</p>
                </div>
            </div>
            <div className='section'>
                <div>
                    <h2>
                        The code for this website in my
                        <Button
                            noBg={true}
                            type='link'
                            target='_blank'
                            className='github'
                            to='https://github.com/Mohamed-Khaled-Hub'
                        >
                            <img
                                src={getFromAssets(`svg/${theme}/GITHUB.svg`)}
                                alt='My Repo'
                            />
                        </Button>
                    </h2>
                </div>
                <div>
                    Integration
                    <Button
                        type='link'
                        to='https://open.spotify.com/'
                        className='spotify'
                        target='_blank'
                        noBg={true}
                    >
                        Spotify
                    </Button>
                    <h3>+</h3>
                    <Button
                        type='link'
                        target='_blank'
                        to='https://genius.com/'
                        className='genius'
                        noBg={true}
                    >
                        Genius
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HomePage
