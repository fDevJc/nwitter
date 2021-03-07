import { dbService } from 'fBase';
import React, { useState } from 'react';

const Home = () => {
  const [nweet, setNweet] = useState('');
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection('nweets').add({
      nweet,
      createdAt: Date.now(),
    });
    setNweet('');
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="waht's on your mind?"
          maxLength={120}
          value={nweet}
          onChange={onChange}
        ></input>
        <input type="submit" value="Nweet"></input>
      </form>
    </div>
  );
};
export default Home;
