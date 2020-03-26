"use strict";
const crypto = require("crypto");
const Router = require("express").Router;
const router = new Router();

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const { User } = require(__dirname + "/../db");

function hashThis(string) {
  let hash = crypto.createHash("sha256");
  hash.update(string);
  return hash.digest("hex");
}

passport.use(
  new LocalStrategy((username, password, done) => {
    let hashpass = hashThis(password);
    User.findOne({ where: { username, password: hashpass } }).then(user => {
      if (user !== null) {
        done(null, user.toJSON());
      } else done(null, false, { message: "Incorrect username or password." });
    });
  })
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findByPk(id).then(user => done(null, user));
});

router.post("/login", passport.authenticate("local"), (req, res, next) => {
  res.json(req.user);
});
router.post("/register", async (req, res) => {
  let { username, password, fullname } = req.body;
  let hash = hashThis(password);

  // Check for user and create
  User.findOne({ where: { username } }).then(user => {
    if (user !== null) {
      res.status(403).send("Username already exists");
    } else {
      User.create({
        username,
        password: hash,
        fullname
      }).then(user => {
        req.login(user.toJSON(), () => {
          res.json(req.user);
        });
      });
    }
  });
});
router.delete("/logout", (req, res) => {
  req.logout;
  res.sendStatus(200);
});
router.get("/status", (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else res.json(null);
});

module.exports = router;
