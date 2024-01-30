'use strict';

class Project
{
    constructor(title, description, images, github_url, livedemo_url, skills_used)
    {
        this.title = title;
        this.description = description;
        this.images = images;
        this.github_url = github_url;
        this.livedemo_url = livedemo_url;
        this.skills_used = skills_used;
    }
}

module.exports = Project;
