const { Assertion } = require('chai');
const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {

    test('convertHandler should correctly read a whole number input.', () => {
        assert.equal(1, convertHandler.getNum('1'));
        assert.equal(-1, convertHandler.getNum('-1'));
        assert.equal(0, convertHandler.getNum('0'));
    });

    test('convertHandler should correctly read a decimal number input.', () => {
        assert.equal(1.0, convertHandler.getNum('1.0'));
        assert.equal(-1.0, convertHandler.getNum('-1.0'));
        assert.equal(0.0, convertHandler.getNum('0.0'));
    });

    test('convertHandler should correctly read a fractional input.', () => {
        assert.equal(1 / 3, convertHandler.getNum('1 / 3'));
        assert.equal(5 / 7, convertHandler.getNum('5 / 7'));
        assert.equal(-15.4 / 2, convertHandler.getNum('-15.4 / 2'));
    });

    test('convertHandler should correctly read a fractional input with a decimal.', () => {
        assert.equal(5.4 / 3, convertHandler.getNum('5.4 / 3'));
        assert.equal(17.2 / 34.32, convertHandler.getNum('17.2 / 34.32'));
        assert.equal(-323.5 / 0.001, convertHandler.getNum('-323.5 / 0.001'));
    });

    test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', () => {
        try {
            assert.throws(convertHandler.getNum('15.4 / 2 / 3'), 'You should not use double-fraction');
        } catch (ignored) { }
    });

    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', () => {
        assert.equal(1, convertHandler.getNum(''));
    });

    test('convertHandler should correctly read each valid input unit.', () => {
        assert.equal('gal', convertHandler.getUnit('gal'));
        assert.equal('L', convertHandler.getUnit('L'));
        assert.equal('mi', convertHandler.getUnit('mi'));
        assert.equal('km', convertHandler.getUnit('km'));
        assert.equal('lbs', convertHandler.getUnit('lbs'));
        assert.equal('kg', convertHandler.getUnit('kg'));
    });

    test('convertHandler should correctly return an error for an invalid input unit.', () => {
        try {
            assert.throws(convertHandler.getUnit('pounds'), 'invalid unit')
        } catch (ignored) { }
        try {
            assert.throws(convertHandler.getUnit('asdfasdf'), 'invalid unit')
        } catch (ignored) { }
        try {
            assert.throws(convertHandler.getUnit('sm'), 'invalid unit')
        } catch (ignored) { }
    });

    test('convertHandler should return the correct return unit for each valid input unit.', () => {
        assert.equal('L', convertHandler.getReturnUnit('gal'));
        assert.equal('gal', convertHandler.getReturnUnit('L'));
        assert.equal('km', convertHandler.getReturnUnit('mi'));
        assert.equal('mi', convertHandler.getReturnUnit('km'));
        assert.equal('kg', convertHandler.getReturnUnit('lbs'));
        assert.equal('lbs', convertHandler.getReturnUnit('kg'));
    });

    test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', () => {
        assert.equal('gallons', convertHandler.spellOutUnit('gal'));
        assert.equal('liters', convertHandler.spellOutUnit('L'));
        assert.equal('miles', convertHandler.spellOutUnit('mi'));
        assert.equal('kilometers', convertHandler.spellOutUnit('km'));
        assert.equal('pounds', convertHandler.spellOutUnit('lbs'));
        assert.equal('kilograms', convertHandler.spellOutUnit('kg'));
    });

    test('convertHandler should correctly convert gal to L.', () => {
        const galToL = 3.78541;
        assert.equal(parseFloat((1 * galToL).toFixed(5)), convertHandler.convert(1, 'gal'));
        assert.equal(parseFloat((2 * galToL).toFixed(5)), convertHandler.convert(2, 'gal'));
        assert.equal(parseFloat((15.4 * galToL).toFixed(5)), convertHandler.convert(15.4, 'gal'));
    });

    test('convertHandler should correctly convert L to gal.', () => {
        const galToL = 3.78541;
        assert.equal(parseFloat((1 / galToL).toFixed(5)), convertHandler.convert(1, 'L'));
        assert.equal(parseFloat((2 / galToL).toFixed(5)), convertHandler.convert(2, 'L'));
        assert.equal(parseFloat((15.4 / galToL).toFixed(5)), convertHandler.convert(15.4, 'L'));
    });

    test('convertHandler should correctly convert mi to km.', () => {
        const miToKm = 1.60934;
        assert.equal(parseFloat((1 * miToKm).toFixed(5)), convertHandler.convert(1, 'mi'));
        assert.equal(parseFloat((2 * miToKm).toFixed(5)), convertHandler.convert(2, 'mi'));
        assert.equal(parseFloat((15.4 * miToKm).toFixed(5)), convertHandler.convert(15.4, 'mi'));
    });

    test('convertHandler should correctly convert km to mi.', () => {
        const miToKm = 1.60934;
        assert.equal(parseFloat((1 / miToKm).toFixed(5)), convertHandler.convert(1, 'km'));
        assert.equal(parseFloat((2 / miToKm).toFixed(5)), convertHandler.convert(2, 'km'));
        assert.equal(parseFloat((15.4 / miToKm).toFixed(5)), convertHandler.convert(15.4, 'km'));
    })

    test('convertHandler should correctly convert lbs to kg.', () => {
        const lbsToKg = 0.453592;
        assert.equal(parseFloat((1 * lbsToKg).toFixed(5)), convertHandler.convert(1, 'lbs'));
        assert.equal(parseFloat((2 * lbsToKg).toFixed(5)), convertHandler.convert(2, 'lbs'));
        assert.equal(parseFloat((15.4 * lbsToKg).toFixed(5)), convertHandler.convert(15.4, 'lbs'));
    });

    test('convertHandler should correctly convert kg to lbs.', () => {
        const lbsToKg = 0.453592;
        assert.equal(parseFloat((1 / lbsToKg).toFixed(5)), convertHandler.convert(1, 'kg'));
        assert.equal(parseFloat((2 / lbsToKg).toFixed(5)), convertHandler.convert(2, 'kg'));
        assert.equal(parseFloat((15.4 / lbsToKg).toFixed(5)), convertHandler.convert(15.4, 'kg'));
    });

});