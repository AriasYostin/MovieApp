import userModel from "../models/user.model.js";
import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";

const signup = async (req, res) => {
  try {
    const { username, password, displayName } = req.body;

    const checkUser = await userModel.findOne({ username });

    if (checkUser) {
      return responseHandler.badrequest(res, "Username already used");
    }

    const user = new userModel();

    user.displayName = displayName;
    user.username = username;
    user.setPassword(password);

    await user.save();

    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch (error) {
    console.error("Error in signup:", error);
    responseHandler.error(res);
  }
};

const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username }).select("username password salt id displayName");

    if (!user) {
      return responseHandler.badrequest(res, "Usuario no existe");
    }

    if (!user.validPassword(password)) {
      return responseHandler.badrequest(res, "Contraseña incorrecta");
    }

    const token = jsonwebtoken.sign(
        { data: user.id },
        process.env.TOKEN_SECRET,
        { expiresIn: "24h" }
      );

      user.password = undefined;
      user.salt = undefined;
  
      responseHandler.created(res, {
        token,
        ...user._doc,
        id: user.id,
      });


  } catch (error) {
    console.error("Error in signin:", error);
    responseHandler.error(res);
  }
};

const updatePassword = async (req, res) => {
    try {
      const { password, newPassword } = req.body;
  
      // Buscar al usuario por su ID
      const user = await userModel.findById(req.user.id).select("password salt");
  
      if (!user) {
        return responseHandler.unauthorized(res);
      }
  
      if (!user.validPassword(password)) {
        return responseHandler.badrequest(res, "Contraseña actual incorrecta");
      }
  
      // Actualizar la contraseña del usuario
      user.setPassword(newPassword);
      await user.save();
  
      responseHandler.ok(res, "Contraseña actualizada exitosamente");
    } catch (error) {
      console.error("Error updating password:", error);
      responseHandler.error(res);
    }
  };
  
  const getInfo = async (req, res) => {
    try {
      const user = await userModel.findById(req.user.id);
  
      if (!user) {
        return responseHandler.notfound(res);
      }
  
      responseHandler.ok(res, user);
    } catch (error) {
      console.error("Error getting user info:", error);
      responseHandler.error(res);
    }
  };
export default{
  signup,
  signin,
  getInfo,
  updatePassword
};
  


