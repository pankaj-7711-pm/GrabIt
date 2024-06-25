import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios';
const ChatPage = () => {
    const params = useParams();
    const [seller, setSeller] = useState();



    const getSeller = async () => {
        try {
            const { data } = await axios.get(
              `/api/v1/product/get-single-seller/${params.sid}`
            );
            if (data?.success) {
                setSeller(data?.seller);
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getSeller();
    },[])
  return (
    <Layout>
      <div>
        {params.sid}
      </div>
    </Layout>
  )
}

export default ChatPage
