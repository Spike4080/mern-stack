const express = require("express");
const { body } = require("express-validator");
const RecipesController = require("../controllers/RecipesController");
const handleErrorMessage = require("../middlewares/handleErrorMessange");

const router = express.Router();

// get all recipes
router.get("", RecipesController.index);
// create post singel recipe
router.post(
  "",
  [
    body("title").notEmpty(),
    body("description").notEmpty(),
    body("ingredients").notEmpty().isArray({ min: 3 }),
  ],
  handleErrorMessage,
  RecipesController.store
);
// get single recipe
router.get("/:id", RecipesController.show);
// delete single recipe
router.delete("/:id", RecipesController.destory);
// patch update single recipe
router.patch("/:id", RecipesController.update);
//

module.exports = router;
