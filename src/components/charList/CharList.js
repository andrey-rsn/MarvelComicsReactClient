import './charList.scss';
import { getImgStyle } from '../randomChar/RandomChar';
import MarvelService from '../../services/MarvelService';
import { useEffect, useMemo, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

const CharList = (props) =>{
    const [chars,setChars]= useState([]);
    const [loading,setLoading]= useState(true);
    const [newItemLoading,setNewItemLoading]= useState(false);
    const [offset,setOffset]= useState(210);
    const [charsEnded,setCharsEnded]= useState(false);

    const service = new MarvelService();

    const loadChars= (offset)=>{
        onCharListLoading();
        service.getAllCharacters(offset)
        .then(onLoadChars); 
    }

    const onCharListLoading= ()=>{
        setNewItemLoading(true);
    }

   const onLoadChars= (newChars)=>{
        const dataEnded = newChars.length < 9;
        setChars([...chars, ...newChars]);
        setLoading(false);
        setNewItemLoading(false);
        setOffset(offset + 9);
        setCharsEnded(dataEnded);
    }

    useEffect(()=>{
        loadChars();
    },[]);

 
    const content= useMemo(()=>{
        return loading ?     <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'center' }}>
                                <CircularProgress size={100} />
                            </Box> :
                            chars.map((item, i)=>{
                                return(
                                    <CharItem
                                    key={item.id} 
                                    item={item}
                                    charSelected={props.onCharSelected}/>
                                )
                            });
    },[loading,chars]);

    const btnStyle = useMemo(()=>{
        return charsEnded ? {display : 'none'}: null;
    }, [charsEnded]);

    return (
        <div className="char__list">
            <ul className="char__grid" style={{alignItems:'center'}}>
                {content}
            </ul>
            <button className="button button__main button__long"
            disabled={newItemLoading}
            onClick={() => loadChars(offset)}
            style={btnStyle}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
    
}

const CharItem= (props)=>{
    const {item:{name,thumbnail,id}}= props;
    const {charSelected}= props;
    return(
    <li className="char__item" 
    key={id}
    onClick={()=>charSelected(id)} >
        <img src={thumbnail} alt="abyss" style={getImgStyle(thumbnail)}/>
        <div className="char__name">{name}</div>
    </li>
    )
    
}

CharList.propTypes={
    onCharSelected: PropTypes.func
}

export default CharList;