import './App.css'
import Login from "./components/login/Login.jsx";
import Register from "./components/register/Register.jsx";
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
