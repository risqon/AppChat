import React from 'react'
//import '../../../containers/pages/Register/Register.css'

const Button = ({title, onClick, loading}) => {
    if(loading){
       return <button type="submit" className="button disable" href="/chat">loading...</button>
    }
    return(
        <button type="submit" onClick={onClick} href="/chat">{title}</button>
    
    )
}

export default Button;