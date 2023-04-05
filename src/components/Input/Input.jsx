import "./Input.css"

const Input = ({ id, label, type, placeholder, name, register }) => {
    return (
        <div className="flex-input">
            <label className="label" htmlFor={id}>{label}</label>
            <input className="input" id={id} type={type} placeholder={placeholder} name={name} {...register}/>
        </div>
    )
}

export default Input;