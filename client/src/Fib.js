import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Fib() {
  const [state, setState] = useState({
    seenIndexes: [],
    values: {},
    index: ''
  });

  useEffect(() => {
    const fetch1 = async () => {
      const values = await axios.get('/api/values/current');
      const seenIndexes = await axios.get('/api/values/all');
      setState({
        ...state,
        values: values.data,
        seenIndexes: seenIndexes.data
      });
    };

    fetch1();
  }, []);

  const getnum = () => {
    return Object.keys(state.values).length;
  };

  return (
    <div>
      <form
        onSubmit={async e => {
          e.preventDefault();
          await axios.post('/api/values', { value: state.index });
          setState({ ...state, index: '' });
        }}
      >
        <input
          onChange={e => setState({ ...state, index: e.target.value })}
          value={state.index}
        />
        <button>Submit</button>
      </form>

      <h3>Seen</h3>
      <ul>
        {state.seenIndexes.map(({ number }) => {
          return <li>{number}</li>;
        })}
      </ul>
      <h3>Calculated {getnum()}</h3>
    </div>
  );
}
