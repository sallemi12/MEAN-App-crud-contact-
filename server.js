  var express=require('express');
  var mongoose=require('mongoose');
  var bodyparser=require('body-parser');
  var path =require('path');
  var cors=require('cors');
var session=require('express-session');
var passport=require('passport');
var expressValidator=require('express-Validator');

var app=express();
const route=require('./routes/route');




//connexion bd
mongoose.connect('mongodb://localhost:27017/Memberdb');

//on connection
mongoose.connection.on('connected', () => {
    console.log("connected to database database mongodb @ 27017 ");
});

mongoose.connection.on('error', (err) => {

    if(err){
        console.log('Error in Database connection : ' + err);
    }
});


app.use(cors());
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(session({
	secret:'4sdfs4gt9',
	saveUninitialized:true,
	resave:true
}));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
//express validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//passport

app.use('/', route);
app.get('/', function(req, res){
   res.send("Hello world!");
});

app.listen(8000);
