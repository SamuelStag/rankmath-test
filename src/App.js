import logo from './logo.svg';
import './App.css';
import './style.css';
import React, {useEffect, useState} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios'

function App() {
 
const [all_data,setAllData] =useState([])

  const [data, setData] = useState([]);

  function changeGraphState(e){
    let temp_data =[]
    axios.get("http://localhost/mathrank_test/?request=graph_data").then(function(response){
    setData(response.data)
    setAllData(response.data)
   let graph_val = 7;
    if(e!=7){
      graph_val = e.target.value;
   }
   
   all_data.map((item,index)=>{
    if(index<=graph_val){
      temp_data.push(item)
    }
    setData(temp_data)
  return data
  })
    
    
      
    })
} 
useEffect(()=>{
  changeGraphState(7)
},[])

  return (
   <>
   <div id="container">
    <div id="left-pane">Graph Widget</div>
    
    <div id="right-pane">
      <select onChange={changeGraphState}>
      <option value={7}> Last 7days</option>
      <option value={15}> Last 15days</option>
      <option value={30}> Last 1month</option>
      </select>
      </div>

      <div id="graph-pane">

     
        <LineChart
          width={600}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
     
    
            
      </div>



   </div>
   
   </>
  );
}

export default App;
