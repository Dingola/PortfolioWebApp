`use strict`;

const CareerStation = require("./CareerStation");
const Skill = require("./Skill");

class CareerModel
{
   #career_stations;

    constructor()
    {
        this.#career_stations = [
            new CareerStation(
                `GFaI - Gesellschaft zur Förderung angewandter Informatik e. V.`, 
                `Wissenschaftlicher Mitarbeiter <br> (C++ / Qt Softwareentwickler)`, 
                ``, 
                `https://www.gfai.de/`,
                '',
                new Date(2017, 8),
                new Date(2020, 9)
            ),
            new CareerStation(
                `GHC - Global Health Care GmbH`, 
                `C++ Softwareentwickler`, 
                ``,
                `https://ghc-tech.de/`,
                '',
                new Date(2016, 8),
                new Date(2016, 10)
            ),
            new CareerStation(
                `Hochschule für Technik und Wirtschaft <br> (HTW Berlin)`, 
                `Student`, 
                ``, 
                `https://www.htw-berlin.de/`, 
                `Bachelor of Science (B. Sc.)`,
                new Date(2010, 9),
                new Date(2016, 3)
            ),
            new CareerStation(
                `VIVANTES Auguste-Vikoria-Klinikum`, 
                `Zivi / Zivildienstleistender`, 
                `Meinen Zivildienst habe ich auf der Station für Neurologie absolviert. `, 
                `https://www.vivantes.de/auguste-viktoria-klinikum/neurologie-mit-stroke-unit`,
                ``,
                new Date(2009, 11),
                new Date(2010, 8)
            ),
            new CareerStation(
                `Oberstufenzentrum Kommunikations-, Informations- und Medientechnik <br> (OSZ KIM Berlin)`, 
                `Schüler`, 
                ``, 
                `https://www.oszkim.de/wp/`, 
                `Allgemeine Fachhochschulreife (FOS)`,
                new Date(2007, 7), 
                new Date(2009, 5)
            ),
            new CareerStation(
                `Katholische Schule Sankt Marien`, 
                `Schüler`, 
                ``, 
                `https://marienschule-berlin.de/`, 
                `Mittlerer Schulabschluss (MSA)`,
                new Date(2002, 7),
                new Date(2007, 6)
            )
        ];
    }
   
    set_career_stations(career_stations)
    {
        if (!Array.isArray(career_stations) || !career_stations.every(instance => instance instanceof Project)) 
        {
            throw new Error(`Parameter must be an array of CarrerStation instances`);
        }

        this.#career_stations = career_stations;
    }

    get_career_stations()
    {
        return this.#career_stations;
    }
}

module.exports = CareerModel;
