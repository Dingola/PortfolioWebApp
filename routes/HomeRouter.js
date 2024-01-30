'use strict';

const express = require('express');
const router = express.Router();
const HomeController = require("../controllers/HomeController");

const home_controller = new HomeController();

// router.post('/add_skill', home_controller.add_skill.bind(home_controller));
router.get('/get_skills', home_controller.get_skills.bind(home_controller));
router.get('/get_projects', home_controller.get_projects.bind(home_controller));

module.exports = {
    routes: router
};
