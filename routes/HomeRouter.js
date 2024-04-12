import express from 'express';
import HomeController from '../controllers/HomeController.js';

const router = express.Router();
const home_controller = new HomeController();

// router.post('/add_skill', home_controller.add_skill.bind(home_controller));
router.get('/get_skills', home_controller.get_skills.bind(home_controller));
router.get('/get_projects', home_controller.get_projects.bind(home_controller));

export default {
    routes: router
};
