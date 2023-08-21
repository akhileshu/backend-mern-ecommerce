const { User } = require("../model/User");

exports.fetchUserById = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await User.findById(id);
    // console.log(user)
    res.status(201).json({id:user.id,addresses:user.addresses,email:user.email,role:user.role});
  } catch (error) {
    res.status(400).json({ error: "Error fetch User By Id" });
    // console.log(error)
  }
};
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    console.log(id)
  
    try {
      const user = await User.findByIdAndUpdate(id, req.body, {
        new: true, //return updated user
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: "Error updating user" });
    }
  };