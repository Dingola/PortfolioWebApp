const express = require('express');
const router = express.Router();
const RatingController = require('../controllers/RatingController');

router.post('/add_rating', RatingController.add_rating);
router.get('/get_ratings', RatingController.get_ratings);

module.exports = {
    routes: router
}
