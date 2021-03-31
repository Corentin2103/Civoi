let model = require("../models/vip.js");
let async = require("async");

module.exports.Article = function (request, response){
  let num = request.params.numVip;
  let data = request.params.lettreVip;
  async.parallel ([
    function (callback){
      model.listeVip(function (err, result){callback(null,result)});
    },
    function (callback){
      model.getArticle(num,function (err, result){callback(null,result)});
    },
  ],
  function (err,result){
    if (err){
      console.log(err);
      return;
    }
    response.listeVip = result[0];
    response.Article = result[1];
    response.render('article',response);
  }
);
}
