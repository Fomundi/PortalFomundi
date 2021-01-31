const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    res.render("error404.ejs", {
        login: (req.isAuthenticated() ? "si": "no"),
        invite: `https://discordapp.com/oauth2/authorize?client_id=${process.env.CLIENT_ID}&permissions=0&scope=bot`

    }); 
});

module.exports = router; 
