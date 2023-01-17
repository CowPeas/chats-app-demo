import React, { useEffect, useState } from 'react';
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, onsnapshot, doc, orderBy } from 'firebase/firestore';
import { auth, db } from '../firebase-config';


export const Chat = (props) => {
        const {room} = props;

        const [messages, setMessage] = useState([]);


        const [newMessage, setNewMessage] = useState("");
        const messagesRef = collection(db, 'messages');



        useEffect(()=>{
            const queryMessages = query(messagesRef, 
                where("room", "==", room),
                orderBy("createdAt")
                );
            const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
                
                let messages = [];
                snapshot.forEach((doc) => {
                    messages.push({...doc.data(), id: doc.id})
                });
                setMessage(messages);
            });

            return () => unsuscribe();
        }, []);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if  (newMessage === "") return;

        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
        });

        setNewMessage("")


    };


  return (
    <div className='chat-app'>
        <div className='header'>
            <h1>Welcome To: {room.toUpperCase()}</h1>
        </div>


        <div className='messages'>
            {messages.map((message) => (
                <div className='message' key={message.id}>
                    <span className='user'>{message.user}</span>
                    {message.text}
                    *
                    
                </div>
            ))}
        </div>
        <form onSubmit={handleSubmit} className='new-message-form'>
            <input 
                className='new-message-input'
                placeholder='Enter Message Here..'
                onChange={(e)=> setNewMessage(e.target.value)}
                value={newMessage}
            />
            <button type='submit' className='send-button'>
                Send
            </button>
        </form>
    </div>
  );
};

export default Chat;