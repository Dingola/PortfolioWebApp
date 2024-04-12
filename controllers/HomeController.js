'use strict';

import SkillModel from '../models/SkillModel.js';
import ProjectModel from '../models/ProjectModel.js';

export default class HomeController 
{
    constructor() 
    {
        this.skill_model = new SkillModel();
        this.project_model = new ProjectModel();
    }

    get_skills(req, res) 
    {
        try {
            res.json(this.skill_model.get_skills());
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    get_projects(req, res)
    {
        try {
            res.json(this.project_model.get_projects());
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}
