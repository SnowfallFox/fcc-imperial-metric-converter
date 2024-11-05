const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite('Number Tests', function() {
        test('returns whole number', function() {
            assert.typeOf(convertHandler.getNum('10L'), 'number');
            assert.strictEqual(convertHandler.getNum('10L'), 10);
        });
        test('returns decimal number', function() {
            assert.typeOf(convertHandler.getNum('10.5L'), 'number');
            assert.strictEqual(convertHandler.getNum('10.5L'), 10.5);
        })
        test('calculates and returns fraction', function() {
            assert.typeOf(convertHandler.getNum('10/2L'), 'number');
            assert.strictEqual(convertHandler.getNum('10/2L'), 5);
        })
        test('calculates and returns decimal and fraction', function() {
            assert.typeOf(convertHandler.getNum('10.5/3.2L'), 'number');
            assert.strictEqual(convertHandler.getNum('10.5/3.2L'), 3.28125);
        })
        test('"invalid number" error on double fraction', function() {
            assert.typeOf(convertHandler.getNum('3/2/2L'), 'string', 'returns "invalid number"');
            assert.strictEqual(convertHandler.getNum('3/2/2L'), 'invalid number');
        })
        test('default value of 1', function() {
            assert.typeOf(convertHandler.getNum('L'), 'number');
            assert.strictEqual(convertHandler.getNum('L'), 1);
        })
    });
    suite('Measurement Unit Tests', function() {
        test('Correctly reads each valid input unit', function() {
            assert.typeOf(convertHandler.getUnit('gal'), 'string');
            assert.strictEqual(convertHandler.getUnit('gal'), 'gal');
            assert.typeOf(convertHandler.getUnit('L'), 'string');
            assert.strictEqual(convertHandler.getUnit('L'), 'L');
            assert.typeOf(convertHandler.getUnit('mi'), 'string');
            assert.strictEqual(convertHandler.getUnit('mi'), 'mi');
            assert.typeOf(convertHandler.getUnit('km'), 'string');
            assert.strictEqual(convertHandler.getUnit('km'), 'km');
            assert.typeOf(convertHandler.getUnit('lbs'), 'string');
            assert.strictEqual(convertHandler.getUnit('lbs'), 'lbs');
            assert.typeOf(convertHandler.getUnit('kg'), 'string');
            assert.strictEqual(convertHandler.getUnit('kg'), 'kg');
            assert.typeOf(convertHandler.getUnit('10gal'), 'string');
            assert.strictEqual(convertHandler.getUnit('10gal'), 'gal');
            assert.typeOf(convertHandler.getUnit('10L'), 'string');
            assert.strictEqual(convertHandler.getUnit('10L'), 'L');
            assert.typeOf(convertHandler.getUnit('10mi'), 'string');
            assert.strictEqual(convertHandler.getUnit('10mi'), 'mi');
            assert.typeOf(convertHandler.getUnit('10km'), 'string');
            assert.strictEqual(convertHandler.getUnit('10km'), 'km');
            assert.typeOf(convertHandler.getUnit('10lbs'), 'string');
            assert.strictEqual(convertHandler.getUnit('10lbs'), 'lbs');
            assert.typeOf(convertHandler.getUnit('10kg'), 'string');
            assert.strictEqual(convertHandler.getUnit('10kg'), 'kg');
        })
        test('"invalid unit" error for invalid input', function() {
            assert.typeOf(convertHandler.getUnit('g'), 'string')
            assert.strictEqual(convertHandler.getUnit('g'), 'invalid unit')
            assert.typeOf(convertHandler.getUnit('10g'), 'string')
            assert.strictEqual(convertHandler.getUnit('10g'), 'invalid unit')
            assert.typeOf(convertHandler.getUnit('10'), 'string')
            assert.strictEqual(convertHandler.getUnit('10'), 'invalid unit')
        })
        test('correct return unit for each valid input unit', function() {
            assert.typeOf(convertHandler.getReturnUnit('gal'), 'string')
            assert.strictEqual(convertHandler.getReturnUnit('gal'), 'L')
            assert.typeOf(convertHandler.getReturnUnit('L'), 'string')
            assert.strictEqual(convertHandler.getReturnUnit('L'), 'gal')
            assert.typeOf(convertHandler.getReturnUnit('mi'), 'string')
            assert.strictEqual(convertHandler.getReturnUnit('mi'), 'km')
            assert.typeOf(convertHandler.getReturnUnit('km'), 'string')
            assert.strictEqual(convertHandler.getReturnUnit('km'), 'mi')
            assert.typeOf(convertHandler.getReturnUnit('lbs'), 'string')
            assert.strictEqual(convertHandler.getReturnUnit('lbs'), 'kg')
            assert.typeOf(convertHandler.getReturnUnit('kg'), 'string')
            assert.strictEqual(convertHandler.getReturnUnit('kg'), 'lbs')
        })
        test('correct spelled out unit returned for each valid input unit', function() {
            assert.typeOf(convertHandler.spellOutUnit('gal'), 'string')
            assert.strictEqual(convertHandler.spellOutUnit('gal'), 'gallons')
            assert.typeOf(convertHandler.spellOutUnit('L'), 'string')
            assert.strictEqual(convertHandler.spellOutUnit('L'), 'liters')
            assert.typeOf(convertHandler.spellOutUnit('mi'), 'string')
            assert.strictEqual(convertHandler.spellOutUnit('mi'), 'miles')
            assert.typeOf(convertHandler.spellOutUnit('km'), 'string')
            assert.strictEqual(convertHandler.spellOutUnit('km'), 'kilometers')
            assert.typeOf(convertHandler.spellOutUnit('lbs'), 'string')
            assert.strictEqual(convertHandler.spellOutUnit('lbs'), 'pounds')
            assert.typeOf(convertHandler.spellOutUnit('kg'), 'string')
            assert.strictEqual(convertHandler.spellOutUnit('kg'), 'kilograms')
        })
    });
    suite('conversion tests', function() {
        test('gallons correctly converts to liters', function() {
            // test unit conversion
            // test specific number conversions
            assert.equal(convertHandler.convert(1,'gal'), 3.78541)
            assert.equal(convertHandler.convert(2,'gal'), 7.57082)
            assert.equal(convertHandler.convert(3,'gal'), 11.35623)
            assert.equal(convertHandler.convert(10,'gal'), 37.8541)
        })
        test('liters correctly converts to gallons', function() {
            assert.equal(convertHandler.convert(1,'L'), 0.26417)
            assert.equal(convertHandler.convert(2,'L'), 0.52834)
            assert.equal(convertHandler.convert(3,'L'), 0.79252)
            assert.equal(convertHandler.convert(10,'L'), 2.64172)
        })
        test('miles correctly converts to kilometers', function() {
            assert.equal(convertHandler.convert(1,'mi'), 1.60934)
            assert.equal(convertHandler.convert(2,'mi'), 3.21869)
            assert.equal(convertHandler.convert(3,'mi'), 4.82803)
            assert.equal(convertHandler.convert(10,'mi'), 16.09344)
        })
        test('kilometers correctly converts to miles', function() {
            assert.equal(convertHandler.convert(1,'km'), 0.62137)
            assert.equal(convertHandler.convert(2,'km'), 1.24274)
            assert.equal(convertHandler.convert(3,'km'), 1.86411)
            assert.equal(convertHandler.convert(10,'km'), 6.21371)
        })
        test('pounds correctly converts to kilograms', function() {
            assert.equal(convertHandler.convert(1,'lbs'), 0.45359)
            assert.equal(convertHandler.convert(2,'lbs'), 0.90718)
            assert.equal(convertHandler.convert(3,'lbs'), 1.36078)
            assert.equal(convertHandler.convert(10,'lbs'), 4.53592)
        })
        test('kilograms correctly converts to pounds', function() {
            assert.equal(convertHandler.convert(1,'kg'), 2.20462)
            assert.equal(convertHandler.convert(2,'kg'), 4.40925)
            assert.equal(convertHandler.convert(3,'kg'), 6.61387)
            assert.equal(convertHandler.convert(10,'kg'), 22.04623)
        })
    })
});
