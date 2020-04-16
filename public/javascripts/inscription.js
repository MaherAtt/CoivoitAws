$(".menu_connexion").click(function(){
    $("#Modalconnexion").modal("show");
    
});
$(".menu_inscription").click(function(){
    $("#Modalinscription").modal("show");
});
/*Champs concernant le passage de connexion à inscription*/
$("#Modalconnexion #menu_inscription a").click(function() {
    $("#Modalconnexion").modal("hide");
    $("#Modalinscription").modal("show");
});
/* Fin Champs concernant le passage de connexion à inscription*/

/*Champs concernant le passage d'inscription à connexion*/
$("#Modalinscription #menu_connexion a").click(function() {
    $("#Modalinscription").modal("hide");
    $("#Modalconnexion").modal("show");
});
/* Fin Champs concernant le passage  d'inscription à connexion*/

