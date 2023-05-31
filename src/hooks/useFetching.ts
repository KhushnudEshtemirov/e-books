import { useState } from "react";
import customAxios from "../services/api/customAxios";

type fetchProps = {
  method: string;
  specialUrl: string;
  data?: object;
};

export const useFetching = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  // For Sign Up request
  const fetchSignUpData = async (props: fetchProps) => {
    try {
      const res = await customAxios({
        method: props.method,
        url: `${props.specialUrl}`,
        data: props.data,
      }).then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        console.log(res.data);
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // For other requests
  const fetchData = async (props: fetchProps) => {
    try {
      const res = await customAxios({
        method: props.method,
        url: `${props.specialUrl}`,
        data: props.data,
      }).then((res) => setResponse(res.data));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { fetchSignUpData, response, loading, error, fetchData } as const;
};
