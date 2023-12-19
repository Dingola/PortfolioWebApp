'use strict';

const Rating = require('../models/RatingModel');

const ratings_array = [
    new Rating('Programming Languages & Co.', 'C++', 3),
    new Rating('Programming Languages & Co.', 'Java', 2),
    new Rating('Programming Languages & Co.', 'C', 2),
    new Rating('Programming Languages & Co.', 'Erlang', 1),
    new Rating('Programming Languages & Co.', 'Prolog', 1),
    new Rating('Programming Languages & Co.', 'JavaScript', 1),
    new Rating('Programming Languages & Co.', 'HTML', 2),
    new Rating('Programming Languages & Co.', 'CSS', 2),
    new Rating('Programming Languages & Co.', 'SQL', 2),
    new Rating('Programming Languages & Co.', 'C#', 1),
    new Rating('Programming Languages & Co.', 'LabVIEW (G)', 2),
    new Rating('Frameworks and Libraries', 'Qt / QML', 3),
    new Rating('Frameworks and Libraries', 'Google Test', 2),
    new Rating('Frameworks and Libraries', 'Doxygen', 2),
    new Rating('Frameworks and Libraries', 'OpenGL', 1),
    new Rating('Frameworks and Libraries', 'MFC', 1),
    new Rating('Frameworks and Libraries', 'JPA', 1),
    new Rating('Frameworks and Libraries', 'Spring DI', 1),
    new Rating('Frameworks and Libraries', 'Hibernate', 1),
    new Rating('Frameworks and Libraries', 'JUnit', 1),
    new Rating('Development Tools and Build Systems', 'Git', 2),
    new Rating('Development Tools and Build Systems', 'CMake', 2),
    new Rating('Development Tools and Build Systems', 'MSVC', 2),
    new Rating('Development Tools and Build Systems', 'VS Code', 2),
    new Rating('Development Tools and Build Systems', 'Jira', 2),
    new Rating('Development Tools and Build Systems', 'SVN', 1),
    new Rating('Development Tools and Build Systems', 'LabVIEW', 2),
    new Rating('Development Tools and Build Systems', 'Maven', 1),
    new Rating('Development Tools and Build Systems', 'Figma', 1),
    new Rating('Development Tools and Build Systems', 'UE5', 1),
    new Rating('Development Tools and Build Systems', 'Blender', 1)
];

const convert_array_to_object = (array) => {
    return array.reduce((acc, item) => {
        const { category, subject, value } = item;

        if (!acc[category])
        {
            acc[category] = [];
        }

        acc[category].push({ subject, value });

        return acc;
    }, {});
};

const add_rating = (req, res) => {
    try {
        const { category, subject, value } = req.body;
        const new_rating = new Rating(category, subject, value);
        ratings_array.push(new_rating);
        res.send('Rating added successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const get_ratings = (req, res) => {
    try {
        const ratingsObject = convert_array_to_object(ratings_array);
        res.json(ratingsObject);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
  
module.exports = {
    add_rating,
    get_ratings
};
