// Types
import { SomethingWentWrongProps } from '../types/Types.ts'
// Components
import Button from './Button.tsx'
// Styles
import '../styles/components/SomethingWentWrong.css'

const SomethingWentWrong = ({
    refetchFunc,
    message,
    goTo,
    goToText,
}: SomethingWentWrongProps) => {
    return (
        <div className='something-went-wrong'>
            <h1>{message ? message : 'Something went wrong'}</h1>
            {goTo ? (
                <Button type='link' to={goTo}>
                    {goToText}
                </Button>
            ) : (
                <Button type='button' onClick={refetchFunc}>
                    Reload
                </Button>
            )}
        </div>
    )
}

export default SomethingWentWrong
