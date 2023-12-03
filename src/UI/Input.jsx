export default function Input({ id, label, ...props }) {
    return (
        <div className="control">
            <label htmlFor={id}>{label}</label>
            <input id={id} {...props} />
        </div>
    )
}