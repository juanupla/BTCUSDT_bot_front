import React, { useEffect, useState } from 'react';
import { getOperations } from '../services/Api';

const Operations = () => {
  const [operations, setOperations] = useState([]);

  useEffect(() => {
    // Llamada a la API para obtener las operaciones
    getOperations().then((data) => {
      setOperations(data);
    });
  }, []);

  return (
    <div>
      <h2>Operations</h2>
      <ul>
        {operations.map((operation, index) => (
          <li key={index}>{operation.date} - {operation.type} - {operation.amount}</li>
        ))}
      </ul>
    </div>
  );
};

export default Operations;
