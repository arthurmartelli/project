import { useState } from 'react';
import { BaseClient } from '~/api/types';

export function useBaseClient(): [BaseClient, React.Dispatch<React.SetStateAction<BaseClient>>, () => void] {
    const initialData: BaseClient = {
        gov_id: '',
        name: '',
        address: '',
        email: '',
        phone: ''
    };

    const [data, setData] = useState<BaseClient>(initialData);
    const reset = () => setData(initialData);
    return [data, setData, reset];
}
