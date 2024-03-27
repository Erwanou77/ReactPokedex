import './_input.scss';

function Input({label, ...rest}) {
    return (
        <div className='groupInput'>
            <label htmlFor={label}>{label}</label>
            <input {...rest} id={label} />
        </div>
    );
}

export default Input;