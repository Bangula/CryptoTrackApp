const fetch = require('node-fetch');
const express = require('express');
var cors = require('cors');

const app = express();
app.use(cors());

app.get('/api', (req, res) => {

  fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=72826d73-8580-4522-87bf-5410710d79f6')
    .then(res => {
        return res.json();
    })
    .then(data => {
        res.send(JSON.stringify(data));
    })
    .catch(err => console.log(err))  

});
app.get('/info/:symbol', (req, res) => {
    
    let url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?CMC_PRO_API_KEY=72826d73-8580-4522-87bf-5410710d79f6&symbol=' + req.params.symbol;
    fetch(url)
      .then(res => {return res.json()})
      .then(data => {
          res.send(JSON.stringify(data))
      })
      .catch(err => console.log(err))
})

app.listen(3005, () => {
    console.log('Server is running on port 3005');
});