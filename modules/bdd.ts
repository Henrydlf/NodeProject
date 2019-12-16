var MongoClient = require("mongodb").MongoClient;

var login = function(req, res){
  res.render('pages/Login.ejs');
  if(req.query.username != "" && req.query.password!= ""){
    MongoClient.connect('mongodb://localhost',{useUnifiedTopology: true}, (err,client)=>{
      if(err){
        console.err(err);
        return
      }
      const db = client.db('bank');
      const collection = db.collection('customers');
      console.log(req.body.username,req.body.password);
      
      collection.find().each(function(err,doc){
        if(doc!=null){
            if(doc.prenom == req.query.username && doc.mdp == req.query.password){
              console.log("Yes!");
              res.redirect('/');
            }
        } 
      });
      client.close();
    })
  }
}

module.exports = login;