let model = require("../models/vip.js");
let async = require("async");
// ////////////////////// L I S T E R     A L B U M S

module.exports.ListerAlbum = 	function(request, response){
let num = request.params.numVip;
  async.parallel ([
    function (callback){
      model.listerPhoto(function (err, result){callback(null,result);});
      },
      function (callback){
      model.getAlbumPhoto(num,function (err, result){callback(null,result);});
    },

  ],
  function (err,result){
    if (err){
      console.log(err);
      response.render('notFound',response);
      return;
    }

    response.Photo = result[0];
    response.AlbumPhoto = result[1];

    response.render('listerAlbum',response);
  }
);
};
