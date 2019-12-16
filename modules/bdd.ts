var MongoClient = require("mongodb").MongoClient;

var login = function(req, res){
  if(req.body.username != "" && req.body.password!= ""){
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
            if(doc.prenom == req.body.username && doc.mdp == req.body.password){
              console.log("Yes!");
            }
        } 
      });
      client.close();
    })
  }
}

module.exports = login;