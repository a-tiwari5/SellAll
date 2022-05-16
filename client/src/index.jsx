import reactDom from "react-dom"
import App from "./App"
import { Provider } from "react-redux"
import store from "./store"
import { BrowserRouter } from "react-router-dom";


reactDom.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    , document.querySelector('#root'))