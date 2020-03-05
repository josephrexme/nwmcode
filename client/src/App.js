import React, { useEffect, useReducer, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Error from './Error';
import Loading from './Loading';
import { Entry, List, SearchForm } from './Styles';

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
  const inputRef = useRef(null);
  const [snapshot, setSnapshot] = useState([]);
  const [request, dispatch] = useReducer(requestReducer, {
    status: 'idle',
    data: [],
    error: null
  });

  useEffect(() => {
    dispatch({ type: 'fetch' });
    getData().then(response => {
      dispatch({ type: 'response', payload: response });
      setSnapshot(response);
    }).catch(error => {
      dispatch({ type: 'reject', payload: error });
    });
  }, []);

  const searchEntries = () => {
    if(!request.data) return;
    const { value } = inputRef.current;
    const filteredEntries = snapshot.filter(entry => {
      return entry.title.toLowerCase().includes(value.toLowerCase());
    });
    dispatch({ type: 'response', payload: filteredEntries });
  };

  return (
    <main>
      <SearchForm role="search">
        <input
          type="search"
          aria-controls="entries"
          placeholder="Search Jobs"
          onChange={searchEntries}
          ref={inputRef}
        />
      </SearchForm>
      {requestRenderer(request.status, request.data, request.error)()}
    </main>
  );
}

export default App;
