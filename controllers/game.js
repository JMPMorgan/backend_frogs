const User = require("../models/user");

const equipItem = async (req, res) => {
  try {
    const { id, item } = req.params;
    const user = await User.findById(id);
    user.item_equipped = item == "Nada" ? " " : item;
    await user.save();
    return res.json({
      success: true,
      data: user.item_equipped,
      msg: "Equipado con exito",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Error al equipar item",
    });
  }
};

const getItemequip = async (req, res) => {
  try {
    const { id } = req.params;
    const { item_equipped } = await User.findById(id);
    return res.json({
      success: true,
      msg: "Item equipado",
      data: item_equipped ? item_equipped : "",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Error al obtener  item equipado",
    });
  }
};

const buyItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { item, cost } = req.query;
    const user = await User.findById(id);
    if (user.coins - cost < 0) {
      return res.status(500).json({
        success: false,
        msg: "No tienes suficientes monedas",
      });
    }
    const items = user.items != "" ? JSON.parse(user.items) : null;
    if (Array.isArray(items)) {
      items.push(item);
      user.items = JSON.stringify(items);
    } else {
      user.items = JSON.stringify([item]);
    }
    user.coins = user.coins - cost;
    await user.save();
    return res.json({
      success: true,
      msg: "Comprado con exito",
      data: user.items,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Error al comprar item",
    });
  }
};

const getItems = async (req, res) => {
  try {
    const { id } = req.params;
    const { items } = await User.findById(id);
    if (!items) {
      return res.status(500).json({
        success: false,
        msg: "No hay items",
        data: [],
      });
    }
    return res.json({
      success: true,
      msg: "Items Comprados",
      data: items != "" ? JSON.parse(items) : [],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Error al conseguir monedas",
    });
  }
};

const getCoins = async (req, res) => {
  try {
    const { id } = req.params;
    const { coins } = await User.findById(id);
    return res.json({
      success: true,
      msg: "Monedas Obtenidas",
      data: coins,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Error al conseguir las Coins.",
    });
  }
};

const newUser = async (req, res) => {
  try {
    const { name, password } = req.query;
    const existsUser = await User.findOne({ name });
    if (existsUser) {
      return res.status(500).json({
        success: false,
        msg: `Username:${name} ya existe `,
      });
    }

    const user = new User({
      name,
      password,
    });

    await user.save();
    return res.json({
      success: true,
      msg: "Usuario Creado",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Error al Crear un nuevo usuario.",
    });
  }
};

const signUp = async (req, res) => {
  try {
    const { name, password } = req.query;
    const user = await User.findOne({ name, password });
    if (!user) {
      return res.status(500).json({
        success: false,
        msg: `Error en contraseña o usuario `,
      });
    }

    return res.json({
      success: true,
      msg: "Usuario Obtenido",
      data: user._id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Error al iniciar sesion .",
    });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    let items = [];
    if (user.items != "") {
      const itemsUser = JSON.parse(user.items);
      items = itemsUser;
    }
    return res.json({
      success: true,
      msg: "Usuario Obtenido",
      data: user,
      items,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Error al conseguir la informacion del usuario.",
    });
  }
};

const setCoins = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    user.coins = user.coins + 50;
    await user.save();
    return res.json({
      success: true,
      msg: "Coins Actualizadas con exito",
      data: user.coins,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Error al insertar monedas al ganador",
    });
  }
};

module.exports = {
  buyItem,
  equipItem,
  getCoins,
  getItemequip,
  getItems,
  getUser,
  signUp,
  setCoins,
  newUser,
};
