import { useState, useEffect } from "react";

const useFetch = ({ header, body="GET", url, method }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState(null);

    const fetch = async () => {
        try {
            console.log(url);
            // setLoading(true)
            const response = await fetch(
                url,
                {
                    method: method,
                    header: header,
                    body: body,
                }
            )
            if (response.ok) {
                const json = await response.json()
                // setData(json)
                console.log(json);
            }
        }
        catch (e) {
            // setFetchError(e)
        }
        finally {
            // setLoading(false)
        }
    }
    return ({ fetch:fetch, data, loading, fetchError })
};

export default useFetch;