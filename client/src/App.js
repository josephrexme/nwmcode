import React, { useEffect, useReducer } from 'react';
import './App.css';

const HOST = 'http://localhost:5000';

const getData = async () => {
  return await fetch(HOST).then(response => response.json());
};

const requestReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'fetch':
      return {...state, status: 'loading'};
    case 'response':
      return {...state, status: 'loaded', data: payload };
    case 'reject':
      return {...state, status: 'error', error: payload };
    default:
      throw new Error('Unknown request type received');
  }
}

const requestRenderer = (status, data, error) => {
  const statuses = {
    idle: () => null,
    loading: () => <p>Loading....</p>,
    loaded: () => (
      <div>
        { data.map(item => (
          <div key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
        )) }
      </div>
    ),
    error: () => (
      <>
        <h1>An Error Occurred:</h1>
        <p>{error}</p>
      </>
    )
  };

  return statuses[status];
}

function App() {
  const [request, dispatch] = useReducer(requestReducer, {
    status: 'idle',
    data: [],
    error: null
  });

  useEffect(() => {
    dispatch({ type: 'fetch' })
    getData().then(response => {
      dispatch({ type: 'response', payload: response });
    }).catch(error => {
      dispatch({ type: 'reject', payload: error })
    });
  }, []);

  return requestRenderer(request.status, request.data, request.error)()
}

export default App;
