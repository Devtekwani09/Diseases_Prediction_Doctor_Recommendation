import { useEffect, useState } from "react";
import { token } from "../config";

const useFetchData = (url) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async() => {
            setLoading(true)
            try{
                console.log(localStorage.getItem('token'), 'token')
                const res = await fetch(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                      }
                })

                // console.log("res ", res)
    
                const result = await res.json()

                console.log("result" , result)
    
                if(!res.ok){
                    throw new Error(result.message)
                }

                setData(result)
                setLoading(false)
            }
            catch(err){
                setLoading(false)
                setError(err.message)
            }
        }
        if(token){
            console.log("Url from fetch data", url)
            fetchData()
        }
        else{
            console.log("No token")
        }
    }, [url])

    return {
        data, loading, error
    }
}

export default useFetchData

