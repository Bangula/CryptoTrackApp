import React, { Component } from 'react';
import bit from '../images/bitcoin.png';

class Header extends Component {

    render(){
        return(
            <div id="header">   
                <div className="container">
                    <img src={ bit } id="bit_img" alt="bitcoin logo"/>
                    <h1 id="headline">CryptoTrack App</h1>
                </div>            
            </div>
        )
    }
    
}

export default Header;