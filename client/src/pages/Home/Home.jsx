import "./home.scss"
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from "../../components/Navbar/Navbar"
import { ArrowDropDown } from "@mui/icons-material"
import Box from "../../components/Box/Box"
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Products = [
    {
        name: "iPhone 12 Pro",
        price: "25,000",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW9iaWxlJTIwcGhvbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Dell Laptop",
        price: "40,000",
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bGFwdG9wJTIwaHB8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Laptop Tabel",
        price: "5000",
        image: "https://images-eu.ssl-images-amazon.com/images/I/51hRbTfKZ-L._SX300_SY300_QL70_FMwebp_.jpg"
    },
    {
        name:"Personal Air Cooler",
        price:"3000",
        image:"https://m.media-amazon.com/images/I/51QaS96vdpL._SX522_.jpg"
    },
    {
        name: "iPhone 12 Pro",
        price: "25,000",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW9iaWxlJTIwcGhvbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Dell Laptop",
        price: "40,000",
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bGFwdG9wJTIwaHB8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Laptop Tabel",
        price: "5000",
        image: "https://images-eu.ssl-images-amazon.com/images/I/51hRbTfKZ-L._SX300_SY300_QL70_FMwebp_.jpg"
    },
    {
        name:"Personal Air Cooler",
        price:"3000",
        image:"https://m.media-amazon.com/images/I/51QaS96vdpL._SX522_.jpg"
    }

]


const Home = () => {
    return (
        <div className='homeContainer w-100'>
            <Navbar />
            <div id="header-img">
                <div className="text">
                    <h1 className='text-light fs-1'>Buy What You Need, Sell What You Don't.</h1>
                    <p className='text-light m-3 '>A platform for college students to Buy, Sell and Rent things online.  </p>
                </div>
            </div>
            <div className="mainConatiner vh-100 ">
                <div className="mainNav mx-auto">
                    <div className="items d-flex justify-content-between align-items-center">
                        <div className="left d-flex">
                            <div className="item text-dark fw-bold">
                                All Categories(32)
                                <ArrowDropDown />
                            </div>
                            <div className="item">
                                Mobiles
                            </div>
                            <div className="item">
                                Bikes
                            </div>
                            <div className="item">
                                Electronic and Appliances
                            </div>
                            <div className="item">
                                Sports
                            </div>
                        </div>
                        <div className="right d-flex ">
                            <div className="btn-1 bg-light d-flex align-items-center justify-content-around w-50 mx-2">
                                <button className="btn btn-light w-25">Sell</button>
                                <ArrowDropDown sx={{ cursor: "pointer" }} />
                            </div>
                            <div className="btn-1 bg-success d-flex align-items-center justify-content-between w-50 mx-2">
                                <button className="btn btn-success w-25">Saved</button>
                                <AddCircleIcon sx={{ cursor: "pointer", color:"white", marginRight:"2px" }} />
                            </div> 
                        </div>

                    </div>
                </div>
                <div className="container my-4">
                    <div className="row justify-content-around">
                        <Box className="col-sm" color="#F8E3ED" name={Products[0].name} price={Products[0].price} image={Products[0].image} />
                        <Box className="col-sm" color="#FFF5E8" name={Products[1].name} price={Products[1].price} image={Products[1].image} />
                        <Box className="col-sm" color="#E7FFFB" name={Products[2].name} price={Products[2].price} image={Products[2].image} />
                        <Box className="col-sm" color="#E7FFFD" name={Products[3].name} price={Products[3].price} image={Products[3].image} />
                        <Box className="col-sm" color="#FDFFF3" name={Products[4].name} price={Products[4].price} image={Products[4].image} />
                        <Box className="col-sm" color="#D4E7F8" name={Products[5].name} price={Products[5].price} image={Products[5].image} />
                        <Box className="col-sm" color="#FDF3F6" name={Products[6].name} price={Products[6].price} image={Products[6].image} />
                        <Box className="col-sm" color="#FFF5F2" name={Products[2].name} price={Products[2].price} image={Products[2].image} />
                        <Box className="col-sm" color="#E7FFFD" name={Products[3].name} price={Products[3].price} image={Products[3].image} />
                        <Box className="col-sm" color="#E7FFFD" name={Products[3].name} price={Products[3].price} image={Products[3].image} />
                        <Box className="col-sm" color="#E7FFFD" name={Products[3].name} price={Products[3].price} image={Products[3].image} />
                        <Box className="col-sm" color="#E7FFFD" name={Products[3].name} price={Products[3].price} image={Products[3].image} />
                        <Box className="col-sm" color="#E7FFFD" name={Products[3].name} price={Products[3].price} image={Products[3].image} />
                        <Box className="col-sm" color="#E7FFFD" name={Products[3].name} price={Products[3].price} image={Products[3].image} />
                    </div>
                    {/* <div className="d-flex flex-column align-items-center">
                        <div className="location mx-2 d-flex">
                            <LocationOnOutlined style={{ cursor: "pointer" }} />
                            <div>
                                <input className="" placeholder="Noida, India" type="text" />
                                <EditIcon style={{ cursor: "pointer" }} />
                            </div>
                        </div>
                        <div className="info d-flex align-items-center justify-content-center">
                            <HelpIcon style={{ cursor: "pointer" }} />
                            <span>Your location will help us serve better and extend a personalised experience.</span>
                        </div>
                    </div> */}


                </div>
            </div>
        </div>
    )
}

export default Home