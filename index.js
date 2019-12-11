// Import a module
express = require('express');
path = require('path');
app = express();
test = require('./modules/bdd');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});


app.use(express.static(path.join(__dirname, 'public')));

app.set('port', 3000) 
app.set('views', __dirname + "/views")
app.set('view engine', 'ejs');   

app.get('/Login', urlencodedParser ,function(req, res){
  res.render('pages/Login.ejs');
  if(req.query.username != "" && req.query.password!= ""){
    test(req.query.username,req.query.password);


  }


  
});

app.get(
  '/SignUp', 
  (req, res) => res.render('pages/SignUp.ejs')
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