const express = require("express");
const router = express.Router();
const passport = require("passport");
const auth = require("../auth.js");

router.get("/", auth, async function (req, res) {

  const data = req.user;

  /*let servidor = await req.client.guilds.cache.get("642673100235735050");
  let canales = await  servidor.channels.cache;
  let roles = await servidor.roles.cache.map(r => r.name)
  let usuario = req.client.users.cache.get(req.user.id);
  let member = servidor.members.cache.get(req.user.id);
  let miembro = member.roles.cache.map(u => u.name);*/
  
  conn.query(`SELECT * FROM usuariosdb WHERE id_user = '${data.id}'`, function (error, results, fields) {
    if (error) throw error;
    console.log(results.exp)
    // Datoa usuario (Solo discord)
    if (results.length === 0) {
      console.log("agregando usuario")
        conn.query('INSERT INTO usuariosdb (username, id_user, nivel, exp, discriminator, avatar, pais_ciudad, urlpersonalizada, bio, facebook, twitter, youtube, web, sdiscord) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [data.username, data.id, 0, 1, data.discriminator, data.avatar, null, data.id, null, null, null, null, null, null], function (error, results, fields) {
        if (error) throw error;
        // Neat!
      });
      console.log("Nuevo Usuario");
    } else {
      console.log("Usuario ya Registrado");
    }

    const DatoUsers = new Promise((resolve, reject) => {
      conn.query(`SELECT * FROM usuariosdb WHERE id_user = '${req.user.id}'`, (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
    

    DatoUsers.then(data => {
      let UserData = data[0]

      res.render("perfil/index.ejs",
        {
          login: req.isAuthenticated() ? "si": "no",
          status: req.isAuthenticated() ? "PERFIL": "LOGIN",
          loginp: (req.isAuthenticated() ? true: false),
          user: req.user,
          userDB: UserData
        });
    });
  })
})


.get("/:id/edit", auth, (req, res) => {

  let iduser = req.params.id;

  const DatoUsers = new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM usuariosdb WHERE id_user = '${iduser}'`, (error,
      results,
      fields) => {
      if (error) {
        return reject(error);
      }
      resolve(results)
    });
  });

  DatoUsers.then(data => {
    let UserData = data[0]

    res.render("perfil/edit.ejs",
      {
        login: req.isAuthenticated() ? "si": "no",
        status: req.isAuthenticated() ? "PERFIL": "LOGIN",
        loginp: (req.isAuthenticated() ? true: false),
        userDB: UserData,
        user: req.user
      });
  })
})


.post("/:id/update", auth, async(req, res) => {

  let iduser = req.params.id;
  let urlper = req.body.urlper;
  let paci = req.body.paci;
  let bio = req.body.bio;
  let facebook = req.body.facebook;
  let twitter = req.body.twitter;
  let youtube = req.body.youtube;
  let discord = req.body.discord;
  let web = req.body.web

  const DatoUsers = new Promise((resolve,
    reject) => {
    conn.query(`SELECT * FROM usuariosdb WHERE id_user = '${iduser}'`,
      (error,
        results,
        fields) => {
        if (error) {
          return reject(error);
        }
        resolve(results)
      });
  });

  let UserData = await DatoUsers;

  if (!urlper && !paci && !bio && !facebook && !twitter && !youtube && !discord && !web) {
    urlper = UserData.urlper;
    paci = UserData.paci;
    bio = UserData.bio;
    facebook = UserData.facebook;
    twitter = UserData.twitter;
    youtube = UserData.youtube;
    discord = UserData.discord;
    web = UserData.web;
  }

  conn.query(`UPDATE usuariosdb SET urlpersonalizada = '${urlper}', pais_ciudad = '${paci}', bio = '${bio}', facebook = '${facebook}', twitter = '${twitter}', youtube = '${youtube}', sdiscord = '${discord}', web = '${web}'  WHERE id_user = '${iduser}'`, (error,
    results,
    fields) => {
    if (error) throw error;
    res.redirect('/perfil')
  });

})



.get("/login", passport.authenticate("discord", {
  failureRedirect: "/"
}),
  function(req, res) {
    res.redirect("/perfil");
  }
)

.get("/salir", async function(req, res) {
  await req.logout();
  await res.redirect("/");
});

module.exports = router;