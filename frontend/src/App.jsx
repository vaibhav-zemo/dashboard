import React, { useEffect, useState } from 'react'
import axios from 'axios';
import styled from "styled-components";
import Revenue from "./Components/Revenue";
import Cost_of_Revenue from './Components/Cost_of_Revenue';
import Cross_Profit from './Components/Cross_Profit';
import Revenue_Growth from './Components/Revenue_Growth';

const Container = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 50px;
`;

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("http://localhost:8000/data");
      setData(res.data);
    }
    getData();
  }, [])

  return <Container>
    <Revenue data={data ? data[0] : {}} />
    <Cost_of_Revenue data={data ? data[2] : {}} />
    <Cross_Profit data={data ? data[3] : {}} />
    <Revenue_Growth data={data ? data[1] : {}} />
  </Container>
}

export default App;
