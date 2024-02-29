'use strict';

const express = require('express');
const router = express.Router();
const CareerController = require("../controllers/CareerController");

const career_controller = new CareerController();

router.get('/get_career_stations', career_controller.get_career_stations.bind(career_controller));

module.exports = {
    routes: router
};
