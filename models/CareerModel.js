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
                `Wissenschaftlicher Mitarbeiter (C++ / Qt Softwareentwickler)`, 
                `<span class="highlight_text2">Im Forschungbereich Signalverarbeitung, in welchem ich tätig war, umfasste mein Aufgabengebiet folgendes:</span>
                <ul class="list">
                    <li>
                        Entwicklung von Softwarebausteinen in C++ 14 unter Verwendung OpenGL 4.3 / GLSL und dem Qt-Framework
                    </li>
                    <li>
                        Entwicklung und Anpassung von grafischen Benutzeroberflächen von Prüfstandssoftware für einen
                        Außengeräuschpüfstand und für einen Windkanal
                    </li>
                    <li>
                        Entwicklung einer "Klasse" zur Visualisierung von Richtungsinformationen in Form von parametrisierbaren Pfeilen.
                        Pfeilen auf der Basis von Instance Rendering Technologie mit OpenGL 3.3 / GLSL. <br><br>Das Projekt ist <a target="_blank" href="https://www.gfai.de/aktuelles/presse/news/artikel/dynabeam-innovative-3d-lokalisierung-von-schallabstrahlungen">hier</a> zu finden.
                    </li>
                    <li>
                        Entwicklung eines Datenmodells für eine Reporting-Software
                    </li>
                    <li>
                        Entwicklung und Anpassung einer grafischen Benutzeroberfläche für eine Reportingsoftware für akustische Karten
                    </li>
                </ul>`,
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
                `<span class="highlight_text2">Studiengang:</span> Angewandte Informatik<br><br><span class="highlight_text2">Schwerpunkt:</span> Multimedia<br><br><span class="highlight_text2">Praktikum:</span> Absolviert bei der <a target="_blank" href="https://www.iav.com/">IAV</a>.
                    Während meines Praktikums lag meine Hauptaufgabe in der Entwicklung einer Schnittstelle zwischen Java und MATLAB. 
                    <br><br><span class="highlight_text2">Thema der Bachelorarbeit:</span> Konzeption und Entwicklung eines Messprogramms zur Aufnahme spektroskopischer Daten`, 
                `https://www.htw-berlin.de/`, 
                `Bachelor of Science (B. Sc.)`,
                new Date(2010, 9),
                new Date(2016, 3)
            ),
            new CareerStation(
                `VIVANTES Auguste-Vikoria-Klinikum`, 
                `Zivi / Zivildienstleistender`, 
                `Meinen Zivildienst habe ich auf der Station für Neurologie absolviert. Zu meinen Aufgaben gehörte das Erstellen von Speiselisten, die Vorbereitung und das Servieren von Mahlzeiten/Getränken, sowie die Unterstützung des Pflegepersonals bei verschiedenen Aufgaben im Arbeitsablauf.`, 
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
