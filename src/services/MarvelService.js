

class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=db2b81d980950f14a1d5b80a955edcd4';
    _baseOffset = 210;
    _baseLimit= 9;
    getResource= async (url)=>{
        let res = await fetch(url);

        if(!res.ok){
            throw new Error(`Could not fetch ${url} status ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async (offset=this._baseOffset)=>{
        const res = await this.getResource(`${this._apiBase}characters?limit=${this._baseLimit}&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(res=>this._transformCharacter(res));
    }

    getCharacter = async (id)=>{
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _filterDecription = (description)=>{
        if(description === ''){
            return "Description is undefined";
        }

        return description.length > 100 ? `${description.slice(0,97)}...` : description;
    }

    _transformCharacter= (char)=>{
        return {
            id: char.id,
            name: char.name,
            description: this._filterDecription(char.description),
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
}

export default MarvelService;