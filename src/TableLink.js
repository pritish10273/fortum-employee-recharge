import React from 'react';
import { useHistory } from 'react-router-dom';

const TableLink = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/table');
  };

  return (
    <button onClick={handleClick} style={{ backgroundColor: 'teal', color: 'white', padding: '10px' }}>
      Show Table
    </button>
  );
};

export default TableLink;
