const express = require("express");
const router = express.Router();
const passport = require("passport");

router
.get("/", async function(req, res) {

  const DatoUsers = new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM usuariosdb`, (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      resolve(results)
    });
  });

  let UserData = await DatoUsers.then(data => {
    return data
  })
  
  const DatoBots = new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM bots`, (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      resolve(results)
    });
  });

  let BotsData = await DatoBots.then(data => {
    return data
  })
  
  const Datocategory = new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM category`, (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      resolve(results)
    });
  });

  let CategoryData = await Datocategory.then(data => {
    return data
  })
  
  const DatoLibrary = new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM library`, (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      resolve(results)
    });
  });

  let LibraryData = await DatoLibrary.then(data => {
    return data
  })
  
  
  
    res.render("panel/index.ejs", {
        login: req.isAuthenticated() ? "si": "no",
        status: req.isAuthenticated() ? "PERFIL": "LOGIN",
        loginp: (req.isAuthenticated() ? true: false),
        user: req.user,
        userDB: UserData,
        botsDB: BotsData,
        categoryDB: CategoryData,
        libraryDB: LibraryData
      });
})

.post("/insertl", async(req, res) => {

  let Library = req.body.library;
  
  conn.query(`INSERT INTO library (lname) VALUES ('${Library}')`, (error,
    results,
    fields) => {
    if (error) throw error;
    res.redirect('/panel')
  });

})

.post("/insertc", async(req, res) => {
  
  let Category = req.body.category;
  
    conn.query(`INSERT INTO category (cname) VALUES ('${Category}')`, (error,
        results,
        fields) => {
        if (error) throw error;
        res.redirect('/panel')
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