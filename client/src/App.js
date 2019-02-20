import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Table from './components/Table';
import Description from './components/Description';
import Header from './components/Header';
import Page404 from './components/Page404';
import './scss/style.css';


class App extends Component {
  

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div id='loader'></div>   
          <Header />       
          <Route exact path="/" component={ Table } />
          <Route path="/description" component={ Description } />
          <Route path="/page404" component={ Page404 } />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
