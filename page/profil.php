<div id="corps text-center">
    <!-- le profil de l'utilisateur -->
    <div id="profil" class="col-md-12 row">
        <h1 class="col-sm-12 col-md-12 text-center titre_page">Informations personnelles</h1>
        <div class="col-md-12 row" >
            <!-- Info perso -->
            <div  class="col-md-6 col-sm-6 card" id="info_perso">
                    <div class= "row">
                        <div id="photo_profil" class=" col-md-4 col-sm-12">
                            <img src="img/img-profil.jpg" alt="photo de profil" title="photo de profil" class="rounded-circle"/>
                            <input type="file" class="form-control-file" id="exampleFormControlFile1">
</div>
                        <div id="infos" class=" col-md-8 col-sm-12">
                            <div class="list-group">
                                <form>
                                    <div class="form-group row">
                                        <label for="prenom" class="col-sm-3 col-form-label">Prénom</label>
                                        <div class="col-sm-9">
                                            <input type="text"  class="form-control " id="prenom" value="Shadé">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="nom" class="col-sm-3 col-form-label">Nom</label>
                                        <div class="col-sm-9">
                                            <input type="text"  class="form-control " id="nom" value="ALAO">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="email" class="col-sm-3 col-form-label">Email </label>
                                        <div class="col-sm-9 input-group mb-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text"><i class="fa fa-envelope" aria-hidden="true"></i></div>
                                            </div>
                                            <input type="email"  class="form-control " id="email" value="shade.alao-afolabi@ens.uvsq.fr">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="adresse" class="col-sm-3 col-form-label">Adresse</label>
                                        <div class="col-sm-9 input-group mb-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text"><i class="fa fa-map-marker fa-lg" aria-hidden="true"></i></div>
                                            </div>
                                            <input type="text"  class="form-control " id="adresse" value="45 avenue des états-unis 78000 Versailles">
                                        </div>
                                    </div>
                                    <div class="col-md-12 row">
                                        <p class="col-sm-4">Permis ?</p>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input type="radio" id="customRadioInline1" name="permis" class="custom-control-input">
                                            <label class="custom-control-label" for="customRadioInline1">Oui</label>
                                        </div>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input type="radio" id="customRadioInline2" name="permis" class="custom-control-input">
                                            <label class="custom-control-label" for="customRadioInline2">Non</label>
                                        </div>
                                    </div>
                                    <div class="col-md-12 row">
                                        <p class="col-sm-4">Véhiculé(e) ?</p>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input type="radio" id="voiture1" name="voiture" class="custom-control-input">
                                            <label class="custom-control-label" for="voiture1">Oui</label>
                                        </div>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input type="radio" id="voiture2" name="voiture" class="custom-control-input">
                                            <label class="custom-control-label" for="voiture2">Non</label>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>  
            </div>
            <!-- Fin Info perso -->

            <!-- Avis -->
            <div class="col-md-4 col-sm-4 card" id="avis" >
                <div class=" col-md-12 col-sm-12 ">
                        <h1 class="col-sm-12 text-center"> Avis </h1>
                        <div class="col-sm-12 row" id="Ponctualité">
                            <p class="col-sm-5">Ponctualité </p>
                            <div class="col-sm-7 ">
                                <div class="progress ">
                                    <div class="progress-bar progress-bar-striped" role="progressbar" style="width: 10%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100" ></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 row" id="confiance">
                            <p class="col-sm-5">Confiance </p>
                            <div class="col-sm-7 ">
                                <div class="progress ">
                                    <div class="progress-bar progress-bar-striped" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 row" id="nb_trajet">
                            <p class="col-sm-12">Nombre de trajets : 50</p>

                        </div>
                        <div class="col-sm-12 row">
                            <canvas id="lineChart"></canvas>   
                        </div>
                        <div class="col-sm-12 row">
                            <a href="#" class="stretched-link text-right col-sm-12" id="voir_com">Voir les (4) commentaires  </a>  
                        </div>
                    
                </div> 
            </div>
            <!-- Fin Avis -->
        </div>
        

        <!-- Modal commentaires -->
        <div class="row">
            <div class="modal fade" id="Modalavis" tabindex="-1" role="dialog" aria-labelledby="Modalavis"  aria-hidden="true" >
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content">
                    
                    <div class="modal-body" >
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <div class="">


                            <!--Section: Content-->
                            <section class="text-center text-lg-left dark-grey-text">

                                <div class="text-center font-weight-bold"><span>4</span> comments</div>

                                <div class="media d-block d-md-flex mt-4">
                                    <img class="card-img-64 rounded z-depth-1 d-flex mx-auto mb-3"
                                         src="https://mdbootstrap.com/img/Photos/Avatars/img (20).jpg" alt="Generic placeholder image">
                                    <div class="media-body text-center text-md-left ml-md-3 ml-0">
                                        <p class="font-weight-bold my-0">
                                            Miley Steward
                                            <a href="" class="pull-right ml-1">
                                                <i class="fa fa-reply"></i>
                                            </a>
                                        </p>
                                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                        Excepteur sint occaecat
                                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                        <div class="media d-block d-md-flex mt-4">
                                            <img class="card-img-64 rounded z-depth-1 d-flex mx-auto mb-3"
                                                 src="https://mdbootstrap.com/img/Photos/Avatars/img (27).jpg" alt="Generic placeholder image">
                                            <div class="media-body text-center text-md-left ml-md-3 ml-0">
                                                <p class="font-weight-bold my-0">
                                                    Tommy Smith
                                                    <a href="" class="pull-right ml-1">
                                                        <i class="fa fa-reply"></i>
                                                    </a>
                                                </p>
                                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                                                totam rem aperiam, eaque
                                                ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                                            </div>
                                        </div>

                                        <!-- Quick Reply -->
                                        <div class="form-group mt-4">
                                            <label for="quickReplyFormComment">Your comment</label>
                                            <textarea class="form-control" id="quickReplyFormComment" rows="5"></textarea>

                                            <div class="text-center my-4">
                                                <button class="btn btn-info btn-sm" type="submit">Post</button>
                                            </div>
                                        </div>

                                        <div class="media d-block d-md-flex mt-3">
                                            <img class="card-img-64 rounded z-depth-1 d-flex mx-auto mb-3"
                                                 src="https://mdbootstrap.com/img/Photos/Avatars/img (21).jpg" alt="Generic placeholder image">
                                            <div class="media-body text-center text-md-left ml-md-3 ml-0">
                                                <p class="font-weight-bold my-0">
                                                    Sylvester the Cat
                                                    <a href="" class="pull-right ml-1">
                                                        <i class="fa fa-reply"></i>
                                                    </a>
                                                </p>
                                                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
                                                quia non numquam eius modi
                                                tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="media d-block d-md-flex mt-3">
                                    <img class="card-img-64 rounded z-depth-1 d-flex mx-auto mb-3"
                                         src="https://mdbootstrap.com/img/Photos/Avatars/img (30).jpg" alt="Generic placeholder image">
                                    <div class="media-body text-center text-md-left ml-md-3 ml-0">
                                        <p class="font-weight-bold my-0">
                                            Caroline Horwitz
                                            <a href="" class="pull-right ml-1">
                                                <i class="fa fa-reply"></i>
                                            </a>
                                        </p>
                                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                                        deleniti
                                        atque corrupti
                                        quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
                                        culpa
                                        officia deserunt mollitia animi, id est laborum et dolorum fuga.
                                    </div>
                                </div>

                            </section>
                            <!--Section: Content-->


                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <!-- Fin Modal commentaires -->
    </div>

</div>  

<!-- Script graphique --> 
<script>
    $("#voir_com").click(function(){
        $("#Modalavis").modal("show");
    });
    
    var ctxL = document.getElementById("lineChart").getContext('2d');
    var myLineChart = new Chart(ctxL, {
        type: 'line',
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
                label: "Nombre de trajet par mois en 2020",
                data: [0, 5, 2, 10, 3, 7, 10],
                backgroundColor: [
                    'rgba(105, 0, 132, .2)',
                ],
                borderColor: [
                    'rgba(200, 99, 132, .7)',
                ],
                borderWidth: 2
            },
                       /*{
label: "My Second dataset",
data: [28, 48, 40, 19, 86, 27, 90],
backgroundColor: [
'rgba(0, 137, 132, .2)',
],
borderColor: [
'rgba(0, 10, 130, .7)',
],
borderWidth: 2
}*/
                      ]
        },
        options: {
            responsive: true
        }
    });
</script>
<!-- Fin Script graphique --> 