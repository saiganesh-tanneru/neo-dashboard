import { useState, useEffect } from 'react';
import axios from 'axios';
import { ErrorMessage } from '../models/neoModel';

const useFetch = (url: string | null) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<ErrorMessage | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url!);
                setData(response.data);
                setError(null);
            } catch (err: any) {
                console.log('Fetch error:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };
    if(url !== null) {
        fetchData();
    }
    }, [url]);

    return { data, loading, error };
};

export default useFetch;