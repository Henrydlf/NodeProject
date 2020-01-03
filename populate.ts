db = db.getSiblingDB("bank");
db.customers.drop();
db.customers.insertMany([
	{_id: 1,nom: "Thibault", prenom: "Henry", mail: "thibault.henry@gmail.com", mdp: "aze",
	depense: [{date: 2015, montant: 500.0},{date: 2017,montant: 700.0}] },
	{_id: 2,nom: "Barras", prenom: "Pierre", mail: "barras.pierre@gmail.com", mdp: "aze",
	depense: [{date: 2015, montant: 800.0},{date: 2017,montant: 300.0}] }
]);