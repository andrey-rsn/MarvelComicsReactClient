import { useState, useEffect } from 'react';
import './charInfo.scss';
import MarvelService from '../../services/MarvelService';
import  Skeleton  from '../../components/skeleton/Skeleton';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';

const CharInfo = (props)=> {
    const [char,setChar]= useState(null);
    const [loading, setLoading]= useState(false);
    const [error,setError]= useState(false);

    const service= new MarvelService();

    useEffect(()=>{
        updateChar();
    },[props.charId]);

    const updateChar= ()=>{
        const {charId} = props;
        if(!charId){
            return;
        }
        onCharLoading();
        service.getCharacter(charId)
        .then(onCharLoaded)
        .catch(onError);
    }

    const onCharLoaded= (char)=>{
        setChar(char);
        setLoading(false);
    }

    const onCharLoading = ()=>{
        setLoading(true);
    }

    const onError= (error)=>{
        setLoading(false);
        setError(true);
    }

    const skeleton = char || loading || error ? null : <Skeleton/>;
    const spinner= loading ?     <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'center' }}>
                                     <CircularProgress size={100} />
                                </Box> :
                                 null;
    const errorMsg = error ? <Alert severity="error">This is an error alert — check it out!</Alert>  : null;
    const content = !(error || loading || !char) ? <View char={char}/>: null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMsg}
            {spinner}
            {content}
        </div>
    )

    
}

const View = ({char})=>{
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    return(
        <>
            <div className="char__basics">
                    <img src={thumbnail} alt={name}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                   {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {
                        comics.map((item, i)=>{
                            return(
                                <li className="char__comics-item" key={i}>
                                    <a href={item.resourceURI}>{item.name}</a>
                                </li>
                            )
                        })
                    }
                </ul>
        </>
    )
}

CharInfo.propTypes={
    charId: PropTypes.number
}

export default CharInfo;