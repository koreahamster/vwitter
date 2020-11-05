import React, { useState, useEffect } from "react";
import { dbService } from "fBase";
import Vweet from "components/Vweet";
import VweetFactory from "components/VweetFactory";

const Home = ({userObj}) => {
    
    const [vweets,setVweets] = useState([]);
    
   /*  
    const getVweets = async () => { 
        const dbVweets = await dbService.collection("vweets").get();
        dbVweets.forEach(document=>{
            const vweetObject = {
                ...document.data(),
                id: document.id,
                
            };
            setVweets((prev) => [document.data(),...prev]);
        }); //데이터를 불러옴
        
    }; */ //오래된 방식

    // 위의 방식보다 re 렌더를 적게함 
    useEffect(() => {
        //getVweets();
        dbService.collection("vweets").onSnapshot((snapshot)=>{
            const vwettArray =snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setVweets(vwettArray);
        });
    },[]);  
    
    return (
            <div>
                <VweetFactory userObj={userObj} />
                <div>
                    {vweets.map((vweet) => ( 
                        <Vweet key={vweet.id} vweetObj={vweet} isOwner={vweet.creatorId === userObj.uid} />
                    ))}
                </div>
            </div>      
    );
}

export default Home;
