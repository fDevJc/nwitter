import { dbService, storageService } from 'fBase';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
const NweetFactory = ({ userObj }) => {
  const [attatchment, setAttatchment] = useState();
  const [nweet, setNweet] = useState('');
  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = '';
    if (attatchment !== '') {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attatchment, 'data_url');
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl: attachmentUrl,
    };

    await dbService.collection('nweets').add(nweetObj);
    setNweet('');
    setAttatchment('');
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;

      setAttatchment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachmentClick = () => {
    setAttatchment();
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="waht's on your mind?"
        maxLength={120}
        value={nweet}
        onChange={onChange}
      ></input>
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="Nweet"></input>
      {attatchment && (
        <div>
          <img src={attatchment} width="50px" height="50px" />
          <button onClick={onClearAttachmentClick}>Clear</button>
        </div>
      )}
    </form>
  );
};

export default NweetFactory;
