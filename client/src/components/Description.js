import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Description extends Component {

    state = {
        coinData: null
    }
    
    componentDidMount(){

        document.getElementById('loader').style.visibility = 'visible';    
        this.getData();
        
    }
    getData = () => {        
         
        let url = "http://localhost:3005/info/" + this.props.location.state.symbol;

        fetch(url)
            .then(res => {return res.json()})
            .then(data => {                
                document.getElementById('loader').style.visibility = 'hidden';
                this.setState({
                    coinData: data.data[this.props.location.state.symbol]
                })                             
            })  
            .catch(err => {
                console.log(err);
                document.getElementById('loader').style.visibility = 'hidden';
                this.props.history.push('/page404');
            })           
        
    }

    render(){
        let content = "";
        if(this.state.coinData){
            content =
                <div className="content">                    
                    <div className="img_logo">
                        <img src={ this.state.coinData.logo } alt="coin logo" />
                        <h2>{ this.props.location.state.symbol }</h2>
                    </div>
                    <div className="info">
                        <p>Currency name: <span>{ this.state.coinData.name }</span></p>    
                        <p>Website: <a href={this.state.coinData.urls.website ? (this.state.coinData.urls.website[0]) : ("/")}>{ this.state.coinData.urls.website ? (this.state.coinData.urls.website[0]) : ("") }</a></p>   
                        <br /> 
                        <p>Amount you own: <span>{ this.props.location.state.userAmount ? (this.props.location.state.userAmount) : ("0") }</span></p>
                        <p>Value of your coins: <span>{ this.props.location.state.userCoinValue ? (this.props.location.state.userCoinValue) : ("0")}</span></p>                        
                        <h3>Price: { "$ " + this.props.location.state.price }</h3>
                    </div>                                      
                </div> 
            
        }
        return(
            <div id="descript">
                <Link className="back_to_table" to="/">Back to Table</Link>

                   { content }
                
            </div>
        )
    }
}

export default Description;