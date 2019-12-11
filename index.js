// Import a module
express = require('express')
path = require('path')
app = express()
var bdd = require('./bdd');
var MongoClient = require("mongodb").MongoClient;


app.use(express.static(path.join(__dirname, 'public')))

app.set('port', 3000) 
app.set('views', __dirname + "/views")
app.set('view engine', 'ejs');   


app.get(
  '/login', 
  function(req,res,next){
    var str= "";
    MongoClient.connect('mongodb://localhost',{useUnifiedTopology: true}, (err,client)=>{
      if(err){
        console.err(err);
        return
      }
  
      const db = client.db('bank');
      const collection = db.collection('customers');
      
      console.log("fuck you");
      collection.find().each(function(err,doc){
          if(doc!=null){
              console.log(doc);
          }
        
      })
  
  
      client.close();
    });
  }
)

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
