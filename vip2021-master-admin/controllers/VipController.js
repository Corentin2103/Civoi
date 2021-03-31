
let model = require("../models/vip.js");
let async = require("async");
// ///////////////////////// R E P E R T O I R E    D E S     S T A R S

module.exports.Repertoire = 	function(request, response){
  response.title = 'Répertoire des stars';
  model.repertoire(function(err, result){  // appel le module test qui exécute la requete SQL
    if (err) {
      console.log(err);
      return;
    }

    response.listeLettre = result;
    response.render('repertoireVips', response);
  } );
}

module.exports.LettreVip = 	function(request, response){
  let data = request.params.lettreVip;
  response.title = 'Répertoire des stars';
  model.lettreVip(data,function(err, result){  // appel le module test qui exécute la requete SQL
    if (err) {
      console.log(err);
      return;
    }
    response.IdVip = result;

    response.render('repertoireVips', response);
  } );
}

module.exports.Vip = function(request, response){
  let num = request.params.numVip;

  async.parallel ([
    function (callback){
      model.repertoire(function (err, result){callback(null,result)});
    },
    function(callback){
      model.infoVip(num,function (err, result){callback(null,result)});
    },
    function(callback){
      model.getInfoActeur(num,function (err, result){callback(null,result)});
    },

    function(callback){
      model.estMannequin(num,function (err, result){callback(null,result)});
    },
    function(callback){
      model.getSexe(num,function (err, result){callback(null,result)});
    },
    function(callback){
      model.getMariage(num,function (err, result){callback(null,result)});
    },
    function(callback){
      model.getLiaison(num,function (err, result){callback(null,result)});
    },
    function(callback){
      model.getPhoto(num,function (err, result){callback(null,result)});
    },
    function(callback){
      model.estActeur(num,function (err, result){callback(null,result)});
    },


  ],
  async function (err,result){
    if (err){
      console.log(err);
      return;
    }
    response.listeLettre = result[0];
    response.detailPersonne = result[1];
    response.Acteur = result[2];
    response.Mannequin = result[3];
    response.sexe = result[4][0];
    response.mariage = result[5];
    response.liaison = result[6];
    response.photo = result[7];
    response.EstActeur = result[8];
    response.render('detailVip',response);
  }
);
}

module.exports.repertoireStar = function (request, response){
  let data = request.params.lettreVip;
  async.parallel ([
    function (callback){
      model.repertoire(function (err, result){callback(null,result)});
    },
    function(callback){
      model.lettreVip(data,function(err, result){callback(null,result)});
    },
  ],
  function (err,result){
    if (err){
      console.log(err);
      return;
    }
    response.listeLettre = result[0];
    response.photoVip = result[1];

    response.render('repertoireVips',response);
  }
);
}
