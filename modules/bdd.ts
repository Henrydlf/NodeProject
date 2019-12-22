var MongoClient = require("mongodb").MongoClient;

var login = function(req, res){
  if(req.body.username != "" && req.body.password!= ""){
    MongoClient.connect('mongodb://localhost',{useUnifiedTopology: true}, (err,client)=>{
      if(err) throw err;

      const db = client.db('bank');
      const collection = db.collection('customers');
      console.log(req.body.mail,req.body.password);
      
      collection.find().each(function(err,doc){
        if(err) throw err;
        if(doc!=null){
            if(doc.mail == req.body.mail && doc.mdp == req.body.password){
              console.log("Yes!");
            }
        } 
      });
      client.close();
    })
  }
}

var signUp = function(req,res){
  if(req.body.name != "" && req.body.firstname != "" && req.body.mail != "" && req.body.password != ""){
    MongoClient.connect('mongodb://localhost',{useUnifiedTopology: true}, (err,client)=>{
      if(err) throw err;

      const db = client.db('bank');
      const collection = db.collection('customers');

      var exist = 0;
      var newCustomer = { nom: req.body.name, prenom: req.body.firstname, mail: req.body.mail, mdp: req.body.password};
      
      collection.find().each(function(err,doc){
        if(doc.mail == req.body.mail){
          exist ++;
          console.log(exist);
        }
      })

      if(exist == 0){
        collection.insertOne(newCustomer, function(err,res){
          if(err) throw err;
          console.log( "New customer added");
          
        }); // Blinder si le compte existe déjà
      }
      db.close();
    });
  }
}



var displayDatabase = function(){
    MongoClient.connect('mongodb://localhost',{useUnifiedTopology: true}, (err,client)=>{
      if(err) throw err;
      var tab;
      const db = client.db('bank');
      const collection = db.collection('customers');

     
      
      collection.find().each(function(err,doc){
        if(err) throw err;
        console.log(doc);
        tab.push(doc);
      });

          
      db.close();
      console.log(tab);
      return tab;
    });
  
}




exports.login = login;
exports.signUp = signUp;

module.exports.displayDatabase = displayDatabase;