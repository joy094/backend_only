import { comparePassword, hashPassword } from "../helpers/auth_helper.js";
import user_model from "../model/user_model.js";
import JWT from "jsonwebtoken"
//REGISTE ROUTE LOGIC POST

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    //validation
    if (!name) {
      return res.send({ error: "name is required" });
    }
    if (!email) {
      return res.send({ error: "email is required" });
    }
    if (!password) {
      return res.send({ error: "password is required" });
    }
    if (!phone) {
      return res.send({ error: "phone is required" });
    }
    if (!address) {
      return res.send({ error: "address is required" });
    }
    //check user database
    const existingUser = await user_model.findOne({ email });
    //existing user database
    if (existingUser) {
      return res
        .status(200)
        .send({ success: true, meassage: "Already register please login" });
    }

    //

    //register user hash password
    const hashedPassword = await hashPassword(password);

    // save

    const user = await new user_model({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();
    res
      .status(201)
      .send({ success: true, meassage: "User Register Successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      meassage: "error is registetion",
    });
  }
};

//LOGIN ROUTE LOGIC POST
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res
        .status(404)
        .send({ status: false, meassage: "invalid email or password" });
    }

    //check user
    const checkUser = await user_model.findOne({ email });
    if (!checkUser) {
      return res
        .status(404)
        .send({ success: false, meassage: "email is not registerd" });
        
        
    }

    //match user

    const match = await comparePassword(password, checkUser.password);
    if (!match) {
      return res
        .status(200)
        .send({ success: false, meassage: "invalid pasword" });
    }

    //token
    const token = await JWT.sign(
      { _id: checkUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.status(200).send({
      success: true,
      meassage: "login succesfully",
      user: {
        name: checkUser.name,
        email: checkUser.email,
        phone:checkUser.phone,
        addres:checkUser.address
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      meassage: "error in login  ",
      error,
    });
  }
};

//test controller
export const testController=(req,res)=>{
 res.send("router protected")
  
}
