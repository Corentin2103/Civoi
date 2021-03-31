let HomeController = require('./../controllers/HomeController');
let VipController = require('./../controllers/VipController');
let AlbumController = require('./../controllers/AlbumController');
let TestController = require('./../controllers/TestController');
let ArticleController = require('./../controllers/ArticleController');


// Routes
module.exports = function(app){

  // tests à supprimer
    app.get('/test', TestController.Test);

// Main Routes
    app.get('/', HomeController.Index);
    app.get('/accueil', HomeController.Index);

// VIP
    app.get('/repertoire', VipController.Repertoire);
    app.get('/repertoire/:lettreVip', VipController.repertoireStar);
    app.get('/vip/:numVip', VipController.Vip);
 // albums
   app.get('/album', AlbumController.ListerAlbum);
   app.get('/album/:numVip', AlbumController.ListerAlbum);
// article
  app.get('/articles', ArticleController.Article);
    app.get('/articles/:numVip', ArticleController.Article);
// tout le reste
    app.get('*', HomeController.NotFound);
    app.post('*', HomeController.NotFound);

};
