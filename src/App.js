import React, {useEffect, useRef, useState} from 'react'

import './App.css';
import Grid from './Grid'

let squareSize = 20



function App() {


  const [size, setSize] = useState(window.innerHeight * .75)
  



  useEffect(() => {
   window.addEventListener('resize', () => {
     setSize(window.innerHeight * .75)
   })
   
  }, [])


  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh', overflow: 'hidden'}}>
          <Grid width={size} height={size} squareSize={15}/>
    </div>
  );
}

export default App;
