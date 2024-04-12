'use strict';

import CareerModel from '../models/CareerModel.js';

export default class CareerController 
{
    constructor() 
    {
        this.career_model = new CareerModel();
    }

    get_career_stations(req, res) 
    {
        try {
            res.json(this.career_model.get_career_stations());
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}
