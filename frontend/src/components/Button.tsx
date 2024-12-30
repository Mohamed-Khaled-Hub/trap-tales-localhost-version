import { forwardRef, LegacyRef } from 'react'
import { Link } from 'react-router-dom'
// Types
import { ButtonProps } from '../types/Types.ts'
// Styles
import '../styles/components/Button.css'

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            to,
            id,
            type,
            noBg,
            onClick,
            children,
            className,
            target = '_self',
        }: ButtonProps,
        ref
    ) => {
        const classNameObject =
            'button' +
            (noBg ? ' no-bg' : '') +
            (className ? ` ${className}` : '')

        return (
            <>
                {type === 'link' && (
                    <Link
                        ref={ref as LegacyRef<HTMLAnchorElement> | undefined}
                        to={`${to}`}
                        className={classNameObject}
                        target={target}
                        id={id}
                        onClick={onClick}
                    >
                        {children}
                    </Link>
                )}
                {type === 'button' && (
                    <button
                        ref={ref}
                        onClick={onClick}
                        className={classNameObject}
                        id={id}
                    >
                        {children}
                    </button>
                )}
            </>
        )
    }
)

export default Button
