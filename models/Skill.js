'use strict';

import Rating from './Rating.js';

export default class Skill
{
    constructor(category, subject, value = 1)
    {
        this.category = category;
        this.subject = subject;
        this.rating = new Rating(this.subject, value);
    }
}
