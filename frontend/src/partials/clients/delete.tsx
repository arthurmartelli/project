import { useState } from 'react';
import { clients } from '~/api';

const DeleteClientButton = ({ clientId }: { clientId: string }) => {
    const [errorMessage, setErrorMessage] = useState('');

    const handleDelete = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this client?');
        if (!confirmed) return;

        try {
            const deleted = await clients.deleteClient(clientId);
            if (!deleted) throw new Error('Failed to delete client');
            alert('Client deleted successfully!');
        } catch (error) {
            setErrorMessage(`Failed to delete client: ${(error as { message: string }).message}`);
        }
    };

    return (
        <>
            {errorMessage && <div>{errorMessage}</div>}
            <button onClick={handleDelete}>Delete Client</button>
        </>
    );
};

export default DeleteClientButton;
