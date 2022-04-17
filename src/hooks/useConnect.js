import { useState, useCallback } from 'react';

export function useConnect() {
  const [state, setState] = useState({
    loading: false,
    data: null,
    error: null
  });

  const connect = useCallback(() => {
    setState({
      loading: true,
      data: null,
      error: null
    })
    const { ethereum } = window;
    ethereum.request({ method: 'eth_requestAccounts' })
    .then((res) => {
      setState({
        loading: false,
        data: res,
        error: null
      })
    })
    .catch((err) => {
      setState({
        loading: false,
        data: null,
        error: err
      })
    })
  },[]);

  return { connect, state };
}