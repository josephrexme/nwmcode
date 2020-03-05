import React, { useEffect, useReducer } from 'react';
import ReactMarkdown from 'react-markdown';
import Error from './Error';
import Loading from './Loading';
import { Entry, List } from './Styles';

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
    loading: () => <Loading />,
    loaded: () => (
      <List>
      { data.map(item => (
        <Entry key={item.id} role="region" aria-live="polite" id="entries">
          <h1>{item.title}</h1>
          <ReactMarkdown source={item.description} />
        </Entry>
      )) }
      </List>
    ),
    error: () => <Error message={error} />
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
    dispatch({ type: 'fetch' });
    getData().then(response => {
      console.log(response)
      dispatch({ type: 'response', payload: response });
    }).catch(error => {
      dispatch({ type: 'reject', payload: error });
    });
  }, []);

  return (
    <main>
      {requestRenderer(request.status, request.data, request.error)()}
    </main>
  );
}

export default App;
