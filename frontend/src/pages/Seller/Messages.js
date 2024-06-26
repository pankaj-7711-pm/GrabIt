import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import { ConState } from '../../context/ConProvider'
import { Avatar } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Messages = () => {

  const { user } = ConState();
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  const getAllchats = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/chat/all-chat-seller/${user?.user?._id}`
      );

      if (data?.success) {
        setChats(data.chats);
      }
    } catch (error) {}
  }

  useEffect(() => {
    getAllchats();
  }, [])
  
  return (
    <Layout>
      <div style={{display:"flex", padding:"1rem ", flexWrap:"wrap"}}>
        {chats?.map((chat) => {
          return (
            <div
              style={{
                display: "flex",
                // justifyContent: "center",
                alignItems:"center",
                padding: "10px",
                border: "1px solid rgb(195, 194, 194)",
                borderRadius: "5px",
                minWidth: "13rem",
                margin:"1rem"
              }}
            >
              <Avatar
                alt="Remy Sharp"
                src={chat?.user.pic}
                sx={{ width: 46, height: 46 }}
              />
              <div style={{ marginLeft: "5px" }}>
                <h5 style={{ marginBottom: "0" }}>{chat?.user?.name}</h5>
                <p onClick={()=>navigate(`/dashboard/chat/${chat?._id}`)} className='open-chat-seller-page' style={{ margin: "0", fontSize:"14px", fontWeight:"200", cursor:"pointer" }}>Open Chat</p>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  )
}

export default Messages
