import { useContext, useEffect, useRef, useState } from 'react'
// Types
import { YouTubeVideoProps } from '../types/Types.ts'
// Functions
import { getFromAssets } from '../functions/Functions.ts'
// Hooks
import { useTheme } from '../hooks/Hooks.ts'
// Contexts
import { AnotherWindowResizeContext } from '../contexts/Contexts.ts'
// Components
import Button from './Button.tsx'
// Styles
import '../styles/components/YoutubeVideo.css'

const YoutubeVideo = ({ videoId }: YouTubeVideoProps) => {
    // Another Window Resize Context
    const anotherWindowResized = useContext(AnotherWindowResizeContext)
    // Video Opened State
    const [videoOpened, setVideoOpened] = useState<boolean>(true)
    // Sent to Left State
    const [sentToRight, setSentToRight] = useState<boolean>(true)
    // References
    const iFrameRef = useRef<HTMLIFrameElement | null>(null)
    const youtubeButton = useRef<HTMLButtonElement | null>(null)
    const closeButton = useRef<HTMLButtonElement | null>(null)
    const sendToRightButtonRef = useRef<HTMLButtonElement | null>(null)
    // Current Theme
    const theme = useTheme()

    useEffect(() => {
        iFrameRef.current!.style.cssText = `display: ${videoOpened ? 'block' : 'none'}`
        closeButton.current!.style.cssText = `display: ${videoOpened ? 'flex' : 'none'}`
        youtubeButton.current!.style.cssText = `display: ${videoOpened ? 'none' : 'flex'}`
    })

    useEffect(() => {
        setSentToRight(!anotherWindowResized)
        setVideoOpened(true)
    }, [anotherWindowResized])

    return (
        <>
            {!sentToRight && <h1 className='section-title'>Video</h1>}
            <div
                className={
                    anotherWindowResized
                        ? 'youtube-video-container youtube-in-page'
                        : 'youtube-video-container' +
                          (videoOpened ? '' : ' closed') +
                          (sentToRight ? '' : ' youtube-in-page')
                }
            >
                <Button
                    type='button'
                    onClick={() => {
                        setVideoOpened((prev) => !prev)
                    }}
                    ref={youtubeButton}
                    className='youtube-button'
                >
                    <img
                        src={getFromAssets(`svg/common/YOUTUBE.svg`)}
                        alt='Youtube'
                    />
                </Button>
                <div className='youtube-titlebar'>
                    {!anotherWindowResized && (
                        <Button
                            type='button'
                            onClick={() => {
                                setSentToRight((prev) => !prev)
                            }}
                            ref={sendToRightButtonRef}
                            noBg={true}
                            className='titlebar-button'
                        >
                            <img
                                src={getFromAssets(
                                    `svg/${theme}/PICTURE_IN_PICTURE_${sentToRight ? 'OFF' : 'ON'}.svg`
                                )}
                                alt='Send to Right'
                            />
                        </Button>
                    )}
                    <Button
                        type='button'
                        onClick={() => {
                            setVideoOpened((prev) => !prev)
                        }}
                        ref={closeButton}
                        noBg={true}
                        className='titlebar-button'
                        id='close-button'
                    >
                        <img
                            src={getFromAssets(`svg/${theme}/CLOSE.svg`)}
                            alt='Close'
                        />
                    </Button>
                </div>
                <iframe
                    ref={iFrameRef}
                    src={`https://www.youtube.com/embed/${videoId}`}
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                    referrerPolicy='strict-origin-when-cross-origin'
                    allowFullScreen
                ></iframe>
            </div>
        </>
    )
}

export default YoutubeVideo
