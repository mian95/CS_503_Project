const express = require("express");
const bodyParser = require("body-parser");
const path = require("node:path");
const fs = require("node:fs/promises"); // Using promises for cleaner async/await syntax
const bcrypt = require("bcrypt"); // Dependency for password hashing
const mongoose = require("mongoose"); // Import mongoose

const app = express();
const port = 3000;

// Use express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Middleware to use js and css files
app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/yourDatabaseName", { // Replace with your database name
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define User schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model("User", userSchema);

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
  // Assuming you have a way to check if the user is logged in
  // For example, checking if a session or token exists
  if (req.session && req.session.user) { // Adjust this condition based on your authentication logic
    return next(); // User is authenticated, proceed to the next middleware/route
  }
  res.redirect("/login_signup"); // Redirect to login/signup if not authenticated
}

// Apply the middleware to all routes that require authentication
app.use("/home", isAuthenticated); // Protect the home route
app.use("/community", isAuthenticated); // Protect the community route
app.use("/fitness", isAuthenticated); // Protect the fitness route
app.use("/wellness", isAuthenticated); // Protect the wellness route
app.use("/recipes", isAuthenticated); // Protect the recipes route
app.use("/about", isAuthenticated); // Protect the about route

// Routes

// Home route (redirect to login)
app.get("/", (req, res) => {
  res.redirect(301, "/login_signup");
});

// Signup route
app.post("/signup", async (req, res) => {
  const { signupName, signupEmail, signupPassword } = req.body;

  try {
    // Check for existing email
    const existingUser = await User.findOne({ email: signupEmail });
    if (existingUser) {
      return res.status(400).send("Email already exists");
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(signupPassword, 10);

    const newUser = new User({
      name: signupName,
      email: signupEmail,
      password: hashedPassword,
    });

    await newUser.save(); // Save user to MongoDB

    res.status(201).send("User created successfully!");

  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/login",(req,res)=>{
    res.status(200).render("login_signup")
})

// Login route
app.post("/login", async (req, res) => {
  const { loginEmail, loginPassword } = req.body;

  try {
    const user = await User.findOne({ email: loginEmail });
    if (!user) {
      return res.status(401).send("Invalid credentials");
    }

    const validPassword = await bcrypt.compare(loginPassword, user.password);
    if (!validPassword) {
      return res.status(401).send("Invalid credentials");
    }

    // Successful login (logic for session management can be added here)
    res.redirect("/home");
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).send("Internal Server Error");
  }
});



// ... other routes for community, fitness, wellness, recipes, about 
// community
app.get("/community", (req, res) => {
    res.status(200).render("community", {
      avatar1:
        "https://static.vecteezy.com/system/resources/thumbnails/006/487/917/small_2x/man-avatar-icon-free-vector.jpg",
      avatar2:
        "https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png",
    });
  });
  
  // fitness
  app.get("/fitness", (req, res) => {
    res.status(200).render("fitness", {
      cardioImg:
        "https://c8.alamy.com/comp/2A5PE06/fitness-cardio-exercises-abstract-isolated-vector-illustration-yoga-poses-in-flat-design-woman-is-doing-exercise-for-body-stretching-healthy-lifes-2A5PE06.jpg",
      trainingImg: "/img/gym.jpg",
      yogaImg: "/img/huga.jpg",
    });
  });
  
  // wellness
  app.get("/wellness", (req, res) => {
    res.status(200).render("wellness", {
      mentalHealth:
        "https://www.soundvision.com/sites/default/files/styles/article-teaser/public/field/image/adobestock_259681756_0.jpeg?itok=8hocZG_D",
      sleepHygiene:
        "https://neuropathycommons.org/sites/default/files/SleepHygiene_4_%20758x590.png",
      meditation:
        "https://www.hindustantimes.com/ht-img/img/2024/04/11/1600x900/gc308d801ffb4b08e939_1712857798644_1712857798930.jpg",
    });
  });
  
  // recipes
  app.get("/recipes", (req, res) => {
    res.status(200).render("recipes", {
      breakfast:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPiZ8_tiOUzcRnrgKnw3bS1sgj0D0xOe5iSw&s",
      grilled:
        "https://www.tasteofhome.com/wp-content/uploads/2024/02/Easy-Grilled-Salmon-Salad_EXPS_FT23_273937_ST_6_02_1.jpg",
      chicken:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi0wsNAwKn4B5ijzFemHTSnNxxkfGZa9DKcw&s",
      noBake:
        "https://www.yummymummykitchen.com/wp-content/uploads/2018/03/5198b-nut-free-no-bake-energy-balls-4-720x720.jpg",
    });
  });
  
  // about
  app.get("/about", (req, res) => {
    res.status(200).render("about");
  });


app.listen(port, () => {
  console.log(`Your server is live at the local host ${port}`);
});