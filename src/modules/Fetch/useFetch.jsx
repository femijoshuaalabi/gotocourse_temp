import { useEffect, useState } from 'react';
import { configs } from './config';
import FetchBase from './FetchInstance';
const FetchBaseInit = FetchBase(configs);

export default function useFetch(url) {
    const [fetchedData, setFetchedData] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const setRefresh = () => {
        setRefreshKey((oldKey) => oldKey + 1);
    };

    useEffect(() => {
        (async () => {
            setLoading(true);
            const FetchBase = await FetchBaseInit;
            const getter = await FetchBase.get(url);
            getter.on('static', (data) => {
                if (data?.response.data) {
                    setFetchedData(data?.response.data);
                    setLoading(false);
                }
            });
        })();
    }, [refreshKey]);

    return { loading, fetchedData, error, setRefresh };
}
