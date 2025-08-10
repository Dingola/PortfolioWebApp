'use strict';

import Project from './Project.js';
import Skill from './Skill.js';

export default class ProjectModel
{
    constructor()
    {
        this.projects = [
            new Project(
                'Qt Log Viewer', 
                'Qt-LogViewer ist eine moderne Desktop-Anwendung zur komfortablen Anzeige, Suche und Filterung von Logdateien. Die Anwendung wurde mit Qt und C++ entwickelt und bietet eine benutzerfreundliche Oberfläche, mit der sich Logdaten effizient durchsuchen und analysieren lassen. Zu den Funktionen gehören praktische Filtermöglichkeiten, eine übersichtliche Tabellenansicht sowie die Möglichkeit, mehrere Logdateien gleichzeitig zu laden und zu vergleichen. Das aktuell unterstützte Logformat ist flexibel und kann bei Bedarf erweitert werden. Zusätzlich lassen sich Sprache und Design der Anwendung über einen integrierten Einstellungsdialog individuell anpassen. Qt-LogViewer ist plattformübergreifend auf Windows, Linux und macOS nutzbar und eignet sich ideal für Entwickler, Administratoren und alle, die Logdateien schnell und intuitiv auswerten möchten.', 
                ['static/css/resources/images/QtLogViewerPorject/Qt-LogViewer.png'],
                'https://github.com/Dingola/Qt-LogViewer', 
                'https://github.com/Dingola/Qt-LogViewer',
                [new Skill('', 'C++', 3), new Skill('', 'Qt6', 3), new Skill('', 'CMake', 2), new Skill('', 'MSVC', 2), new Skill('', 'Git', 2), new Skill('', 'Doxygen', 2), new Skill('', 'GoogleTest', 2)]
            ),
            new Project(
                'Portfolio Webseite', 
                'Meine Portfolio Web App! Dieses Projekt wurde mit NodeJS und Express erstellt und dient als Plattform für die Präsentation meiner Arbeit und Fähigkeiten.', 
                ['static/css/resources/images/PortfolioProject/PortfolioWebPage-dark.png', 'static/css/resources/images/PortfolioProject/PortfolioWebPage-light.png'],
                'https://github.com/Dingola/PortfolioWebApp', 
                '',
                [new Skill('', 'Express'), new Skill('', 'nodeJS'), new Skill('', 'dotenv'), new Skill('', 'cors'), new Skill('', 'nodemon'), new Skill('', 'body-parser'),
                 new Skill('', 'JavaScript'),  new Skill('', 'CSS'),  new Skill('', 'HTML'),  new Skill('', 'VS Code'),  new Skill('', 'Git'), new Skill('Development Tools and Build Systems', 'Figma', 1)]
            )
        ];
    }

    set_projects(projects)
    {
        if (!Array.isArray(projects) || !projects.every(instance => instance instanceof Project)) 
        {
            throw new Error('Parameter must be an array of Project instances');
        }

        this.projects = projects;
    }

    get_projects()
    {
        return this.projects;
    }
}
