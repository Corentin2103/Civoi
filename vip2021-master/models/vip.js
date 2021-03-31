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
module.exports.estCouturier = function(numVip,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "Select vip_numero from `couturier` where vip_numero = "+numVip+"";

            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
module.exports.estRealisateur = function(numVip,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "Select vip_numero from `realisateur` where vip_numero = "+numVip+"";

            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
module.exports.estChanteur = function(numVip,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "Select vip_numero from `chanteur` where vip_numero = "+numVip+"";

            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
module.exports.getInfoChanteur = function(numVip,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "Select chanteur_specialite,album_titre,maisondisque_nom,album_date from `chanteur`,`composer`,`album`,`maisondisque` where chanteur.vip_numero = composer.vip_numero and composer.album_numero = album.album_numero and album.maisondisque_numero = maisondisque.maisondisque_numero and chanteur.vip_numero = "+numVip+"";

            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
module.exports.getInfoRealisateur = function(numVip,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "Select film_titre,film_daterealisation from `film` where vip_numero = "+numVip+"";

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
  if(numVip != undefined){
    db.getConnection(function(err, connexion) {

        if (!err) {
            let sql =
            "Select photo_commentaire,photo_adresse,vip_prenom,vip_nom from `photo`,`vip` where photo.vip_numero = vip.vip_numero and photo.vip_numero = "+numVip+"";

            connexion.query(sql, callback);
            connexion.release();
        }
    });
  }else{
    return callback(null,[]);
  }

};
