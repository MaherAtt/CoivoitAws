
$(document).ready(function(){
    //var pos_contenu_conversation = 0;;
    
    $('#amis').click(function(){
                    if($(window).width() < 451) {
                        $(".list-group").hide();
                        $("#nav-tabContent").show()
                        
                    }
                })
                $("#btnBack").click(function(){
                    if($(window).width() < 451) {
                        $('#nav-tabContent').removeClass('fadeInRight')
                        $('#nav-tabContent').addClass('fadeOutRight').delay(2000).hide()

    //                    $("#nav-tabContent").hide();
                        $(".list-group").show();
                        $('#nav-tabContent').addClass('fadeInRight')
                        $('#nav-tabContent').removeClass('fadeOutRight')
                    }
                })
                $(window).on('resize', function() {
                    if($(window).width() > 450) {
                        $(".list-group").show();
                        $("#nav-tabContent").show()
                        $('#nav-tabContent').removeClass('fadeInRight')
                        $('#nav-tabContent').removeClass('fadeOutRight')
                        $('#nav-tabContent').addClass('fadeInRight')
                    }
                    else {
                         $(".list-group").show();
                        $("#nav-tabContent").hide();
                    }
                })

    let socket = io();

    /* Lorsque je clique sur une conversation donnée avec une personne j'affiche cette conversation à partir d'un fichier */
    $(".conversation").click(function() {
        var href = this.href;
        var res = href.substring(href.indexOf('#')+1, href.length );

        $(".afficheConversation").attr("id", res)



        $('.alert').show();
        $("#messages").empty();
        socket.emit('afficher conversation', res);

    });

    /* Lorsque j'envoie un message -- données enregistrées dans data */
    $('#send').on('click', function(e){
        e.preventDefault();

        let data = {
            Emmeteur:$('#MyUsername').text(),
            Destinataire: $('.active.conversation').text(),
            Message : $('#Message').val()
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
        var user= $('#MyUsername').text();
        console.log("Sent By:"+data.Emmeteur+" "+data.Destinataire+" "+user);
        if(data.Emmeteur==user){
            $('#messages').append('<li class="id_moi d-flex justify-content-end"><p class=" badge badge-info"> ' + XSSPatcher(data.Message) + '</p></li>');

        }else {
            if(data.Destinataire==user) {
                $('#messages').append('<li  class=" d-flex justify-content-start"><p class=" badge badge-light">     ' + XSSPatcher(data.Message) + '</p></li>');
            }
        }

    });


    /*Je récupère les conversations situés dans un fichier*/
    socket.on('last message', function(content){
        var user= $('#MyUsername').text();

        for(i=0;i<content.length;i++) {

            if(content[i].IdEmmeteur==user){
                $('#messages').append('<li class="id_moi d-flex justify-content-end"><div class=" text-right col-6"><p class=" badge badge-info ">' + content[i].Message + '</p></div></li>');
            }
            else {
                if(content[i].IdRecepteur==user){
                    $('#messages').append('<li  class="'+content[i].Message+' d-flex justify-content-start"><div class="text-left col-6"><p class=" badge badge-light">' + content[i].Message + '</p></div></li>');
                }
            }
        }
    });
});
