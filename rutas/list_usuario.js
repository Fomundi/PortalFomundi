const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", async function(req, res) {

  const DatoUsers = new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM usuariosdb`, (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      resolve(results)
    });
  });

  DatoUsers.then(data => {
    let UserData = data

    res.render("list_usuario/index.ejs",
      {
        login: req.isAuthenticated() ? "si": "no",
        status: req.isAuthenticated() ? "PERFIL": "LOGIN",
        loginp: (req.isAuthenticated() ? true: false),
        user: req.user,
        userDB: UserData
      });
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