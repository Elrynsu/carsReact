export default function ErrorNotification({ message, onClose }) {
    if (!message) {
        return null;
    }

    return (
        <div className="alert alert-danger alert-dismissible fade show text-center" role="alert">
            {message}
            <button type="button" className="btn-close" onClick={onClose}></button>
        </div>
    )
}