import React from 'react'

import {motion} from 'framer-motion'

const Col = ({squares, squareSize, callback, gridColor}) => {

    return(
        <div style={{height: squares.length * squareSize, width: squareSize, display: 'flex', flexDirection: 'column'}}>
            {squares.map((bool, index) => {
                return(
                    <div clas style={{cursor: bool ? 'pointer': '',display: 'flex',justifyContent: 'center',alignItems:'center',width: squareSize, height: squareSize, border: gridColor || '#e0e0e0 0.1px solid'}} onClick={() => callback(index)}> 
                        {bool && <motion.div initial={{scale: 0}} animate={{scale: 1, transition: {duration: 0.2}}} exit={{scale: 0}} className={bool && 'circle'} whileHover={{scale: 0.92, transition: {duration: 0.05}}} style={{width: '90%', height: '90%', borderRadius: '10000px', padding: '1px'}}>{bool}</motion.div>}
                    </div>
                )
            })}
        </div>


    )
}

export default Col