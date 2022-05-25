import { useState } from 'react'
import "./navbar.scss"
import { Modal, Button } from 'react-bootstrap'
import { RemoveRedEyeOutlined } from '@mui/icons-material/';
import { FacebookRounded, Google } from '@mui/icons-material/';
import { Search, ArrowDropDown } from '@mui/icons-material'
import { Link } from "react-router-dom"
import { connect } from 'react-redux';
import { LogOutUser } from '../../actions';
import axios from 'axios';
const Navbar = (props) => {
    const [show, setShow] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [signIn, setSignIn] = useState(false)


    const logoutHandler = async (logoutuser) => {
        await axios.get('/auth/logout')
        localStorage.removeItem('token')
        logoutuser(props.currentUser);
    }
    return (
        <div className='navbarContainer w-auto sticky-top' >
            <div className="items w-auto d-flex justify-content-between h-100 align-items-center">
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <div className="item">
                        <div className="logo fs-5">
                            <span className='text-success fw-bold'>Sell</span>All
                        </div>
                    </div>
                </Link>
                {
                    window.location.pathname === '/login' || window.location.pathname === '/sell' ?
                        '' : <div className="item">
                            <div className="inputContainer d-flex align-items-center">
                                <Search className='search' />
                                <input className='input' type="text" name="" id="" placeholder='Search for any product in SellAll' />
                            </div>
                        </div>
                }
                <div className="left">
                    {props.currentUser.name ?
                        <div style={{ cursor: "pointer" }} className="d-flex align-items-center">
                            <img className='avatar mx-2' src="https://images.unsplash.com/photo-1525648199074-cee30ba79a4a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" />
                            <span className='text-dark'>{props.currentUser.name}</span>
                            <div className='btn btn-primary mx-4' onClick={() => logoutHandler(props.LogOutUser)}>Logout</div>
                        </div> :
                        <Link to='/login'>
                            <div style={{ cursor: "pointer" }}>
                                Create account. <span className='text-primary'>It's free</span><ArrowDropDown />
                            </div>
                        </Link>

                    }
                </div>
            </div>
            {/* onClick={() => { setShow(!show) }}  ->set this in left div for opening modal */}
            {/* <Modal dialogClassName='my-modal' aria-labelledby="contained-modal-title-vcenter" centered show={show}>
                <Modal.Header className='title d-flex justify-content-center'>
                    <span className='text-success'>Let's Buy, Rent &#38;  Sell things on SellAll. Sign up now 🤘🏼</span>
                </Modal.Header>
                <Modal.Body>
                    <div className="top mx-2">
                        <div className="items d-flex justify-content-between align-items-center">
                            <h3 className='left'>{!signIn ?'Create Account':'Sign In'}</h3>
                            <span className='right d-flex'>Already have an account? <p style={{cursor:"pointer"}} onClick={()=>setSignIn(!signIn) } className='text-primary'> Sign In</p></span>
                        </div>
                    </div>
                    <div className="bottom d-flex">
                        <div className="left d-flex flex-column">
                            {!signIn ? <div className="items d-flex justify-content-start">
                                <input className='item' type="text" placeholder='FirstName' />
                                <input className='item' type="text" placeholder='LastName' />
                            </div>: ''
                            }
                            <input className="item" type="email" placeholder='Email' />
                            <div className="item d-flex align-items-center ">
                                <input className='email mx-2' type="email" placeholder='Password' />
                                <RemoveRedEyeOutlined className='mx-2' />
                            </div>
                            <input className="item" type="email" placeholder='Confirm Password' />
                            <Button className='create-account' onClick={() => { setShow(!show); setLoggedIn(!loggedIn) }}>{!signIn ? 'Create Account' : 'Sign In'}</Button>
                            <Button className='google btn-light d-flex align-items-center justify-content-center my-2'><FacebookRounded className='icon' onClick={() => setShow(!show)} /> Sign Up Facebook</Button>
                            <Button className='google btn-light d-flex align-items-center justify-content-center my-2'><Google className='icon mx-2' /> Sign Up Google</Button>
                        </div>
                        <div className="right d-flex flex-column justify-content-between">
                            <img src="data:image/png;base64,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" width="420" height="300" />
                            <p className='terms'>By signing up, you agree to our Terms &#38; conditions, Privacy policy</p>
                        </div>
                    </div>
                </Modal.Body>
            </Modal> */}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser.currentUser
    }
}

export default connect(mapStateToProps, { LogOutUser })(Navbar)