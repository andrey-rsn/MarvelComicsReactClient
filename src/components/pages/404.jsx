import { Link } from "react-router-dom"

export const  Page404= ()=>{
    return (<div style={{textAlign:'center'}}>
        <h1>404</h1>
        <h2>Page NOT FOUND </h2>
        <Link to="/">На главную</Link>
    </div>)
}