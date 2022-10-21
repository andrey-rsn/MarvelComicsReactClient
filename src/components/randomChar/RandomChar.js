import { Component } from 'react';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

class RandomChar extends Component {
    constructor(props){
        super(props);

    }

    state={
        char:{},
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    onCharLoaded= (char)=>{
        this.setState({char,loading: false});
    }

    onCharLoading = ()=>{
        this.setState({loading: true})
    }

    onError= (error)=>{
        this.setState({
            loading: false,
            error: true
        });
    }

    componentDidMount(){
        this.updateCharacter();
    }


    updateCharacter= ()=>{
        const id = Math.floor(Math.random() * (1011400-1011000) + 1011000);
        this.onCharLoading();
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render(){
        const {char, loading,error} = this.state;

        const spinner= loading ?     <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'center' }}>
                                         <CircularProgress size={100} />
                                    </Box> :
                                     null;
        const errorMsg = error ? <Alert severity="error">This is an error alert — check it out!</Alert>  : null;
        const content = !(error || loading) ? <View char={char}/>: null; 
        return (
            <div className="randomchar">
                {spinner || errorMsg || content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={this.updateCharacter}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
    
}

const getImgStyle= (url)=>{
    const ref = new URL(url);
    const quaryArray = ref.pathname.split('/');

    if(quaryArray[quaryArray.length-1] === 'image_not_available.jpg' ){
        return {objectFit: 'contain'}
    }

    return null;
}


const View = (char)=>{
    const {char:{name, description, thumbnail, homepage, wiki}} = char;


    return (
        <div className="randomchar__block">
                    <img src={thumbnail} alt="Random character" className="randomchar__img" style={getImgStyle(thumbnail)}/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">
                           {description}
                        </p>
                        <div className="randomchar__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
    )
}

export default RandomChar;
export {getImgStyle};