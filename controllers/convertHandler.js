function ConvertHandler() {
  
  this.getNum = function(input) {
    const numRegex = /^(\d+)(\.?\d+)?(\/)?(\d+)?(\.)?(\d+)?(\/)?(\d+)?/gi;
    let match = 0
    let nums = []

    // if no number entered, default to 1
    if (!input.match(numRegex)) {
      match = 1
    // if fraction entered, check and perform division
    } else if (input.match(numRegex)[0].includes('/')) {
      // if double-fraction or more occuring, return invalid
      if (input.match(/\//g).length > 1) {
        return 'invalid number'
      }
      nums = input.match(numRegex)[0].split('/')
      match = nums[0] / nums[1]
    // if number entered with no additional requirements
    } else {
      match = input.match(numRegex)[0]
    }
    // if trailing '.' etc left in number string, it is removed
    // if (isNaN(match[match.length-1])) {
    //   console.log(match)
    //   match = match - match.length[-1]
    //   console.log(match)
    // }

    if (Number(match)) {
      return Number(match)
    } else {
      return 'invalid number'
    } 
  };
  
  this.getUnit = function(input) {
    const unitRegex = /([a-zA-Z]+)$/gi;
    let match = input.match(unitRegex)

    if (!match) {
      return 'invalid unit'
    }
    // L symbol should be capitalised, the rest in lower case
    if (match[0] == 'l' || match[0] == 'L') {
      match = match[0].toUpperCase()
    } else {
      match = match[0].toLowerCase()
    }

    // WEIRDLY for this project, typing out the full unit should
      // come back invalid?? only the short symbol works ^^;
    if (match == 'gal' || match == 'L' || match == 'km' || match == 'mi' || match == 'lbs' || match == 'kg') {
      return match
    } else {
      return 'invalid unit'
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    // gal <-> L
    // lbs <-> kg
    // mi <-> km

    switch (initUnit) {
      case 'gal':
        return 'L';
      case 'L':
        return 'gal';
      case 'mi':
        return 'km';
      case 'km':
        return 'mi';
      case 'lbs':
        return 'kg';
      case 'kg':
        return 'lbs';
      default:
        return 'invalid unit';
    }
  };

  this.spellOutUnit = function(unit) {
    const units = {
      'gal':'gallons',
      'L':'liters',
      'mi':'miles',
      'km':'kilometers',
      'lbs':'pounds',
      'kg':'kilograms'
    };

    return units[unit]

  };
  
  this.convert = function(initNum, initUnit) {
    // half expecting these numbers to cause errors bc of BS tests lol
    // I KNEW IT
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    switch (initNum,initUnit) {
      case initUnit = 'gal':
        let gal = parseFloat((initNum * galToL));
        return Number(gal.toFixed(5))
      case initUnit = 'L':
        let L = parseFloat((initNum / galToL));
        return Number(L.toFixed(5))
      case initUnit = 'lbs':
        let lbs = parseFloat((initNum * lbsToKg));
        return Number(lbs.toFixed(5))
      case initUnit = 'kg':
        let kg = parseFloat((initNum / lbsToKg));
        return Number(kg.toFixed(5))
      case initUnit = 'mi':
        let mi = parseFloat((initNum * miToKm));
        return Number(mi.toFixed(5))
      case initUnit = 'km':
        let km = parseFloat((initNum / miToKm));
        return Number(km.toFixed(5))
    };
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let returnUnitString = ''

    switch (returnUnit) {
      case 'L':
        returnUnitString = 'liters';
        break;
      case 'gal':
        returnUnitString = 'gallons';
        break;
      case 'km':
        returnUnitString = 'kilometers';
        break;
      case 'mi':
        returnUnitString = 'miles';
        break;
      case 'lbs':
        returnUnitString = 'pounds';
        break;
      case 'kg':
        returnUnitString = 'kilograms';
        break;
    };
    
    // return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnitString}`
    return returnUnitString;
  };
  
}

module.exports = ConvertHandler;
