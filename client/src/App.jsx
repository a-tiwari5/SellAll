import Home from './pages/Home/Home'
import Sell from './pages/Sell/Sell'
import {
  Routes,
  Route,
} from "react-router-dom";
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Navbar from './components/Navbar/Navbar';


const App = (props) => {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/sell' element={<Sell/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  )
}


export default App