import Home from './pages/Home/Home'
import Sell from './pages/Sell/Sell'
import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/sell' element={<Sell />} />
    </Routes>
  )
}

export default App