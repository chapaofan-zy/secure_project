import React from 'react';
import axios from '../../api';

const Index = () => {
  async function test() {
    const res = await axios.get('/users');
    console.log('test', res);
  }

  return (
    <div>
      home
      <button onClick={() => test()}>test</button>
    </div>
  );
};

export default React.memo(Index);
