var MongoClient = require("mongodb").MongoClient;
var userJson = require('../user.json');
var fs = require('fs');
//var User= require('./UserProfil.ts');



var login = function(req, res,callback){
  if(req.body.username != "" && req.body.password!= ""){
    MongoClient.connect('mongodb://localhost',{useUnifiedTopology: true}, (err,client)=>{
      if(err) throw err;

      const db = client.db('bank');
      const collection = db.collection('customers');
      
    

      collection.find().each(function(err,doc){
        if(err) throw err;
        if(doc!=null){
            
            if(doc.mail == req.body.mail && doc.mdp == req.body.password){
    
              
              fs.writeFileSync('./user.json', JSON.stringify(doc), function(erreur) {
                
                if (erreur) {
                    console.log(erreur)}
                
              })
              
              var data = fs.readFileSync('./user.json');
              var content = JSON.parse(data);
              console.log("Prenom:" + content.prenom);
              
              callback(0);
          }else{
            var i = collection.countDocuments();
            i.then(() => {
              callback(1);
              client.close();
            })
          }
        } 
      });
      
      
      
    })
  }
}

var signOut = function(){
  fs.writeFile('./user.json', '{"_id":0,"nom":"","prenom":"","mail":"","mdp":"","depense":[]}', function(erreur){
    if(erreur) throw erreur;
    console.log("Sign out done");
  });
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
        if(doc!=null){
          if(doc.mail == req.body.mail){
            exist ++;
          }
        }
      })
      
      var i= collection.countDocuments();

      i.then(() => {
        if(exist == 0){
          collection.insertOne(newCustomer, function(err,res){
            if(err) throw err;
            console.log( "New customer added");
            
          }); // Blinder si le compte existe déjà
        }else{
          console.log("This e-mail address is already used");
        }

        client.close();
      });

 
      
    });
  }
}

 function displayDatabase(callback){
  var tab= [];

  MongoClient.connect('mongodb://localhost',{useUnifiedTopology: true}, (err,client)=>{
    if(err) throw err;
    
    const db = client.db('bank');
    const collection = db.collection('customers');

    console.log("Début du display");
 
    collection.find().each(function(err,doc){
      if(err) throw err;
      if(doc!=null){
        tab.push(doc);  
      }
    })
    
    var i = collection.countDocuments();
    
    i.then(() => {
      console.log(i);
      callback(err,tab);              
    });

    console.log(tab);
   
    

    client.close(); 
  });
}


var addOutcome = function(req,res,callback){
  if(req.body.date!="" && req.body.amount!=""){
    var data = fs.readFileSync('./user.json');
    var content = JSON.parse(data);
    var query= { mail: content.mail};
    var update = {$push: {depense: {date: req.body.date, montant: req.body.amount}}};
    var queryFind = {mail: content.mail};
    
    MongoClient.connect('mongodb://localhost', {useUnifiedTopology: true}, (err,client) => {
      if(err) throw err;

      const db = client.db('bank');
      const collection = db.collection('customers');
      
      var promise = new Promise((resolve, reject)=> {
          collection.updateOne(query,update,function(err){
          if(err) reject(err);
          console.log("doc updated");
          resolve("Success");
        })
      });

      promise.then( () =>{
        collection.findOne(queryFind,function(err,doc){
          if(err) reject(err);
          fs.writeFileSync('./user.json', JSON.stringify(doc), function(err){
            if(err) throw err;
          });
          client.close();
          // resolve("Success");
        })
      });

      promise.then(() =>{
        callback(err);
      });

      // collection.updateOne(query,update,function(err){
      //   if(err) throw err;
      //   console.log("doc updated");
      //   return success = "Success"
      // }).then( (success) =>{
      //   collection.findOne(queryFind,function(err,doc){
      //     if(err) throw err;
      //     fs.writeFileSync('./user.json', JSON.stringify(doc), function(err){
      //       if(err) throw err;
      //     });
      //     collection.close();
      //     callback(err);
      //   })
      // })
    });
  }


}

exports.login = login;
exports.signUp = signUp;
exports.displayDatabase = displayDatabase;
exports.signOut = signOut;
exports.addOutcome = addOutcome;
