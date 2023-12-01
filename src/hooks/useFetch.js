import { useEffect, useState } from "react";

export default function useFetch(initialValue, endpoint) {
    const [data, setData] = useState(initialValue);
    const [error, setError] = useState();
    const [isFetching, setIsFetching] = useState();
    const URL = "http://localhost:3000" + endpoint;

    useEffect(()=>{
        async function fetchData() {
            setIsFetching(true);
            try {
                const response = await fetch(URL);
                const data = await response.json();
                setData(data);
                setIsFetching(false);
            } catch(error) {
                setError(error.message || 'Something went wrong, please try later..')
                setIsFetching(false);
            }     
        }
        fetchData();
    },[])

    return {
        data,
        error,
        isFetching
    }
}