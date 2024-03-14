export type BaseClient = {
    gov_id: string;
    name: string;
    phone?: string | undefined;
    email?: string | undefined;
    address?: string | undefined;
}

export type Client = BaseClient & {
    id: string;
}

export type Receipt = {
    id: string;
    clientId: string;
    totalAmount: number;
    items: ReceiptItem[];
}

export type ReceiptItem = {
    id: string;
    name: string;
    quantity: number;
    price: number;
}
