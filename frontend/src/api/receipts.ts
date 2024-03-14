import { BASE_URL } from ".";
import { Receipt, ReceiptItem } from "./types";

const API_URL = `${BASE_URL}/receipts`;

const createReceipt = async (receiptData: Receipt): Promise<string | null> => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set content type to JSON
            },
            body: JSON.stringify(receiptData), // Convert object to JSON string
        });

        if (!response.ok) {
            throw new Error('Failed to create receipt');
        }

        const responseData = await response.text();
        return responseData;
    } catch (error) {
        console.error('Error creating receipt:', error);
        return null;
    }
};

const updateReceipt = async (receiptId: string, receiptData: Receipt): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/${receiptId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json', // Set content type to JSON
            },
            body: JSON.stringify(receiptData), // Convert object to JSON string
        });

        if (!response.ok) {
            throw new Error('Failed to update receipt');
        }

        return true;
    } catch (error) {
        console.error('Error updating receipt:', error);
        return false;
    }
};

const deleteReceipt = async (receiptId: string): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/${receiptId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete receipt');
        }

        return true;
    } catch (error) {
        console.error('Error deleting receipt:', error);
        return false;
    }
};

const getAllReceipts = async (): Promise<Receipt[] | null> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch all receipts');
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching all receipts:', error);
        return null;
    }
};

const getReceiptById = async (receiptId: string): Promise<Receipt | null> => {
    try {
        const response = await fetch(`${API_URL}/${receiptId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch receipt by ID');
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching receipt by ID:', error);
        return null;
    }
};

const getReceiptsByClient = async (clientId: string): Promise<Receipt[] | null> => {
    try {
        const response = await fetch(`${API_URL}/client/${clientId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch receipts by client');
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching receipts by client:', error);
        return null;
    }
};

const addItemsToReceipt = async (items: ReceiptItem[], receiptId: string): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/${receiptId}/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set content type to JSON
            },
            body: JSON.stringify(items), // Convert object to JSON string
        });

        if (!response.ok) {
            throw new Error('Failed to add items to receipt');
        }

        return true;
    } catch (error) {
        console.error('Error adding items to receipt:', error);
        return false;
    }
};

const getItemsFromReceipt = async (receiptId: string): Promise<ReceiptItem[] | null> => {
    try {
        const response = await fetch(`${API_URL}/${receiptId}/items`);
        if (!response.ok) {
            throw new Error('Failed to fetch items from receipt');
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching items from receipt:', error);
        return null;
    }
};

export default {
    createReceipt,
    updateReceipt,
    deleteReceipt,
    getAllReceipts,
    getReceiptById,
    getReceiptsByClient,
    addItemsToReceipt,
    getItemsFromReceipt,
};
