let db = require('../configDb');


module.exports.test = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT COUNT(*) AS NB FROM vip ;";
              // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
module.exports.repertoire = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT distinct left (vip_nom,1) AS vip_nom FROM vip order by 1;";
              // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
module.exports.lettreVip = function(lettreVip,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =
            "SELECT photo_adresse,vip_prenom,vip_nom,vip.vip_numero FROM `vip`,`photo` WHERE vip.vip_numero=photo.vip_numero AND photo_numero=1 AND vip_nom like '"+lettreVip+"%' order by 1";

            connexion.query(sql, callback);
            connexion.release();
        }
    });
};


module.exports.infoVip = function(numVip,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT photo_adresse,vip_texte,nationalite_nom,vip_naissance,vip_prenom,vip_nom FROM `photo`,`vip`,`nationalite` WHERE vip.vip_numero = photo.vip_numero AND nationalite.nationalite_numero=vip.nationalite_numero AND photo_numero = '1' AND vip.vip_numero = "+numVip+"";

            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
module.exports.estActeur = function(numVip,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "Select vip_numero from `acteur` where vip_numero = "+numVip+"";

            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
module.exports.getInfoActeur = function(numVip,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "Select vip.vip_numero,film.film_titre,vip.vip_prenom,vip.vip_nom,film_daterealisation,photo.photo_adresse,vip.vip_texte from `film`,`joue`,`vip`,`photo` where vip.vip_numero = photo.vip_numero AND vip.vip_numero = film.vip_numero AND joue.film_numero = film.film_numero and photo_numero = 1 and joue.vip_numero = "+numVip+"";

            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
module.exports.estMannequin = function(numVip,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "Select distinct vip.vip_numero, defile_lieu,vip.vip_prenom,vip.vip_nom,defile_date,photo.photo_adresse,vip.vip_texte from `defile`,`defiledans`,`vip`,`mannequin`,`photo` where vip.vip_numero = photo.vip_numero AND vip.vip_numero = defile.vip_numero AND defiledans.defile_numero = defile.defile_numero AND  photo_numero = 1 and defiledans.vip_numero = "+numVip+"";

            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
module.exports.getSexe = function(numVip,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "Select vip_sexe from `vip` where vip_numero = "+numVip+"";

            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
module.exports.getMariage = function(numVip,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =
            "Select vip.vip_numero,vip.vip_prenom,vip.vip_nom,mariage.date_evenement,mariage_fin,mariage_lieu,photo.photo_adresse,vip.vip_texte from `mariage`,`vip`,`photo` where vip.vip_numero = photo.vip_numero AND vip.vip_numero = mariage.vip_vip_numero AND photo_numero = 1 and mariage.VIP_NUMERO = "+numVip+"";

            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
module.exports.getLiaison = function(numVip,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =
            "Select vip.vip_texte,photo.photo_adresse,vip.vip_numero,vip.vip_prenom,vip.vip_nom,liaison_motiffin,date_evenement from `photo`,`liaison`,`vip` where vip.vip_numero = liaison.vip_vip_numero AND liaison.vip_vip_numero = photo.vip_numero AND PHOTO_NUMERO = 1 AND liaison.VIP_NUMERO = "+numVip+"";

            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
module.exports.getPhoto = function(numVip,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =
            "Select photo_adresse,photo_sujet,photo_commentaire,photo_numero from `photo` where VIP_NUMERO = "+numVip+" AND photo_numero != '1'";

            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
module.exports.listeVip = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =
            "Select vip_numero,vip_nom,vip_prenom from `vip` order by vip_nom";

            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
module.exports.getArticle = function(numVip,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =
            "Select article_resume,vip_nom,vip_prenom,article_date_insert,vip.vip_numero from `apoursujet`,`article`,`vip` where apoursujet.vip_numero = vip.vip_numero AND apoursujet.article_numero = article.article_numero AND vip.vip_numero = "+numVip+"";

            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
module.exports.listerPhoto = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =
            "Select photo_adresse,vip.vip.vip_numero from `photo`,`vip` where vip.vip_numero = photo.vip_numero and photo_numero = 1 order by photo_adresse";

            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
module.exports.getAlbumPhoto = function(numVip,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =
            "Select photo_commentaire,photo_adresse,vip_prenom,vip_nom from `photo`,`vip` where photo.vip_numero = vip.vip_numero and photo.vip_numero = "+numVip+"";

            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
module.exports.estConnecte = function(login,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =
            "Select login,passwd from `parametres` where login ='"+login+"'";

            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
/*
let sql =
"INSERT INTO `vip`(`NATIONALITE_NUMERO`, `VIP_NOM`, `VIP_PRENOM`, `VIP_SEXE`, `VIP_NAISSANCE`, `VIP_TEXTE`, `VIP_DATE_INSERTION`) VALUES ("+nationalite+",'"+nom+"','"+prenom+"','"+sexe+"',?,'"+texte+"',now())";
console.log(sql);
connexion.query(sql, function(err, result){
let sql2 =
"Select nationalite_numero, nationalite_nom from `nationalite` order by nationalite_nom";
  connexion.query(sql2, function(err, reuslt){

});
  connexion.release();
},callback);
*/
module.exports.ajouterPers = function(nationalite,nom,prenom,sexe,naissance,texte,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =
            "INSERT INTO `vip`(`NATIONALITE_NUMERO`, `VIP_NOM`, `VIP_PRENOM`, `VIP_SEXE`, `VIP_NAISSANCE`, `VIP_TEXTE`, `VIP_DATE_INSERTION`) VALUES ("+nationalite+",'"+nom+"','"+prenom+"','"+sexe+"',?,'"+texte+"',now())";


            connexion.query(sql,[naissance],callback);
            connexion.release();
        }
    });
};
module.exports.recupNationalite = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =
            "Select nationalite_numero, nationalite_nom from `nationalite` order by nationalite_nom";

            connexion.query(sql,callback);
            connexion.release();
        }
    });
};
module.exports.recupPers = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =
            "Select vip_numero,vip_nom,vip_prenom from `vip` order by vip_nom";

            connexion.query(sql,callback);
            connexion.release();
        }
    });
};
module.exports.recupeVipModif = function(num,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =
            "Select vip_numero,vip_nom,vip_prenom,vip.nationalite_numero,nationalite_nom,vip_sexe,vip_texte,vip_naissance from `nationalite`,`vip` where vip.nationalite_numero = nationalite.nationalite_numero and vip.vip_numero = "+num+"";

            connexion.query(sql,callback);
            connexion.release();
        }
    });
};
module.exports.ModifVip = function(numVip,nationalite,nom,prenom,sexe,naissance,texte,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =
            "UPDATE `vip` SET `NATIONALITE_NUMERO`="+nationalite+",`VIP_NOM`='"+nom+"',`VIP_PRENOM`='"+prenom+"',`VIP_SEXE`='"+sexe+"',`VIP_NAISSANCE`= ?,`VIP_TEXTE`=\""+texte+"\" where vip_numero = "+numVip+"";



            connexion.query(sql,[naissance],callback);
            connexion.release();
        }
    });
};
module.exports.SupprVIp = function(numVip,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =
            "\
            DELETE FROM `apoursujet` WHERE vip_numero = "+numVip+";\
            DELETE FROM `defiledans` WHERE vip_numero = "+numVip+";\
            DELETE FROM `apouragence` WHERE vip_numero = "+numVip+";\
            DELETE FROM `composer` WHERE vip_numero = "+numVip+";\
            DELETE FROM `liaison` WHERE vip_numero = "+numVip+" or vip_vip_numero = "+numVip+";\
            DELETE FROM `mariage` WHERE vip_numero = "+numVip+" or vip_vip_numero = "+numVip+";\
            DELETE FROM `joue` WHERE vip_numero = "+numVip+";\
            DELETE FROM `photo` WHERE vip_numero = "+numVip;
            connexion.query(sql, function(err,result){

              let sql2 =
              "\
              DELETE FROM `defile` WHERE vip_numero = "+numVip+";\
              DELETE FROM `mannequin` WHERE vip_numero = "+numVip+";\
              DELETE FROM `chanteur` WHERE vip_numero = "+numVip+";\
              DELETE FROM `acteur` WHERE vip_numero = "+numVip+";\
              DELETE FROM `article` WHERE article_numero not in (select article_numero from `apoursujet`);\
              DELETE FROM `album` WHERE album_numero not in (Select album_numero from `composer`);\
              DELETE FROM `film` WHERE vip_numero = "+numVip;
              connexion.query(sql2, function(err,result){

                let sql3 =
                "\
                DELETE FROM `couturier` WHERE vip_numero = "+numVip+";\
                DELETE FROM `realisateur` WHERE vip_numero = "+numVip;
                connexion.query(sql3, function(err,result){

                  let sql4 =
                  "\
                  DELETE FROM `vip` WHERE vip_numero = "+numVip;
                    connexion.query(sql4,callback);
                    connexion.release();
                });
              });
            });

        }
    });
};
module.exports.ajouterPhotoProfil = function(nom,numVip,sujet,commentaire,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =
            "INSERT INTO `photo`(`PHOTO_NUMERO`, `VIP_NUMERO`, `PHOTO_SUJET`, `PHOTO_COMMENTAIRE`, `PHOTO_ADRESSE`) VALUES (1,"+numVip+",\""+sujet+"\",\""+commentaire+"\",\""+nom+".jpg\")";


            connexion.query(sql,callback);
            connexion.release();
        }
    });
};
module.exports.recupPhoto = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =
            "Select photo_adresse,vip_numero,photo_numero from `photo`";


            connexion.query(sql,callback);
            connexion.release();
        }
    });
};
module.exports.SupprPhoto = function(num,photoNum,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =
            "DELETE FROM `photo` where vip_numero ="+num+" and photo_numero = "+photoNum;
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};
module.exports.ajouterPhoto = function(num,commentaire,titre,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =
            "SELECT MAX(photo_numero) as photo_numero from `photo` where vip_numero = "+num;
            connexion.query(sql,function(err,result){

              let numero = result[0].photo_numero +1;
              let sql2 =
              "INSERT INTO `photo`(`PHOTO_NUMERO`, `VIP_NUMERO`, `PHOTO_SUJET`, `PHOTO_COMMENTAIRE`, `PHOTO_ADRESSE`) VALUES ("+numero+","+num+",\""+titre+"\",\""+commentaire+"\",\""+num+".jpg\") ";
              console.log(sql2);
              connexion.query(sql2,callback);
              connexion.release();
            });

        }
    });
};
