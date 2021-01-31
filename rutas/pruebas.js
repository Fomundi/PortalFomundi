const express = require("express");
const router = express.Router();
const passport = require("passport");
const auth = require("../auth.js");

router.get("/", auth, async function (req, res) {
  
    let servidor = await req.client.guilds.cache.get("642673100235735050");
    let canales = await  servidor.channels.cache;
    let roles = await servidor.roles.cache.map(r => r.name)
    let usuario = req.client.users.cache.get(req.user.id);
    let member = servidor.members.cache.get(req.user.id);
    let miembro = member.roles.cache.map(u => u.name);
   
   
   console.log(member.roles.cache.map(u => u.name));
    
      /*console.log(roles)
        res.json({
          user: req.user,
          servidor,
          canales,
          roles
        })*/
  
  
    res.render("pruebas/index.ejs", {
      login: req.isAuthenticated() ? "si": "no",
      status: req.isAuthenticated() ? "PERFIL": "LOGIN",
      loginp: (req.isAuthenticated() ? true: false),
      user: req.user,
      rol: roles,
      miembros: miembro
    })
  
})



.get("/login", passport.authenticate("discord", {
  failureRedirect: "/"
}),
  function(req, res) {
    res.redirect("/pruebas");
  }
)

.get("/salir", async function(req, res) {
  await req.logout();
  await res.redirect("/");
});

module.exports = router;