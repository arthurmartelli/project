import { BASE_URL } from ".";
import { BaseClient, Client, Receipt } from "./types";

const API_URL = `${BASE_URL}/clients`;

const createClient = async (clientData: BaseClient): Promise<Client | null> => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clientData)
        });

        if (!response.ok) throw new Error('Failed to create client');
        return response.json();
    } catch (error) {
        console.error('Error creating client:', error);
        return null;
    }
};

const updateClient = async (clientId: string, clientData: BaseClient): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/${clientId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clientData)
        });

        if (!response.ok) throw new Error('Failed to update client');
        return true;
    } catch (error) {
        console.error('Error updating client:', error);
        return false;
    }
};

const deleteClient = async (clientId: string): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/${clientId}`, {
            method: 'DELETE',
        });

        if (!response.ok) throw new Error('Failed to delete client');
        return true;
    } catch (error) {
        console.error('Error deleting client:', error);
        return false;
    }
};

const getClientById = async (clientId: string): Promise<Client | null> => {
    try {
        const response = await fetch(`${API_URL}/${clientId}`);
        if (!response.ok) throw new Error('Failed to fetch client');
        return response.json();
    } catch (error) {
        console.error('Error fetching client:', error);
        return null;
    }
};

const getClientByGovId = async (govId: string): Promise<Client | null> => {
    try {
        const response = await fetch(`${API_URL}/gov-id/${govId}`);
        if (!response.ok) throw new Error('Failed to fetch client by government ID');
        return response.json();
    } catch (error) {
        console.error('Error fetching client by government ID:', error);
        return null;
    }
};

const getClientReceipts = async (clientId: string): Promise<Receipt[] | null> => {
    try {
        const response = await fetch(`${API_URL}/${clientId}/receipts`);
        if (!response.ok) throw new Error('Failed to fetch client receipts');
        return response.json();
    } catch (error) {
        console.error('Error fetching client receipts:', error);
        return null;
    }
};

const getAllClients = async (): Promise<Client[] | null> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch clients');
        return response.json();
    } catch (error) {
        console.error('Error fetching clients:', error);
        return null;
    }
};

export default {
    createClient,
    updateClient,
    deleteClient,
    getClientById,
    getClientByGovId,
    getClientReceipts,
    getAllClients,
};
