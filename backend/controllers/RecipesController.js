const Recipe = require("../models/Recipe");
const mongoose = require("mongoose");

const RecipesController = {
  index: async (req, res) => {
    let limit = 6;
    let page = req.query.page || 1;
    console.log(page);
    let recipes = await Recipe.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    let totalRecipesCount = await Recipe.countDocuments();

    let totalPagesCount = Math.ceil(totalRecipesCount / limit);

    let links = {
      nextPage: totalPagesCount == page ? false : true,
      previousPage: page == 1 ? false : true,
      currentPage: page,
      loopableLinks: [],
    };

    console.log(links.previousPage);

    // generate loopableLinks array
    for (let index = 0; index < totalPagesCount; index++) {
      let number = index + 1;
      links.loopableLinks.push({ number });
    }

    let response = {
      links,
      data: recipes,
    };

    return res.json(response);
  },

  store: async (req, res) => {
    const { title, description, ingredients } = req.body;

    const recipe = await Recipe.create({
      title,
      description,
      ingredients,
    });
    return res.json(recipe);
  },

  show: async (req, res) => {
    try {
      let id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "not a valid id" });
      }
      let recipe = await Recipe.findById(id);
      if (!recipe) {
        return res.status(404).json({ msg: "recipes not found" });
      }
      return res.json(recipe);
    } catch (e) {
      return res.status(500).json({ msg: "internet server error" });
    }
  },

  destory: async (req, res) => {
    try {
      let id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "not a valid id" });
      }

      let recipe = await Recipe.findByIdAndDelete(id);

      if (!recipe) {
        return res.status(404).json({ msg: "recipes not found" });
      }

      return res.json(recipe);
    } catch (e) {
      return res.status(500).json({ msg: "internet server error" });
    }
  },
  update: async (req, res) => {
    try {
      let id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "not a valid id" });
      }

      let recipe = await Recipe.findByIdAndUpdate(id, {
        ...req.body,
      });

      if (!recipe) {
        return res.status(404).json({ msg: "recipes not found" });
      }

      return res.json(recipe);
    } catch (e) {
      return res.status(500).json({ msg: "internet server error" });
    }
  },
};

module.exports = RecipesController;
