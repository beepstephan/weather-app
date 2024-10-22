import React, { useState } from 'react';
import WeatherPage from './WeatherPage';

const WeatherBlocks = () => {
  const [blocks, setBlocks] = useState([{ id: 1 }]);

  const addBlock = () => {
    if (blocks.length < 5) {
      setBlocks([...blocks, { id: blocks.length + 1 }]);
    } else {
      alert('Максимум 5 блоків погоди');
    }
  };

  const removeBlock = (id) => {
    const confirmDelete = window.confirm('Ви дійсно хочете видалити блок?');
    if (confirmDelete) {
      setBlocks(blocks.filter((block) => block.id !== id));
    }
  };

  return (
    <div>
      <button onClick={addBlock}>Додати блок погоди</button>
      {blocks.map((block) => (
        <div key={block.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <WeatherPage />
          <button onClick={() => removeBlock(block.id)}>Видалити блок</button>
        </div>
      ))}
    </div>
  );
};

export default WeatherBlocks;