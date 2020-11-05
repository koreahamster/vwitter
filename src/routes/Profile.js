import React, { useEffect, useState } from "react";
import { authService, dbService } from "fBase";
import { useHistory } from "react-router-dom";


export default ({ userObj ,refreshUser}) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [attachment, setAttachment] = useState("");

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const getMyVweet = async () => {
    const vweets = await dbService
      .collection("vweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createAt")
      .get();
  };
  //필터링
  useEffect(() => {
    getMyVweet();
  });
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit= async (event) => {
      event.preventDefault();
      if(userObj.displayName !== newDisplayName){
        await userObj.updateProfile({
            displayName: newDisplayName,
        });
        refreshUser();
      }
      
  }

  return (
    <>
    {attachment && (
                    <div><img src={attachment} width="50px" height="50px"/> </div>) }
    <form onSubmit={onSubmit}>
        <input onChange={onChange} type="text" placeholder="닉네임" />
        <input type="submit" value="업데이트 프로필"/>       
    </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
