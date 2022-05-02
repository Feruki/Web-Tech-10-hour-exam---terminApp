const express = require('express');
const router = express.Router();
const { abstimmungen, abstimmung, termin, getAbstimmungZuACode, getAbstimmungZuTCode, stimme } = require('../module/persistence');

router.post('/postAbstimmung', (req, res) => {
    const neuAbs = new abstimmung({
        name: req.body.absName,
        beschreibung: req.body.absDesc,        
    });
    for (let i = 0; i < req.body.anzahl; i++) {
        neuAbs.addTermin(new termin({
            datum: req.body[`datum${i+1}`],
            start: req.body[`start${i+1}`],
            ende: req.body[`ende${i+1}`]
        }))
    };

    res.write('Neue Abstimmung erfolgreich angelegt!\nBitte folgende Codes merken:\nAdministratorcode: '+neuAbs.acode+'\nTeilnehmercode: '+neuAbs.tcode);
    res.end();
});

router.post('/postTeilnehmer', (req, res) => {
    res.render('abstimmung', { abstimmung: getAbstimmungZuTCode(req.body.tcode) });
})

router.post('/postAdmin', (req, res) => {
    res.render('abstimmungAnsicht', { abstimmung: getAbstimmungZuACode(req.body.acode) });
})

router.post('/postTermin', (req, res) => {
    let absTermin = abstimmungen.find(abs => {
        return req.body.abstimmung == abs.name;
    })
    for(let i = 1; i < req.body.terminAnzahl; i++) {
        absTermin.termine[i].addStimme(new stimme({
            name: req.body.tName,
            option: req.body[`termin${i}`]
        }))
    }
    res.render('start');
})

module.exports = router;