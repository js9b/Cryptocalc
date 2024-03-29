const rp = require('request-promise');
var express = require('express');
var app = express();
var path = require('path');
//var cors = require('cors');

const process = require('process');


//const PORT = process.env.PORT || 4000;


let currency

const requestOptions = {
  method: 'GET',
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
  qs: {
    'start': '1',
    'limit': '204',
    'convert': 'USD'
  },
  headers: {
    'X-CMC_PRO_API_KEY': ''//
  },
  json: true,
  gzip: true
};

setInterval(apidata, 300000);
apidata()
function apidata(){
  rp(requestOptions).then(response => {
    for(let i =0;i<response.data.length; i++){         
      //response.data[i].quote.USD.price = (Math.round(response.data[i].quote.USD.price * 100, 2) / 100)
      response.data[i].quote.USD.percent_change_24h=(Math.round (response.data[i].quote.USD.percent_change_24h  * 100, 2) / 100)  
    }
    currency = response;
    console.log("Data update");
    
  }).catch((err) => {
    console.log('API call error:', err.message);
  });
}
/*

app.use(express.static(path.join(__dirname, '/')));
//////////////
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/')));
  //
  app.get('/', (req, res) => {
    res.sendfile(path.join(__dirname = '/index.html'));
  })
}*/
//////////////////////////
app.use(express.static(__dirname + '/'));
//app.use(cors({origin: 'https://cryptocalq.herokuapp.com:4000'}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://cryptocalq.herokuapp.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
  console.log("work?")
})
app.get('/test', function (req, res, next) {
  res.json({ currency });
});

app.listen(process.env.PORT || 4000, function () {
  console.log("Start")
})

