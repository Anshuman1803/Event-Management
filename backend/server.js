const express = require("express");
const cors = require("cors");
const appServer = express();
const dotENV = require("dotenv");
const { mongooseConnection } = require("./config/mongooseConnection");
const { authRoute } = require("./routes/auth.routes");
const { eventRoute } = require("./routes/event.routes");

dotENV.config();
appServer.use(express.json());
appServer.use(cors({ origin: "*" }));

appServer.use("/api/eventmanagement/v1/auth", authRoute);
appServer.use("/api/eventmanagement/v1/events", eventRoute);

// Google Authentication
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const { userCollection } = require("./model/user.model");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
let userRole = ""

appServer.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Passport middleware
appServer.use(passport.initialize());
appServer.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_pass,
      callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        let user = await userCollection.findOne({ googleId: profile.id });
        if (user) {
          return cb(null, user);
        } else {
          user = new userCollection({
            googleId: profile.id,
            fullName: profile.displayName,
            email: profile.emails[0].value,
            password: profile.emails[0].value,
            profile: profile.photos[0].value,
            role: userRole,
          });

          const generatedToken = JWT.sign({ USER: user.email }, process.env.secretKey, { expiresIn: "72h" });
          const hashPassword = bcrypt.hashSync(user.password, 15);
          user.token = generatedToken;
          user.password = hashPassword;
          await user.save();
          return cb(null, user);
        }
      } catch (err) {
        return cb(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userCollection.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

appServer.get("/auth/google", (req, res, next) => {
  userRole = req.query.userType;
  passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
});

appServer.get("/auth/google/callback", passport.authenticate("google"), (req, res) => {
  const user = req.user;
  res.redirect(
    `${process.env.FRONTEND_URL}/auth/google/callback?token=${user.token}&email=${user.email}&name=${user.fullName}&userType=${user.role}&userID=${user._id}&profile=${user.profile}`
  );
});

appServer.get("/auth/status", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(401).json({ user: null });
  }
});

appServer.get("/google-user", (req, res) => {
  res.send(req.user);
});

appServer.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.send({ message: "Logged out successfully" });
  });
});

appServer.listen(5000, async () => {
  try {
    await mongooseConnection();
    console.log(`SERVER STARED  : http://localhost:${process.env.PORT}`);
  } catch (err) {
    console.log(`SOMETHING WENT WRONG : ${err}`);
  }
});
