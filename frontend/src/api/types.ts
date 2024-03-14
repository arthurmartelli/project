export interface BaseClient {
    gov_id: string;
    name: string;
    phone?: string;
    email?: string;
    address?: string;
}

export interface Client extends BaseClient {
    id: string;
}

export interface Receipt {
    id: string;
    clientId: string;
    totalAmount: number;
    items: ReceiptItem[];
}

export interface ReceiptItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
}
