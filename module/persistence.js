const { builtinModules } = require("module");

var abstimmungen = [];
var termine = [];
var valideOptionen = [ "ja", "nein", "vielleicht" ];
var id = 0;

// Funktionen
const generateCode = () =>
    Array(6)
    .fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz")
    .map((x) => x[Math.floor(Math.random() * x.length)])
    .join("");

function getAbstimmungZuTCode(tcode) {
    return abstimmungen.find(abs => abs.tcode === tcode);
}

function getAbstimmungZuACode(acode) {
    return abstimmungen.find(abs => abs.acode === acode);
}



// Konstruktoren der Objekte
function abstimmung(data) {
    this.name = data.name || null;
    this.beschreibung = data.beschreibung || null;
    this.acode = generateCode();
    this.tcode = generateCode();
    
    this.termine = new Array(data.termine) || new Array();

    this.addTermin = function(termin) {
        // Überprüfung ob die 3 Daten jeweils existieren, Optimalfall überall false
        let tDatum = termine.includes(termin.datum);
        let sUhrzeit = termine.includes(termin.start);
        let eUhrzeit = termine.includes(termin.ende);

        // Der Termin soll *nicht* angelegt werden wenn alle 3 gleich sind, sprich sobald eins true ist, wird der Termin erstellt.
        if(!tDatum || !sUhrzeit || !eUhrzeit) {
            this.termine.push(termin);
        } else {
            return;
        }
    }

    abstimmungen.push(this);
}

function termin(data) {
    this.id = id++;
    this.datum = data.datum || null;
    this.start = data.start || null;
    this.ende = data.ende || null;

    this.stimmen = new Array(data.stimmen) || new Array();

    this.addStimme = function(stimme) {
        this.stimmen.push(stimme);
    }

    termine.push(this);
}

function stimme(data) {
    this.istValideOption = function(option) {
        // Das toLowerCase habe ich benutzt um jegliche Optionen ob es jetzt "Ja", "JA", "ja" oder auch "jA" sein sollte einzubinden
        return valideOptionen.includes(option.toLowerCase());
    }

    this.name = data.name || null;
    if (this.istValideOption(data.option)) {
        this.option = data.option;
    } else {
        throw new Error("Keine valide Option, Stimme ungueltig!");
    }
}


// Initialer Datenbestand
const abstimmung1 = new abstimmung({
    name: 'Beispielabstimmung',
    beschreibung: 'Dies ist eine Beispielabstimmung',
    acode: generateCode(),
    tode: generateCode(),
    termine: [
        new termin({
            id: 1,
            datum: "2022-03-09",
            start: "08:00",
            ende: "18:00",
            stimmen: [
                new stimme({
                    name: "Anna",
                    option: "ja"
                }),
                new stimme({
                    name: "Dennis",
                    option: "Nein"
                }),
                new stimme({
                    name: "Tim",
                    option: "JA"
                })
            ]
        }),
        new termin({
            id: 1,
            datum: "2022-03-11",
            start: "08:00",
            ende: "18:00",
            stimmen: [
                new stimme({
                    name: "Dustin",
                    option: "nein"
                }),
                new stimme({
                    name: "Franz",
                    option: "Nein"
                }),
                new stimme({
                    name: "Jacqueline",
                    option: "Ja"
                })
            ]
        }),
        new termin({
            id: 1,
            datum: "2022-03-14",
            start: "08:00",
            ende: "18:00",
            stimmen: [
                new stimme({
                    name: "Dieter",
                    option: "ja"
                }),
                new stimme({
                    name: "Detlef",
                    option: "Ja"
                }),
                new stimme({
                    name: "Tina",
                    option: "JA"
                })
            ]
        })
    ]
})


module.exports = {
    getAbstimmungZuTCode,
    getAbstimmungZuACode,
    generateCode,

    abstimmungen,
    termine,
    abstimmung,
    termin,
    stimme
}