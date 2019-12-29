MongoClient = require("mongodb").MongoClient;

var login = function(usr,password){
  MongoClient.connect('mongodb://localhost',{useUnifiedTopology: true}, (err,client)=>{
    if(err){
      console.err(err);
      return
    }

    const db = client.db('bank');
    const collection = db.collection('customers');
    console.log(usr,password);
    
    collection.find().each(function(err,doc){
      if(doc!=null){
          if(doc.prenom == usr && doc.mdp == password){
            LoggedIn = true;
            console.log("LoggedIn: "+LoggedIn);
          } 
      } 
    })
    client.close();
  });
}

exports.login = login;