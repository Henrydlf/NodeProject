class userProfil {
    public nom: string;
    public prenom: any;
    public mail: any;
    public pwd: any;
    public depense: any;

    public constructor(nom, prenom, mail, pwd, depense){
        this.nom = nom; 
        this.prenom = prenom;
        this.mail = mail;
        this.pwd = pwd;
        this.depense = depense;
    }

    public display(){
        console.log("nom" + this.nom);
    }
}

