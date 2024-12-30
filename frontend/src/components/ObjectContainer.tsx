// Types
import { PropsWithChildren } from 'react'
// Styles
import '../styles/components/ObjectContainer.css'

const ObjectContainer = ({ children }: PropsWithChildren) => {
    return <div className='object-container'>{children}</div>
}

export default ObjectContainer
