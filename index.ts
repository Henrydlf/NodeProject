// Import a module

var express = require('express');
var path = require('path');
var app = express();
var bdd = require('./modules/bdd.ts');
var bodyParser = require('body-parser');


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set('port', 3000) 
app.set('views', __dirname + "/views")
app.set('view engine', 'ejs');  

app.get('/Login' ,function(req, res){
  res.render('pages/Login.ejs');
});

app.post('/Login' ,function(req, res){
  bdd.login(req,res);
  if(req.body.mail != "" && req.body.password!= "")
  {
    res.redirect('/')
  }else{
    res.redirect('/Login')
  }
});

app.get(
  '/SignUp', 
  (req, res) => res.render('pages/SignUp.ejs')
)

app.post('/SignUp', function(req,res){
  bdd.signUp(req,res);
})

app.get(
  '/Display',
  function(req,res){
    var test = bdd.displayDatabase();
    console.log(test);
    res.render('pages/Display.ejs',{ database: test});
  }
)

app.get(
  '/:name', 
  (req, res) => res.render('pages/UserPage.ejs', {name: req.params.name})
)

app.get(
  '/', 
  (req, res) => res.render('pages/HomePage.ejs')
)

app.listen(
  app.get('port'), 
  () => console.log(`server listening on ${app.get('port')}`)
)

function dis(){
  console.log("a l'attaque");
}