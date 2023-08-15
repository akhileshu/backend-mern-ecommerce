const { User } = require("../model/User");

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const doc = await user.save();
    // console.log(doc)
    res.status(201).json({id:doc.id,role:doc.role});
  } catch (error) {
    res.status(400).json({ error: "Error creating user" });
    // console.log(error)
  }
};
exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)  res.status(401).json({ message: "invalid credentials" });
    else if (user.password === req.body.password) {
      // send only these 3 fields
       res
        .status(200)
        .json({id:user.id,role:user.role});
    } else  res.status(401).json({ message: "invalid credentials" });
  } catch (error) {
     res.status(400).json({ error: "Error login User" });
    // console.log(error)
  }
};
