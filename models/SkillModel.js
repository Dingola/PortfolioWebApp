'use strict';

import Skill from './Skill.js';
import Rating from './Rating.js';

export default class SkillModel
{
    constructor()
    {
        this.skills = [
            new Skill('Programming Languages & Co.', 'C++', 3),
            new Skill('Programming Languages & Co.', 'Java', 2),
            new Skill('Programming Languages & Co.', 'C', 2),
            new Skill('Programming Languages & Co.', 'Erlang', 1),
            new Skill('Programming Languages & Co.', 'Prolog', 1),
            new Skill('Programming Languages & Co.', 'JavaScript', 2),
            new Skill('Programming Languages & Co.', 'HTML', 2),
            new Skill('Programming Languages & Co.', 'CSS', 2),
            new Skill('Programming Languages & Co.', 'SQL', 2),
            new Skill('Programming Languages & Co.', 'C#', 1),
            new Skill('Programming Languages & Co.', 'LabVIEW (G)', 2),
            new Skill('Frameworks and Libraries', 'Qt / QML', 3),
            new Skill('Frameworks and Libraries', 'Google Test', 2),
            new Skill('Frameworks and Libraries', 'Doxygen', 2),
            new Skill('Frameworks and Libraries', 'OpenGL', 1),
            new Skill('Frameworks and Libraries', 'MFC', 1),
            new Skill('Frameworks and Libraries', 'JPA', 1),
            new Skill('Frameworks and Libraries', 'Spring DI', 1),
            new Skill('Frameworks and Libraries', 'Hibernate', 1),
            new Skill('Frameworks and Libraries', 'JUnit', 1),
            new Skill('Development Tools and Build Systems', 'Git', 2),
            new Skill('Development Tools and Build Systems', 'CMake', 2),
            new Skill('Development Tools and Build Systems', 'MSVC', 2),
            new Skill('Development Tools and Build Systems', 'VS Code', 2),
            new Skill('Development Tools and Build Systems', 'Jira', 2),
            new Skill('Development Tools and Build Systems', 'SVN', 1),
            new Skill('Development Tools and Build Systems', 'LabVIEW', 2),
            new Skill('Development Tools and Build Systems', 'Maven', 1),
            new Skill('Development Tools and Build Systems', 'Figma', 1),
            new Skill('Development Tools and Build Systems', 'UE5', 1),
            new Skill('Development Tools and Build Systems', 'Blender', 1)
        ];
    }

    set_skills(skills)
    {
        if (!Array.isArray(skills) || !skills.every(instance => instance instanceof Skill)) 
        {
            throw new Error('Parameter must be an array of Skill instances');
        }

        this.skills = skills;
    }

    get_skills()
    {
        return this.skills;
    }
}
