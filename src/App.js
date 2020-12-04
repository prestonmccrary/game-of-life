import React, {useEffect, useRef, useState} from 'react'

import './App.css';
import Grid from './Grid'

let squareSize = 20



function App() {


  const [colKey, setColKeys] = useState([])
  



  useEffect(() => {
   
  }, [])



  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh', overflow: 'hidden'}}>
          <Grid width={750} height={750} squareSize={25}/>
    </div>
  );
}

export default App;
