function ConvertHandler() {

  this.getNum = function (input) {
    if (input.split('/').length - 1 == 2) {
      return 'invalid number';
    }
    return eval(input.replace(/[a-zA-Z]/g, '') || 1);
  };

  this.getUnit = function (input) {
    const result = input.replace(/[^a-zA-Z]/g, '').toLowerCase();
    if (['gal', 'l', 'mi', 'km', 'lbs', 'kg'].includes(result)) {
      if (result == 'l') {
        return 'L';
      }
      return result;
    }
    return 'invalid unit';
  };

  this.getReturnUnit = function (initUnit) {
    switch (initUnit) {
      case 'gal': return 'L';
      case 'L': return 'gal';
      case 'mi': return 'km';
      case 'km': return 'mi';
      case 'lbs': return 'kg';
      case 'kg': return 'lbs';
    }
  };

  this.spellOutUnit = function (unit) {
    switch (unit) {
      case 'gal': return 'gallons';
      case 'L': return 'liters';
      case 'mi': return 'miles';
      case 'km': return 'kilometers';
      case 'lbs': return 'pounds';
      case 'kg': return 'kilograms';
    }
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    switch (initUnit) {
      case 'gal': return parseFloat((initNum * galToL).toFixed(5));
      case 'L': return parseFloat((initNum / galToL).toFixed(5));
      case 'mi': return parseFloat((initNum * miToKm).toFixed(5));
      case 'km': return parseFloat((initNum / miToKm).toFixed(5));
      case 'lbs': return parseFloat((initNum * lbsToKg).toFixed(5));
      case 'kg': return parseFloat((initNum / lbsToKg).toFixed(5));
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };

}

module.exports = ConvertHandler;
