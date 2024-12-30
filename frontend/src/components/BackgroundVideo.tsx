// Types
import { BackgroundVideoProps } from '../types/Types.ts'
// Styles
import '../styles/components/BackgroundVideo.css'

export default function BackgroundVideo({ videoSrc }: BackgroundVideoProps) {
    return (
        <div className='background-video'>
            <video autoPlay loop muted>
                <source src={videoSrc} type='video/mp4' />
            </video>
        </div>
    )
}
