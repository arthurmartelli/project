import React, { FormEvent, useState } from 'react';
import { clients } from '~/api';
import { useBaseClient } from '~/hooks';

const CreateClientForm = () => {
    const [data, setData, resetData] = useBaseClient()

    // State variable to hold error message
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const createdClient = await clients.createClient(data);
            if (!createdClient) throw new Error('Failed to create client');
            alert('Client created successfully!');
            resetData();
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(`Failed to create client: ${(error as { message: string }).message}`);
        }
    };

    // Function to handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prevData) => ({
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
                <button type="submit">Create Client</button>
            </form>
        </>
    );
};

export default CreateClientForm;
