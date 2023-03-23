import React from 'react';
import { useSelector } from 'react-redux';
import axios from '../../api';

const Index: React.FC = () => {
  const user = useSelector((state) => {
    console.log(state);
    return state;
  });

  async function test() {
    const res = await axios.get('/users');
    console.log(res);
  }

  return (
    <div>
      identity
      <button onClick={() => test()}>test</button>
    </div>
  );
};

export default Index;
