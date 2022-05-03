import React from 'react'
import "./box.scss"
import StarIcon from '@mui/icons-material/Star';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { fontWeight } from '@mui/system';
const Box = ({ color }) => {
  return (

    <div className='box' style={{ backgroundColor: color }}>
      <div className="top d-flex justify-content-between w-100 align-items-center">
        <div className="left d-flex align-items-center justify-content-center bg-dark">
          <StarIcon style={{ color: "yellow" }} fontSize="sm" />
          <div className="rating">4.2</div>
        </div>
        <div className="right align-items-center">
            <FavoriteBorderIcon fontSize='small' sx={{color:"#666",fontWeight:"lighter"}}/>
        </div>
      </div>
      <div className="bottom">
        <div className='img d-flex justify-content-center'>
            <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'" alt="" />
        </div>
        <div className='info mt-2'>
          <span className="itemName">Cabage salad</span>
          <span className='quantity ms-2' style={{color:color}}>250g</span>
        </div>
        <div className="price fw-bold">
          $ 4.99
        </div>
      </div>
    </div>
  )
}

export default Box