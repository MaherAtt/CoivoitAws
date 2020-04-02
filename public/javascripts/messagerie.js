




$(document).ready(function(){
    //var pos_contenu_conversation = 0;;
    
    let socket = io();
    let fichier = ""; /* fichier dans lequel je sauvegarde ma conversation*/
    /* Lorsque je clique sur une conversation donnée avec une personne j'affiche cette conversation à partir d'un fichier */
    $(".conversation").click(function() {
        var href = this.href;
        var res = href.substring(href.indexOf('#')+1, href.length );

        $(".afficheConversation").attr("id", res)

        fichier = "./public/conversation/id_moi_"+res+".json";
        
        $('.alert').show();
        $("#messages").empty();
        socket.emit('afficher conversation', fichier);

    });

    /* Lorsque j'envoie un message -- données enregistrées dans data */
    $('#submit').on('click', function(e){
        e.preventDefault();

        let data = {
            username: $('#username').val(),
            message : $('#message').val(),
            date :  new Date().toJSON().slice(0,10),
            file : fichier
        };
        
         
        socket.emit('new message', data);

    });
    


    /* ATTENTION CREER UNE DIV OU JE METTERZI UNE ALERT ERROR EN CAS DE PB*/
    socket.on('error message', function(phrase){
        $('#response').append('<p>' + phrase + '</p>');
         $('#response').show()
    });

    /* pour que l'utilisateur n'insere pas du code html et modifie note page */
    function XSSPatcher(texte){
        return texte
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&&#039;")
    }

    /* j'affiche le message dans une balise <li> elle a des caractéristiques différentes en fonction de l'id */
    socket.on('new message', function(data){
        if(data.username == 'id_moi'){
            $('#messages').append('<li class="id_moi d-flex justify-content-end"><p class=" badge badge-info"> ' + XSSPatcher(data.message) + '</p></li>');

        }else {
            $('#messages').append('<li  class="'+data.username+' d-flex justify-content-start"><p class=" badge badge-light">     ' + XSSPatcher(data.message) + '</p></li>');

        }

    });


    /*Je récupère les conversations situés dans un fichier*/
    socket.on('last message', function(contenu_conversation){
        for(var exKey in contenu_conversation.table) {
            if(Object.values(contenu_conversation.table[exKey])[0] == 'id_moi'){
                $('#messages').append('<li class="id_moi d-flex justify-content-end"><div class=" text-right col-6"><p class=" badge badge-info ">' + Object.values(contenu_conversation.table[exKey])[1] + '</p></div></li>');
            }
            else {
                $('#messages').append('<li  class="'+Object.values(contenu_conversation.table[exKey])[0]+' d-flex justify-content-start"><div class="text-left col-6"><p class=" badge badge-light">' + Object.values(contenu_conversation.table[exKey])[1] + '</p></div></li>');
            }
        }
    });
});
