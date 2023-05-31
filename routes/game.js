const { Router } = require("express");
const {
  getItems,
  getItemequip,
  getCoins,
  equipItem,
  buyItem,
  newUser,
  getUser,
  signUp,
  setCoins,
} = require("../controllers/game");

const router = new Router();

//TODO:
//  [x]:Sign Up user
//  [x]:login user
//  [x]:Obtener las monedas
//  [x]:Obtener los objetos comprados
//  [x]:Comprar item
//  [x]:Equipar objeto
//  [x]:Obtener el objeto equipado
router.get("/:id", getCoins);

router.post("/", newUser);

router.post("/user", signUp);

router.get("/user/:id", getUser);

router.get("/items/:id", getItems);

router.get("/item/:id", getItemequip);

router.get("/item/:id/:item", equipItem);

router.post("/item/:id", buyItem);

router.get("/game/:id", setCoins);

module.exports = router;
