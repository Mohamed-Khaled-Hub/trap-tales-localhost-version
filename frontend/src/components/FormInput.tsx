// Types
import { FormInputProps } from '../types/Types.ts'
// Styles
import '../styles/components/FormInput.css'

const FormInput = ({ id, type, valueState, placeholder }: FormInputProps) => {
    const [value, setValue] = valueState

    return (
        <input
            className='form-input'
            id={id}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={(e) => setValue(e.target.value)}
        />
    )
}

export default FormInput
