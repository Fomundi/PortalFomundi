const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
const { Strategy } = require("passport-discord");
const bodyparser = require("body-parser");
const path = require("path");
const fs = require("fs");


/* --== BASE DE DATOS CONEXION ==-- */
(async () => {
  conn = await require("./database.js");
})();
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

//Bot
const Discord = require("discord.js");
const client = new Discord.Client();
client.config = require('./config.js');



client.login(client.config.token);

//Web;

app.use(express.static("../public"));
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

let scope = ["identify", "guilds"];
passport.use(
  new Strategy(
    {
      clientID: client.config.CLI_ID,
      clientSecret: client.config.CLI_SECRET,
      callbackURL: `${client.config.URL}/login`,
      scope: scope
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function() {
        return done(null, profile);
      });
    }
  )
);

app
  .use(bodyparser.json())
  .use(bodyparser.urlencoded({ extended: true }))
  .engine("html", require("ejs").renderFile)
  .use(express.static(path.join(__dirname, "/public")))
  .set("view engine", "ejs")
  .set("views", path.join(__dirname, "views"))
  .set("port", process.env.PORT || 3000)
  .use(
    session({
      secret: "mysatabot",
      resave: false,
      saveUninitialized: false
    })
  )

  .use(passport.initialize())
  .use(passport.session())
  .use(function(req, res, next) {
    req.client = client
    next();
  });

app
  .use("/", require("./rutas/index"))
  // Perfil
  .use("/perfil", require("./rutas/perfil"))
  // Guias
  .use("/guias", require("./rutas/guias"))
  // Guias
  .use("/mysql", require("./rutas/guias/mysql"))
  .use("/mongodb", require("./rutas/guias/mongodb"))
  // Usuarios
  .use("/u", require("./rutas/usuarios"))
  // Listar usuarios
  .use("/usuarios", require("./rutas/list_usuario"))
  // Pruebas
  .use("/pruebas", require("./rutas/pruebas"))
  // Roles
  .use("/roles", require("./rutas/roles"))
  // Bots
  .use("/bots", require("./rutas/bots"))
  // Panel
  .use("/panel", require("./rutas/panel"))
  /*
  .use("/herramientas", require("./rutas/herramientas"))
  
  
  
  
  
  
  
  .use("/error404", require("./rutas/error"))
  .get("*", function(req, res) {
  res.redirect("/error404")
});*/

app.listen(app.get("port"), function() {
  console.log("Listo en el puerto " + app.get("port"));
});

process.on("unhandledRejection", r => {
  console.dir(r);
});
