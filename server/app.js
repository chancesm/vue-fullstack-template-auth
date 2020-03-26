const express = require("express");
const app = express();
const morgan = require("morgan");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const { sequelize } = require("./db");
const authRouter = require("./routers/auth");
const apiRouter = require("./routers/api");
const passport = require("passport");

app.use(
  session({
    secret: "starter-project-template-chance-murray",
    store: new SequelizeStore({
      db: sequelize
    }),
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    proxy: true, // if you do SSL outside of node.
    saveUninitialized: true
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(passport.initialize());
app.use(passport.session());
app.use("/", express.static("../dist"));

app.use("/auth", authRouter);
app.use("/api", apiRouter);

app.get("*", (req, res) => {
  res.redirect("/");
});

app.all("*", (req, res) => {
  res.sendStatus(404);
});

app.listen(5000, () => {
  console.log("Server listening on 5000");
});
