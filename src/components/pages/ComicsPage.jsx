import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import { useState } from "react";
import decoration from '../../resources/img/vision.png';

export const ComicsPage= ()=>{
    const [selectedChar, setChar] = useState(null);

    const onCharSelected= (id)=>{
        setChar(id);
    }
    return(
        <>
            <RandomChar/>
            <div className="char__content">
                <CharList onCharSelected={onCharSelected}/>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}