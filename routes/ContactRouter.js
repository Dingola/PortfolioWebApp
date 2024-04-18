import express from 'express';
import ContactController from '../controllers/ContactController.js';

const router = express.Router();
const contact_controller = new ContactController();

router.post('/send_email', contact_controller.send_email.bind(contact_controller));

export default {
    routes: router
};