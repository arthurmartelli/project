import React, { FormEvent, useState } from 'react';
import { clients } from '~/api';
import { useBaseClient } from '~/hooks';

const UpdateClientForm = ({ clientId }: { clientId: string }) => {
    const [data, setData, resetData] = useBaseClient()
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const updated = await clients.updateClient(clientId, data);
            if (!updated) throw new Error('Failed to update client');
            alert('Client updated successfully!');
            resetData()
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(`Failed to save client: ${(error as { message: string }).message}`);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <>
            {errorMessage && <div>{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <label>
                    Government ID:
                    <input type="text" name="gov_id" value={data.gov_id} onChange={handleInputChange} />
                </label>
                <label>
                    Name:
                    <input type="text" name="name" value={data.name} onChange={handleInputChange} />
                </label>
                <label>
                    Phone:
                    <input type="text" name="phone" value={data.phone} onChange={handleInputChange} />
                </label>
                <label>
                    Email:
                    <input type="text" name="email" value={data.email} onChange={handleInputChange} />
                </label>
                <label>
                    Address:
                    <input type="text" name="address" value={data.address} onChange={handleInputChange} />
                </label>
                <button type="submit">Save Client</button>
            </form>
        </>
    );
}

export default UpdateClientForm;
