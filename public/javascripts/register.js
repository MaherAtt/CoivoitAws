
function verifInsc() {

    var erreur;

    var prenom = document.getElementById("prenom");
    var nom = document.getElementById("nom");
    var email = document.getElementById("emailreg");
    var mdp1 = document.getElementById("mdp1");
    var mdp2 = document.getElementById("mdp2");

    if(!prenom.value){
        erreur += "Veuillez entrer un Prenom! <br />"
    }

    if(!nom.value){
        erreur += "Veuillez entrer un Nom! <br />"
    }

    if(!email.value){
        erreur += "Veuillez entrer un email! <br />"
    }

    if(!mdp1.value){
        erreur += "Veuillez entrer un mot de passe! <br />"
    }

    if(!mdp2.value){
        erreur += "Veuillez confirmer votre mot de passe! <br />"
    }


    var prenom = document.getElementById("prenom").value;
    var nom = document.getElementById("nom").value;
    var email = document.getElementById("email").value;
    var mdp1 = document.getElementById("mdp1").value;
    var mdp2 = document.getElementById("mdp2").value;


    if(mdp2 != mdp1){
        erreur = "Les deux mots de passes ne correspondent pas!"
    }
    if(erreur){
        document.getElementById("erreur").innerHTML = erreur;
        e.preventDefault();
        return false;
    }
    else{
        alert("Demande confirmée");

    }
}

