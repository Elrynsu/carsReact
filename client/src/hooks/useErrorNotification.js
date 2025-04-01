import { useState } from "react";

export default function useErrorNotification() {
    const [ error, setError ] = useState('');
    
    const showError = (message) => setError(message);
    const clearError = () => setError('');

    return { 
        error, 
        showError, 
        clearError
    };
}