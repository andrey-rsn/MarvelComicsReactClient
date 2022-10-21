import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import { useState } from "react";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { MainPage, } from "../pages/MainPage";
import decoration from '../../resources/img/vision.png';
import { ComicsPage } from "../pages/ComicsPage";
import { Page404 } from "../pages/404";

const App = (props)=> {
    const [selectedChar, setChar] = useState(null);

    const onCharSelected= (id)=>{
        setChar(id);
    }

    return (
        <Router>
            <div className="app">
            <AppHeader/>
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage/>}>
                        </Route>
                        <Route path="/comics" element={<ComicsPage/>}>
                        </Route>
                        <Route path="*" element={<Page404/>}>
                        </Route>
                    </Routes>
                </main>
            </div>
        </Router>
    )

    
}

export default App;