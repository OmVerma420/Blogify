import { useState, useEffect } from "react";

export const useFetch = (url, options = {}, dependencies = []) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, options);
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message || "Something went wrong");
        }
        // console.log("Fetched data:", responseData);
        setData(responseData);
        setError();
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, error, loading };
};
