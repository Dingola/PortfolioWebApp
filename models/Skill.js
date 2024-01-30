'use strict';

const Rating = require("./Rating");

class Skill
{
    constructor(category, subject, value = 1)
    {
        this.category = category;
        this.subject = subject;
        this.rating = new Rating(this.subject, value);
    }
}

module.exports = Skill;
