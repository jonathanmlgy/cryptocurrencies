var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
const axios = require('axios');
var app = express();
let page = 1;
let listNum = 10;
let currentList = '/crypto'
let link = '';
//USE
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static( __dirname + "/static" ));
app.use(session({
    secret: 'user',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

//SET
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

//GET
app.get("/", function(req, res) {
    res.render("index");
});



app.get('/crypto', function(req, res){
    currentList = '/crypto';
    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${listNum}&page=${page}&sparkline=false`)
    .then(data => {
        res.json(data.data);
    })
    .catch(error => {
        console.log(error);
        res.json(error);
    });
});

app.get('/finance', function(req, res){
    currentList = '/finance';
    console.log(currentList);
    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=decentralized-finance-defi&order=market_cap_desc&per_page=${listNum}&page=${page}&sparkline=false`)
    .then(data => {
        res.json(data.data);
    })
    .catch(error => {
        console.log(error);
        res.json(error);
    });
});

app.get('/exchanges', function(req, res){
    currentList = '/exchanges';
    axios.get(`https://api.coingecko.com/api/v3/exchanges?per_page=${listNum}&page=${page}`)
    .then(data => {
        res.json(data.data);
    })
    .catch(error => {
        console.log(error);
        res.json(error);
    });
});

app.get('/next', function(req, res){
    page++;
    if(currentList == '/crypto') {
        link = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${listNum}&page=${page}&sparkline=false`;
    } else if (currentList == '/finance') {
        link = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=decentralized-finance-defi&order=market_cap_desc&per_page=${listNum}&page=${page}&sparkline=false`;
    
    } else if (currentList == '/exchanges') {
        link = `https://api.coingecko.com/api/v3/exchanges?per_page=${listNum}&page=${page}`;
    }

    axios.get(link)
    .then(data => {
        res.json(data.data);
    })
    .catch(error => {
        console.log(error);
        res.json(error);
    });
});

app.get('/previous', function(req, res){
    if(page > 0 ) {
        page--;
    }
    if(currentList == '/crypto') {
        link = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${listNum}&page=${page}&sparkline=false`;
    } else if (currentList == '/finance') {
        link = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=decentralized-finance-defi&order=market_cap_desc&per_page=${listNum}&page=${page}&sparkline=false`;
    
    } else if (currentList == '/exchanges') {
        link = `https://api.coingecko.com/api/v3/exchanges?per_page=${listNum}&page=${page}`;
    }
    
    axios.get(link)
    .then(data => {
        res.json(data.data);
    })
    .catch(error => {
        console.log(error);
        res.json(error);
    });
});

app.get('/top100', function(req, res){
    listNum = 100;
    if(currentList == '/crypto') {
        link = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${listNum}&page=${page}&sparkline=false`;
    } else if (currentList == '/finance') {
        link = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=decentralized-finance-defi&order=market_cap_desc&per_page=${listNum}&page=${page}&sparkline=false`;
    
    } else if (currentList == '/exchanges') {
        link = `https://api.coingecko.com/api/v3/exchanges?per_page=${listNum}&page=${page}`;
    }
    
    axios.get(link)
    .then(data => {
        res.json(data.data);
    })
    .catch(error => {
        console.log(error);
        res.json(error);
    });

});

app.listen(8000, function(){
    console.log("Listening on port: 8000");
});
