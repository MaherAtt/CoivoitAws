
// cette fonction permet d'afficher le menu et
// de faire disparaitre le boutton qui permet d'afficher le menu

    function showMenu() {
        if($(window).width() > 600) {
            document.getElementById("mySidebar").style.width = "250px";
            document.getElementById("pageContent").style.marginLeft = "250px";
            document.getElementById("btnOpen").style.display="none";
        }else{
            document.getElementById("mySidebar").style.width = "80px";
            document.getElementById("pageContent").style.marginLeft = "80px";
            document.getElementById("btnOpen").style.display="none";
        }
    }

// cette fonction permet de fermer le menu et
// de reafficher le boutton ShowMenu
function hideMenu() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("pageContent").style.marginLeft= "0";
    document.getElementById("btnOpen").style.display="block";
}

function showModalCnx() {
    document.getElementById("Modalconnexion").modal("show");
}
