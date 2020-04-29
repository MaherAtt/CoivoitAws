
/*Script de la page demande, si je souhaite répondre à une demande la modale suivante s'ouvre*/
$('#attente').click(function(){
     $('#exampleModalCenter').modal('show');
});


/*Quand j'afiche la modale réponse modale celle cette fonction permet d'afficher les champs de la modale*/
function showModal(data,adrD,adrA,DateD,Nom,NomD,PrenD){
     $("#exampleModalCenter #exampleModalLongTitle").text('Trajet N'+data);
     $("#NomDemandeur").text(NomD+" "+PrenD);
     $("#Emet").val(Nom);
     $("#Traj").val(data);
     $("#exampleModalCenter #AdrDep").text(adrD);
     $("#exampleModalCenter #AdrDest").text(adrA);
     $("#exampleModalCenter #DateDep").text(DateD);
     $("#exampleModalCenter").modal('toggle');
}


/*En fonction du filtre appliqué à la recherche j'affiche ou je cache certains éléments */
function filterDemandes(state) {
     liste=document.getElementsByClassName("card liste");
     for (i = 0; i < liste.length; i++) {
          button = liste[i].getElementsByTagName("span")[0];
          etat = button.innerText;
          if(state == "ALL") {
               liste[i].style.display="inline";
          }
          else {
               if (etat == state) {
                    liste[i].style.display="inline";
               }
               else {
                    liste[i].style.display="none";
               }
          }
     }
}

