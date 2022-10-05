import { useState, useCallback } from "react"

const useHttp = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState(null);

    const fetchItems = useCallback(async (url) => {
        setIsLoading(true);
        setHttpError(null);
        try {
            const res = await fetch(url);
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

    return { items, isLoading, httpError, fetchItems };
}

export default useHttp;