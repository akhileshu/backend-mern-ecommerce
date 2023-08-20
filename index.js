const express = require("express");
const mongoose = require("mongoose");

// auth
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const crypto = require("crypto");
const { User } = require("./model/User");
// jwt
const jwt = require("jsonwebtoken");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

// routes
const productsRouter = require("./routes/products");
const brandsRouter = require("./routes/brands");
const categoriesRouter = require("./routes/categories");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");

const cors = require("cors");
const { sanitizeUser, isAuth } = require("./services/common");

const server = express();

const SECRET_KEY = "SECRET_KEY";
// JWT options
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET_KEY; // TODO: should not be in code;

// Set up session middleware
server.use(
  session({
    secret: "keyboard cat", // Secret key for session encryption
    resave: false,
    saveUninitialized: false,
  })
);

// Authenticate using passport session
server.use(passport.authenticate("session"));

// Enable Cross-Origin Resource Sharing
server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);

// Parse incoming JSON data from client requests
server.use(express.json());

// Protected routes: require user to be authenticated
server.use("/products", isAuth(), productsRouter); // Only authorized users can access products
server.use("/brands", isAuth(), brandsRouter);
server.use("/categories", isAuth(), categoriesRouter);
server.use("/auth", authRouter);
server.use("/users", isAuth(), userRouter);
server.use("/cart", isAuth(), cartRouter);
server.use("/orders", isAuth(), orderRouter);

// Passport Strategies
passport.use(
  "local",
  new LocalStrategy({ usernameField: "email" }, async function (
    email,//by default passport uses 'username'
    password,
    done
  ) {
    try {
      // Find user by their email in the database
      const user = await User.findOne({ email: email });

      if (!user) {
        return done(null, false, { message: "Invalid credentials" });
      }

      // Hash the provided password with user's salt and compare with stored password
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return done(null, false, { message: "Invalid credentials" });
          }
          const token = jwt.sign(sanitizeUser(user), SECRET_KEY);
          // Authentication successful, pass the sanitizeUser(user)/token to serializer
          done(null, token);
        }
      );
    } catch (err) {
      done(err);
    }
  })
);
passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    console.log({ jwt_payload });
    try {
      const user = await User.findOne({ id: jwt_payload.sub });
      if (user) {
        return done(null, sanitizeUser(user)); // this calls serializer
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

// Serialize user to session
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    // Store user's ID and role in the session
    return cb(null, { id: user.id, role: user.role });
  });
});

// Deserialize user from session
passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    // Retrieve user's ID and role from the session
    return cb(null, user);
  });
});

// Connect to the database
main().catch((error) => console.log(error));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce"); // Connect to MongoDB
  console.log("Connected to the database");
}

// Handle home page request
server.get("/", (req, res) => {
  res.json({ status: "success" });
});

// Start the server
server.listen(8080, () => console.log("Server started on port 8080"));
