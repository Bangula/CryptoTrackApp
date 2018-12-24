import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../scss/style.css';


class Table extends Component {
    
    state = {
        cryptoList: [],
        inputCoinAmount: null,
        inputCoinName: null,
        update: true,
        paginationFrom: 0,
        paginationTo: 10
    }
    
    componentDidMount(){

        document.getElementById('loader').style.visibility = 'visible';
        this.getData(); 
        setInterval(() => {
           this.getData();
        }, 60*1000);
                             
    }
    getData = () => {
        fetch('http://localhost:3005/api')
            .then(res => {return res.json()})
            .then(data => {

                this.setState({
                    cryptoList: data.data.slice(0, 50)
                });
                document.getElementById('loader').style.visibility = 'hidden';   
                
            })
            .catch(err => {
                console.log(err);
                document.getElementById('loader').style.visibility = 'hidden';
                this.props.history.push('/page404');
            })
    }
    paginationChange = (e) => {
        let pfrom,
            pto;
        switch(e.target.id){
            case 'span1':
                pfrom = 0;
                pto = 10
                break;
            case 'span2':
                pfrom = 10;
                pto = 20;
                break;   
            case 'span3':
                pfrom = 20;
                pto = 30;
                break; 
            case 'span4':
                pfrom = 30;
                pto = 40;
                break;
            case 'span5':
                pfrom = 40;
                pto = 50;
                break;  
            default:
                pfrom = 0;
                pto = 10                  
        }
        let numbers = document.getElementsByClassName('pagin_num');
        for (let i=0; i<numbers.length; i++){
            numbers[i].style.color = '#2856a0';
        };
        document.getElementById(e.target.id).style.color = 'rgba(0,0,200,0.3)';
       this.setState({
            paginationFrom: pfrom,
            paginationTo: pto
        })
    }
    handleForm = (e) => {
        e.preventDefault();
        let coinName = this.state.inputCoinName;
        let coinAmount = this.state.inputCoinAmount;
        
        window.localStorage.setItem(coinName, coinAmount);
        this.setState(prevState => ({
            update: !prevState.update
        }));                
        
    }
    handleInput = (e) => {
        
        let id = e.target.id;
        if(e.target.value !== ""){
            document.getElementById('btn' + id).disabled = false;
            this.setState({
                inputCoinAmount: e.target.value,
                inputCoinName: e.target.id
            })
        }else{
            document.getElementById('btn' + id).disabled = true; 
        }        

    }
    render(){

        let list = this.state.cryptoList.slice(this.state.paginationFrom, this.state.paginationTo).map(crypto => {            
            let disabled = true;
            let percentColor;
            let inputValue = "";
            let userCoinValue = "-";            
            let profit = "-";

            if(window.localStorage.getItem(crypto.name)){
                inputValue = window.localStorage.getItem(crypto.name);
                userCoinValue = "$ " + (inputValue * crypto.quote.USD.price.toFixed(2)).toFixed(2);
                profit = "$ " + ((inputValue * crypto.quote.USD.price).toFixed(2) * (crypto.quote.USD.percent_change_24h.toFixed(2) / 100)).toFixed(2);
            }
            
            crypto.quote.USD.percent_change_24h >= 0 ? (percentColor = 'blue') : (percentColor = 'red');

            return (
                <tr key={ crypto.id }>
                    <td><Link to={{ 
                        pathname: '/description',
                        state: {
                            symbol: crypto.symbol,
                            price: crypto.quote.USD.price.toFixed(2),
                            userAmount: inputValue,
                            userCoinValue: userCoinValue
                            } 
                        }} title="More info..."  className="cryptoName">{ crypto.name }</Link></td>
                    <td>{ crypto.symbol }</td>
                    <td>{ "$ " + crypto.quote.USD.price.toFixed(2) }</td>
                    <td><span className={ percentColor }>{ crypto.quote.USD.percent_change_24h.toFixed(2) + " %"}</span></td>
                    <td>
                        <form onSubmit={ this.handleForm }>
                            <input type="number" id={ crypto.name } onKeyUp={this.handleInput} placeholder={ inputValue } min="0" step="any"/><br />
                            <button id={"btn" + crypto.name} disabled={ disabled }>Submit</button>
                        </form>                    
                    </td>
                    <td>{ userCoinValue }</td>
                    <td><span className={ percentColor }>{ profit }</span></td>
                    
                </tr>
            )
        })
        return(
            <div id="table">
                <div className="container">
                    <h3>Top 50 Cryptocurrencies</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Short Name</th>
                                <th>$ Value</th>
                                <th>24h Change</th>
                                <th>Amount you own</th>
                                <th>$ Value of your coins</th>
                                <th>24h Profit for your amount</th>
                                
                            </tr>
                        </thead>                    
                        <tbody>
                            { list }                    
                        </tbody>
                    </table>
                    <div className="pagination">
                        <span className="pagin_num" id="span1" onClick={ this.paginationChange }>1</span>
                        <span className="pagin_num" id="span2" onClick={ this.paginationChange }>2</span>
                        <span className="pagin_num" id="span3" onClick={ this.paginationChange }>3</span>
                        <span className="pagin_num" id="span4" onClick={ this.paginationChange }>4</span>
                        <span className="pagin_num" id="span5" onClick={ this.paginationChange }>5</span>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Table;