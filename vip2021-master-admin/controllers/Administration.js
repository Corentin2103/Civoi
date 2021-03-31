let model = require("../models/vip.js");
let async = require("async");
let Cryptr = require('cryptr');
let path = require('path');
// ////////////////////// L I S T E R     A L B U M S

module.exports.Connexion = 	function(request, response){
  if (request.session.pseudo !== undefined){
    response.render('accueil',response);
  }else{
      response.render('connexion',response);
  }

};
module.exports.Accueil = 	function(request, response){
  if (request.session.pseudo !== undefined){
    response.render('accueil',response);
  }else{
      response.render('connexion',response);
  }

};
module.exports.Ajout = 	function(request, response){
  async.parallel ([
    function (callback){
      model.recupNationalite(function (err, result){callback(null,result);});
      },

  ],
  function (err,result){
    if (err){
      console.log(err);
      response.render('notFound',response);
      return;
    }

    response.ListeNationalite = result[0];


    response.render('ajouterVip',response);
  }
);
};
// PAGE MODIFIER
        module.exports.ModifPage = 	function(request, response){
          async.parallel ([
            function (callback){
              model.recupPers(function (err, result){callback(null,result);});
              },

          ],
          function (err,result){
            if (err){
              console.log(err);
              response.render('notFound',response);
              return;
            }

            response.ListePers = result[0];
            console.log(result[0]);

              response.render('modifierVip',response);
          }
        );
        };
        module.exports.Modif = 	function(request, response){
            let num = request.params.numVip;
          async.parallel ([
            function (callback){
              model.recupeVipModif(num,function (err, result){callback(null,result);});
              },
              function (callback){
                model.recupNationalite(function (err, result){callback(null,result);});
                },

          ],
          function (err,result){
            if (err){
              console.log(err);
              response.render('notFound',response);
              return;
            }

            response.PersModif = result[0];
            response.ListeNationalite = result[1];

              response.render('VipAModifier',response);
          }
        );
        };
        module.exports.ModifPers = 	function(request, response){
          let numVip = request.params.numVip;
          let nationalite = request.body.nationalite;
          let nom = request.body.nom;
          let prenom = request.body.prenom;
          let sexe = request.body.sexe;
          let naissance = new Date(request.body.naissance);
          let text = request.body.text;
          async.parallel ([
            function (callback){
              model.ModifVip(numVip,nationalite,nom,prenom,sexe,naissance,text,function (err, result){callback(null,result);});
              },
          ],
          function (err,result){
            if (err){
              console.log(err);
              response.render('notFound',response);
              return;
            }
              response.render('accueil',response);
          }
        );
        };


// PAGE SUPPRIMER
        module.exports.SupprPage = 	function(request, response){
          async.parallel ([
            function (callback){
              model.recupPers(function (err, result){callback(null,result);});
              },

          ],
          function (err,result){
            if (err){
              console.log(err);
              response.render('notFound',response);
              return;
            }

            response.ListePers = result[0];


              response.render('supprimerVIp',response);
          }
        );
        };

        module.exports.Suppr = 	function(request, response){
            let num = request.params.numVip;
          async.parallel ([
            function (callback){
              model.SupprVIp(num,function (err, result){callback(null,result);});
              },


          ],
          function (err,result){
            console.log(result);
            if (err){
              console.log(err);
              response.render('notFound',response);
              return;
            }
              response.render('accueil',response);
          }
        );
        };


module.exports.AccueilPhoto = 	function(request, response){
    response.render('accueilPhoto',response);
};
module.exports.AjoutPhoto = 	function(request, response){
  async.parallel ([
    function (callback){
      model.recupPers(function (err, result){callback(null,result);});
      },

  ],
  function (err,result){
    if (err){
      console.log(err);
      response.render('notFound',response);
      return;
    }

    response.ListeVip = result[0];


      response.render('ajouterPhoto',response);
  }
);
};
module.exports.AjoutPhotoBD = async	function(request, response){
  let num = request.body.nom;
  let image = request.files.photo;
  let commentaire = request.body.commentaire;
  let titre = request.body.titre;
  await image.mv(path.join(__dirname, `../public/images/vip/`+num+`.jpg`));

  async.parallel ([
    function (callback){
      model.ajouterPhoto(num,commentaire,titre,function (err, result){callback(null,result);});
      },

  ],
  function (err,result){
    if (err){
      console.log(err);
      response.render('notFound',response);
      return;
    }
      response.render('accueilPhoto',response);
  }
);
};
module.exports.SupprPhoto = 	function(request, response){

  async.parallel ([
    function (callback){
      model.recupPhoto(function (err, result){callback(null,result);});
      },

  ],
  function (err,result){
    if (err){
      console.log(err);
      response.render('notFound',response);
      return;
    }

    response.ListePhoto = result[0];


      response.render('supprimerPhoto',response);
  }
);
};
module.exports.SupprPhotoAvecParams = 	function(request, response){
  let num = request.params.numVip;
  let photoNum = request.params.photoNum;
  async.parallel ([
    function (callback){
      model.SupprPhoto(num,photoNum,function (err, result){callback(null,result);});
      },

  ],
  function (err,result){
    if (err){
      console.log(err);
      response.render('notFound',response);
      return;
    }
      response.render('accueilPhoto',response);
  }
);
};
module.exports.Deconnexion = 	function(request, response){
  delete request.session.pseudo;
    response.render('connexion',response);
};
module.exports.Admin =	function(request, response){
  let login = request.body.login;
  let password = request.body.password;
  model.estConnecte(login,function(err, result){  // appel le module test qui exécute la requete SQL
    if (err) {
      console.log(err);
      return;
    }

    let cryptr = new Cryptr('MaSuperCléDeChiffrementDeouF');
    request.Id = result[0];
    if(result.length == 0){
      response.error = "Test";
    return  response.render('connexion',response);
    }
    let test = cryptr.decrypt(result[0].passwd);
    if(test == password){
      request.session.pseudo = login;
      response.render('accueil',response);
    }else{
    response.render('connexion',response);
  }
  } );
};
module.exports.AjouterVip = async function(request, response){
  let nationalite = request.body.nationalite;
  let nom = request.body.nom;
  let prenom = request.body.prenom;
  let sexe = request.body.sexe;
  let text = request.body.text;
  let naissance = new Date(request.body.naissance);

  let image = request.files.image;
  let sujet = request.body.sujet;

  await image.mv(path.join(__dirname, `../public/images/vip/`+nom+`.jpg`));

  model.ajouterPers(nationalite,nom,prenom,sexe,naissance,text,function(err, result){  // appel le module test qui exécute la requete SQL
    if (err) {
      console.log(err);
      return;
    }

    model.ajouterPhotoProfil(nom,result.insertId,sujet,text,function(err, result){  // appel le module test qui exécute la requete SQL
      if (err) {
        console.log(err);
        return;
      }
      response.render('accueil',response);
  });

});
};
