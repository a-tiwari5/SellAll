import React from 'react'
import "./box.scss"
import StarIcon from '@mui/icons-material/Star';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
const Box = ({ color,name, price, image }) => {
  console.log(name,price, image )
  return (
    
    <div className='box' style={{ backgroundColor: color }}>
      <div className="top d-flex justify-content-between w-100 align-items-center">
        <div className="left d-flex align-items-center justify-content-center bg-dark">
          <StarIcon style={{ color: "yellow" }} fontSize="sm" />
          <div className="rating">4.2</div>
        </div>
        <div className="right align-items-center">
          <FavoriteBorderIcon fontSize='small' sx={{ color: "#666", fontWeight: "lighter" }} />
        </div>
      </div>
      <div className="bottom">
        <div className='img d-flex justify-content-center'>
          <img src={image} alt="" />
        </div>
        <div className='info mt-2'>
          <span className="itemName">{name}</span>
          <span className='quantity ms-2' style={{ color: color }}> MAR 11</span>
        </div>
        <div className="price fw-bold">
          &#8377;{price}
        </div>
      </div>
    </div>
  )
}

export default Box