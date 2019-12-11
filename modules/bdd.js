MongoClient = require("mongodb").MongoClient;

var test = function(usr,password){
  var str= "";
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
          if(doc.mail == usr && doc.mdp == password){
            console.log("Yes!");
          }
      } 
    })
    client.close();
  });
  

}

module.exports = test;