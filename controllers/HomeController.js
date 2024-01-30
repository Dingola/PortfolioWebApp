'use strict';

const SkillModel = require("../models/SkillModel");
const ProjectModel = require("../models/ProjectModel");

class HomeController 
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

module.exports = HomeController;
