import "./Button.css"

const Button = ({ label, type, onClick }) => {
    const handleClick = () => {
        if(onClick) {
            onClick();
        }
    }
    return <button className="button" type={type} onClick={handleClick}>{label}</button>
}

export default Button;