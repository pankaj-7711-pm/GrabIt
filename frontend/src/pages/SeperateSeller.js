import React from 'react'
import Layout from '../components/layout/Layout'
import { useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


const SeperateSeller = () => {
    const params = useParams();
    const navigate = useNavigate();
  return (
    <Layout>
      <div>
        {params.sid}
      </div>
    </Layout>
  )
}

export default SeperateSeller
