import React, { useState , useEffect } from 'react'
import {Button, Tooltip, Input, Drawer, Typography} from 'antd'
import { ReloadOutlined, CaretRightFilled, StopFilled, AppstoreOutlined} from '@ant-design/icons';

import Col from './Col'

import {motion} from 'framer-motion'

const {Title} = Typography

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
}

const prebuiltData = [
    {
        name: "Glider",
        arr: [
            [false, false, true],
            [true, false, true],
            [false, true, true]
        ]
    },
    {
        name: "Glider",
        arr: [
            [false, false, true],
            [true, false, true],
            [false, true, true]
        ]
    }
]

const Grid = ({squareSize, height, width}) => {

    const [grid,setGrid] = useState(null)

    const [playing,setPlaying] = useState(false)

    const [interval, setInterval] = useState(1000)

    const [drawer, setDrawer] = useState(false)


    const forceUpdate = useForceUpdate()

    const reset = () => {
        initializeGrid()
    }

    useEffect(() => {
        setPlaying(false)
    }, [interval])

    useEffect(() => {
        initializeGrid()
    }, [height, width])

    // useEffect(() => {
    //     if(playing == true){
    //         playGame(grid)
    //     }
    // },[playing])

    useEffect(() => {
        if(playing){
            setTimeout(() => gameOfLife(grid),interval)
        }
    },[playing, grid])

    const initializeGrid = () => {
        let rowSquares = Math.floor(width / squareSize)

        let colSquares = Math.floor(height / squareSize)

        

        let grid2dArray = new Array(rowSquares)

        for(let i = 0; i < rowSquares; i++){
            grid2dArray[i] = new Array(colSquares).fill(false)
        }
        
        setGrid(grid2dArray)
    }


    const newState = (col, indexInCol, gridPrevious) => {

    

        let aliveNeighbours = 0

        let utilArr = [-1, 0, 1]

        for(let augPosition in utilArr){
            
            let verticalChange = utilArr[augPosition]

            for(let augPosition2 in utilArr){

                let horizontalChange = utilArr[augPosition2]
                
                try{

                    if(horizontalChange == 0 && verticalChange == 0){

                    } else if(gridPrevious[col+horizontalChange][indexInCol+verticalChange]) {
                        aliveNeighbours++
                    }

                } catch(err){

                }

                
            }
        }
    
      let dead = !gridPrevious[col][indexInCol]

      if(aliveNeighbours > 3){
            console.log(`OVERPOPULATED - (${col}, ${indexInCol}) - ${aliveNeighbours}`)

          return false
      } else if(aliveNeighbours >= 2){


          if(!dead){
            console.log(`STAYED ALIVE - (${col}, ${indexInCol}) - ${aliveNeighbours}`)

              return true
          } else if(dead && aliveNeighbours == 3){
            console.log(`REPRODUCTION - (${col}, ${indexInCol}) - ${aliveNeighbours}`)

              return true
          }  else {
            console.log(`NO REPRODUCTION - (${col}, ${indexInCol}) - ${aliveNeighbours}`)
              return false
          }

      } else {
        console.log(`DIED - (${col}, ${indexInCol}) - ${aliveNeighbours}`)

          return false
      }


    }

    React.useEffect(() => {
        console.log(grid)
    }, [grid])

    const gameOfLife = (grid) => {

        let rowSquares = Math.floor(width / squareSize)

        let colSquares = Math.floor(height / squareSize)

        

        let grid2dArray = new Array(rowSquares)

        for(let i = 0; i < rowSquares; i++){
            grid2dArray[i] = new Array(colSquares).fill(false)
        }


        let previousGrid = Array.from(grid)


        for(let i = 0; i < grid2dArray.length; i++){
            for(let j = 0; j < grid2dArray[i].length; j++){
                grid2dArray[i][j] = newState(i, j, previousGrid)
            }
        }

        console.log(grid2dArray)

        
        setGrid(grid2dArray)
        forceUpdate()

    }
    
    React.useEffect(() => {
       initializeGrid( )
    }, [])

    const touchPixel = (col, indexInCol) => {
        let temp = grid
        temp[col][indexInCol] =  !temp[col][indexInCol] 
        setGrid(temp)
        forceUpdate()
    }

    return(
    <div>
        {grid ? 

        <div style={{display: 'flex', flexDirection: 'row'}}>
            {grid.map((row, colNum) => {
                return <Col squares={row} squareSize={squareSize} callback={(index) => touchPixel(colNum,index)}/>
            })}
        
        </div>
        :
        <h1>loading</h1>
        }
         <div style={{marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
         <Button type="primary"  style={{marginRight: '10px'}} shape="round" onClick={() => gameOfLife(grid)}>Next Generation</Button>
         <div style={{display: 'flex'}}>

         <Tooltip title={playing ? "Stop ": "Play"}><Button onClick={() => {
             setPlaying(!playing)
         }} shape="circle" type="ghost" icon={playing ? <StopFilled/>:<CaretRightFilled/>}/></Tooltip>
         
        
        
         <Input type="number" placeholder="Interval" onChange={(e) => setInterval(e.target.value) } suffix="MS" style={{margin: '0px 10px', width: '130px'}} value={interval}/>
         <Tooltip onClick={() => reset()} title="Reset Board"><Button shape="circle" type="ghost" style={{marginRight: '10px'}} icon={<ReloadOutlined/>}/></Tooltip>
         <Tooltip title="Prebuilt Boards"><Button shape="circle" onClick={() => setDrawer(true)}  type="ghost" icon={<AppstoreOutlined/>}/></Tooltip>

         </div>
         </div>
        
         <Drawer
          title="Prebuilt"
          width={400}
          onClose={() => setDrawer(false)}
          visible={drawer}
       
        >
            <div style={{margin:"0px 0px"}}>
                {prebuiltData.map((prebuilt, idx) => {
                    
                    return(
                        <motion.div 
                        onClick={() => {
                            let xStart = Math.floor( grid.length / 2) - prebuilt.arr.length
                            let yStart = Math.floor( grid.length / 2) - prebuilt.arr[0].length

                            for(let i = 0; i < prebuilt.arr.length; i++){
                                for(let j = 0; j < prebuilt.arr[i].length; j++){
                                    grid[xStart + i + 2][yStart + j + 2] = prebuilt.arr[j][i]
                                }
                            }

                            setDrawer(false)
                        }}
                        whileHover={{scale: 1.01}} style={{marginTop: idx != 0 && "40px",cursor: 'pointer',display: 'flex', justifyContent: 'space-between', alignItems:'center'}}>
                            <Title style={{fontWeight: 400}} level={4}>{prebuilt.name}</Title>
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                            {prebuilt.arr.map((row, colNum) => {
                                return <Col gridColor={"transparent"} squares={row} squareSize={10} callback={() => {}}/>

                            })}
                            </div>
                        </motion.div>


                    
                    )
                })}
            </div>
           
        </Drawer>

    </div>

    )

}


export default Grid