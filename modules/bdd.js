MongoClient = require("mongodb").MongoClient;

var test = function(){
  var str= "";
  MongoClient.connect('mongodb://localhost',{useUnifiedTopology: true}, (err,client)=>{
    if(err){
      console.err(err);
      return
    }

    const db = client.db('bank');
    const collection = db.collection('customers');
    
    collection.find().each(function(err,doc){
      if(doc!=null){
          console.log(doc);
      } 
    })
    client.close();
  });
}

module.exports = test;