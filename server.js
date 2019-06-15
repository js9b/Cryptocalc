const rp = require('request-promise');
var express = require('express');
var app = express();
var path = require('path');

let currency

const requestOptions = {
  method: 'GET',
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
  qs: {
    'start': '1',
    'limit': '100',
    'convert': 'USD'
  },
  headers: {
    'X-CMC_PRO_API_KEY': '5b3f058a-fa58-4c54-a7cc-d5c9be76cf0d'
  },
  json: true,
  gzip: true
};

setInterval(apidata, 300000);
apidata()
function apidata(){
  rp(requestOptions).then(response => {
    currency = response;
    console.log("Works!");
  
  }).catch((err) => {
    console.log('API call error:', err.message);
  });
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
})
app.use(express.static(path.join(__dirname, '/')));
app.get('/test', function (req, res, next) {
  res.json({ currency });
});

app.listen(8000, function () {
  console.log("such")
})