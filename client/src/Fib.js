import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Fib() {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState('');

  const fetchValues = async () => {
    const response = await axios.get('/api/values/current');
    setValues(response.data);
  };

  const fetchIndexes = async () => {
    const response = await axios.get('/api/values/all');
    setSeenIndexes(response.data);
  };

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post('/api/values', { index });

    setIndex('');
  };

  const renderIndexes = () => (
    seenIndexes.map(({ number }) => number).join(', ')
  );

  const renderValues = () => {
    const valuesInfos = [];

    for (const key in values) {
      valuesInfos.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      );
    }

    return valuesInfos;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>

        <input
          onChange={e => setIndex(e.target.value)}
          value={index}
        />

        <button>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      { renderIndexes() }

      <h3>Calculated values:</h3>
      { renderValues() }
    </div>
  );
};