import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { storageService, dbService } from "fBase";

const VweetFactory = ({userObj}) => {
    const [vweet, setVweet] = useState("");
    const [attachment, setAttachment] = useState("");
    const onSubmit = async (event) =>{
        event.preventDefault();
        let attachmentUrl = "";
        if(attachment !== ""){ 
            
            const attachmentFile = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentFile.putString(attachment,"data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }
        
        const vweetObj = {
            text: vweet,
            createdAt: Date.now(), // 생성시간
            creatorId: userObj.uid, //생성자 아이디 앱js 에서 라우터를 통해 받아옴
            attachmentUrl,
        }
       
        await dbService.collection("vweets").add(vweetObj);
        setVweet("");
        setAttachment("");
         
   
    };
    const onChange = (event) =>{
        const { target:{value} } = event;
        setVweet(value);
    };
    const onFileChange = (event) => {
        const {target:{files}} =event; //파일 주소를 받아옴
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {   //로드되었을때 피니쉬 이벤트의 결과를 넣어줌
            const {
                currentTarget: { result },
            } = finishedEvent;
            
            setAttachment(result);
        }
        reader.readAsDataURL(theFile); //이미지 주소를 읽어옴
         
    }
    const onClearAttachment = () => { 
        setAttachment(null);

    }


    return( 
        <form onSubmit={onSubmit}>
        <input onChange={onChange} 
        value={vweet} 
        type="text" 
        placeholder="너는 무슨생각이야" 
        maxLength={120}/>
        <input type="file" 
        accept="image/*" 
        onChange={onFileChange}/>
        <input type="submit" 
        value="Vweet"/>
        {attachment && (
        <div><img src={attachment} width="50px" height="50px"/>  //이미지 출력
        <button onClick={onClearAttachment}>Cancel Image</button>
        </div>
        )}
    </form>
    
        
    );
    
};


export default VweetFactory;