
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
      client.close();
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
   
    

    // if(tab.length  ){
    //   callback(err,tab);
    // }

    client.close();     
    

    
  });

 
  
}





exports.login = login;
exports.signUp = signUp;
exports.displayDatabase = displayDatabase;