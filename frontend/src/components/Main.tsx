// Types
import { PropsWithChildren } from 'react'
// Styles
import '../styles/components/Main.css'

const Main = ({ children }: PropsWithChildren) => {
    return <div className='main'>{children}</div>
}

export default Main
