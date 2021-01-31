const express = require("express");
const router = express.Router();
const passport = require("passport");
const auth = require("../auth.js");

router.get("/", async function(req, res) {
  
  let client = req.client
  //const user = await client.users.fetch("");
  //console.log(user.avatar)
  
  
  
  //console.log(userbot.avatar)

  const DatoUsers = new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM bots`, (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      resolve(results)
    });
  });

  let UserData = await DatoUsers.then(data => {
     return data;
  })
  
  /*let usuario = []
  for(var i = 0; i < UserData.length; i++) {
    let bot = client.users.fetch(UserData[i].id_bot).then(a => {
     a
    })
    usuario.push(bot)
  }*/
  

let usuario = [];
for(var i = 0; i < UserData.length; i++) {
  let user = await client.users.fetch(UserData[i].id_bot);
  usuario.push(user.avatar); 
}
  
  
  /*let user = await client.users.fetch(UserData[i].id_bot);
  usuarios.push(user.displayAvatarURL());*/

  
  console.log(usuario)


    res.render("bots/index.ejs",
      {
        login: req.isAuthenticated() ? "si": "no",
        status: req.isAuthenticated() ? "PERFIL": "LOGIN",
        loginp: (req.isAuthenticated() ? true: false),
        user: req.user,
        bots: UserData,
        bot: req.client,
        usuario
      });
  })

.get("/:id/add", auth, async function(req, res) {
  
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

  let UserData = DatoUsers.then(data => {
    return data
  })
  
  //for (var i = 0; i < UserData.length; i++) {
  //const userbot = await client.users.fetch//(UserData[i].id);
  //}
  
  //console.log(userbot.avatar)
  
  const DatoCategory = new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM category`, (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      resolve(results)
    });
  });

  let CatData = await DatoCategory.then(data => {
     return data;
  })
  
  const DatoLibrary = new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM library`, (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      resolve(results)
    });
  });

  let LibData = await DatoLibrary.then(data => {
     return data;
  })

    res.render("bots/add.ejs",
      {
        login: req.isAuthenticated() ? "si": "no",
        status: req.isAuthenticated() ? "PERFIL": "LOGIN",
        loginp: (req.isAuthenticated() ? true: false),
        userDB: UserData,
        user: req.user,
        category: CatData,
        library: LibData
      });
  
})

.post("/:id/insert", auth, async function(req, res) {
  
  let iduser = req.params.id;
  let data = req.user;
  let idbot = req.body.idbot;
  let prefixb = req.body.prefixb;
  let namebot = req.body.namebot;
  let desbot = req.body.desbot;
  let categoryo = req.body.categoryo;
  let libreryo = req.body.libreryo;
  let webb = req.body.webb;
  let sbot = req.body.sbot;
  let invibot = req.body.invibot
  
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
  
  if (!idbot && !prefixb && !namebot && !desbot && !categoryo && !libreryo && !webb && !sbot && !invibot) {
    idbot = UserData.idbot;
    prefixb = UserData.prefixb;
    namebot = UserData.namebot;
    desbot = UserData.desbot;
    categoryo = UserData.categoryo;
    libreryo = UserData.libreryo;
    webb = UserData.webb;
    sbot = UserData.sbot;
    invibot = UserData.invibot;
  }
  
  conn.query('INSERT INTO bots (id_bot, id_user, prefix, title, description, category, library, web_bot, soporte, invite) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [idbot, data.id, prefixb, namebot, desbot, categoryo, libreryo, webb, sbot, invibot], (error,
    results,
    fields) => {
    if (error) throw error;
    res.redirect('/bots')
  });
  
  
})


.get(
  "/login",
  passport.authenticate("discord", {
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