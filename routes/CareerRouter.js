import express from 'express';
import CareerController from '../controllers/CareerController.js';

const router = express.Router();
const career_controller = new CareerController();

router.get('/get_career_stations', career_controller.get_career_stations.bind(career_controller));

export default {
    routes: router
};