'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req,res) => {
    let input = req.query.input;
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      res.json('invalid number and unit')
    } else if (initNum === 'invalid number') {
      res.json('invalid number')
    } else if (initUnit === 'invalid unit') {
      res.json('invalid unit')
    }
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let spellOut = convertHandler.spellOutUnit(initUnit);
    let returnNum = convertHandler.convert(initNum,initUnit)
    let returnString = convertHandler.getString(initNum, spellOut, returnNum, returnUnit);
    let finalString = `${initNum} ${spellOut} converts to ${returnNum} ${returnString}`
    let json = {'initNum':Number(initNum), 'initUnit':initUnit, 'returnNum':Number(returnNum), 'returnUnit':returnUnit, 'string':finalString}
    res.json(json);
  });
};
