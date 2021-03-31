
let Administration = require('./../controllers/Administration');


// Routes

module.exports = function(app){


  app.get('/', Administration.Connexion);
  app.get('/accueil', Administration.Accueil);
  app.post('/accueil', Administration.Admin);


  app.get('/administration/ajouterVip',verifConnexion , Administration.Ajout);
  app.post('/administration/ajouterVip/form',verifConnexion, Administration.AjouterVip);

  app.get('/administration/modifierVip',verifConnexion , Administration.ModifPage);
  app.get('/administration/modifierVip/:numVip',verifConnexion , Administration.Modif);
  app.post('/administration/modifierVip/form/:numVip',verifConnexion, Administration.ModifPers);


  app.get('/administration/supprimerVIp',verifConnexion , Administration.SupprPage);
  app.get('/administration/supprimerVIp/:numVip',verifConnexion , Administration.Suppr);


  app.get('/accueilPhoto',verifConnexion , Administration.AccueilPhoto);

  app.get('/photo/ajouterPhoto',verifConnexion , Administration.AjoutPhoto);
  app.post('/photo/ajouterPhoto/form',verifConnexion , Administration.AjoutPhotoBD);

  app.get('/photo/supprimerPhoto',verifConnexion , Administration.SupprPhoto);
  app.get('/photo/supprimerPhoto/:numVip/:photoNum',verifConnexion , Administration.SupprPhotoAvecParams);

  app.get('/deconnexion',verifConnexion , Administration.Deconnexion);


  function verifConnexion(request, response, next) {

    if(request.session.pseudo !== undefined) {
      next();
    }
    else {
      response.redirect("/");
    }
  }
};
