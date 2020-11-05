import React, { useState } from "react";
import { dbService, storageService } from "fBase";


const Vweet = ({ vweetId, vweetObj, isOwner }) =>{ 
    const [editing, setEditing] = useState(false);
    const [newVweet, setNewVweet] = useState(vweetObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm("트윗을 삭제 하시겠습니까?");
        if(ok){
            await dbService.doc(`vweets/${vweetObj.id}`).delete();
            await storageService.refFromURL(vweetObj.attachmentUrl).delete();
            //deleate
        }
    }
    const toogleEditing= () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`vweets/${vweetObj.id}`).update({
            text: newVweet,
        }); //업데이트
        setEditing(false);
    }
    const onChange = (event) => {
        const {
            target: {value},
        } = event

        setNewVweet(value);
    }
    return (
        <div>
           {    
            editing ? ( 
            <>
                <form onSubmit={onSubmit}>
                    <input onChange={onChange} type="text" placeholder="입력" value={newVweet} required/>
                    <input type="submit" value="Update Vweet"/>
                </form> 
                <button onClick={toogleEditing}>취소</button>
            </>
           ) : (
            <>
           <h4>{vweetObj.text}</h4>
           {vweetObj.attachmentUrl && <img src={vweetObj.attachmentUrl} width="100px" height="100px"/>}
            { isOwner && (
                <>
                    <button onClick={onDeleteClick}>Deleate Vweet</button>
                    <button onClick={toogleEditing}>Edit Vweet</button>
                </>
            )}
            </>
           )}
        </div>
    );
};

export default Vweet;
