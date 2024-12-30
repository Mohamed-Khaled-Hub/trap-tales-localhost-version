import { forwardRef } from 'react'
// Types
import { ContainerProps } from '../types/Types.ts'
// Styles
import '../styles/components/Container.css'

const Container = forwardRef<HTMLDivElement, ContainerProps>(
    ({ children, id, style }: ContainerProps, ref) => {
        return (
            <div className='container' id={id} ref={ref} style={style}>
                {children}
            </div>
        )
    }
)

export default Container
