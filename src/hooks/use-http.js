import { useState, useCallback } from "react"

const useHttp = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState(null);

    const sendRequest = useCallback(async (url, config={}) => {
        setIsLoading(true);
        setHttpError(null);
        try {
            const res = await fetch(url, {
                method: config.method ?? "GET",
                body: config.body ? JSON.stringify(config.body) : null,
                headers: config.headers ?? {}
            });
            if (!res.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await res.json();
            setItems(data)
        } catch (error) {
            setHttpError(error.message)
        }
        setIsLoading(false);
    }, []);

    return { items, isLoading, httpError, sendRequest };
}

export default useHttp;