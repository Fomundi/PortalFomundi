const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", async function(req, res) {

    let client = req.client;
    
    res.render("_guias/mysql.ejs", {
      login: req.isAuthenticated() ? "si" : "no",
      status: req.isAuthenticated() ? "PERFIL" : "LOGIN",
      loginp: (req.isAuthenticated() ? true : false),
      ApiDiscord: client,
      user: req.user,
      server: "https://discord.gg/nWcXpXF"
    });
  })

  .get(
    "/login",
    passport.authenticate("discord", { failureRedirect: "/" }),
    function(req, res) {
      res.redirect("/");
    }
  )

  .get("/salir", async function(req, res) {
    await req.logout();
    await res.redirect("/");
  });

module.exports = router;
