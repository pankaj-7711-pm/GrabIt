import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';

const CategoryWiseSellers = () => {
    const params = useParams();
    const [category, setCategory] = useState();
    useEffect(() => {
        setCategory(params.categoryname);
    },[])
  return (
    <Layout>
      {category}
    </Layout>
  )
}

export default CategoryWiseSellers
