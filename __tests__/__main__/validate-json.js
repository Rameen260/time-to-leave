/* eslint-disable no-undef */
'use strict';

const {
    validateJSON
} = require('../../js/validate-json');

describe('Validate json', function()
{
    process.env.NODE_ENV = 'test';
    describe('validateJSON(instance)', function()
    {

        describe('validate type', function()
        {
            const goodFlexibleEntry = [{ 'type': 'flexible', 'date': '2020-06-03', 'values': ['08:00', '12:00', '13:00', '14:00'] }];
            const goodWaivedEntry = [{ 'type': 'waived', 'date': '2020-06-03', 'data': 'waived', 'hours': '08:00' }];
            const invalidType = [{ 'type': 'not valid type', 'date': '2020-06-03', 'values': ['08:00', '12:00', '13:00', '14:00'] }];
            test('should be valid JSON', () =>
            {
                expect(validateJSON(goodWaivedEntry)).toBeTruthy();
                expect(validateJSON(goodFlexibleEntry)).toBeTruthy();
            });
            test('should not be valid JSON', () =>
            {
                expect(validateJSON(invalidType)).not.toBeTruthy();
            });
        });

        describe('validate date', function()
        {
            const goodFlexibleEntry = [{ 'type': 'flexible', 'date': '2020-06-03', 'values': ['08:00', '12:00', '13:00', '14:00'] }];
            const goodWaivedEntry = [{ 'type': 'waived', 'date': '2020-06-03', 'data': 'waived', 'hours': '08:00' }];
            const invalidDateFormat = [{ 'type': 'flexible', 'date': '03-06-2020', 'values': ['08:00', '12:00', '13:00', '14:00'] }];
            const invalidDateType = [{ 'type': 'flexible', 'date': ['2020-06-13'], 'values': ['08:00', '12:00', '13:00', '14:00'] }];
            const invalidDateValue = [{ 'type': 'flexible', 'date': '2020-26-03', 'values': ['08:00', '12:00', '13:00', '14:00'] }];
            const invalidDayInMonth = [{ 'type': 'flexible', 'date': '2020-04-31', 'values': ['08:00', '12:00', '13:00', '14:00'] }];
            test('should be valid JSON', () =>
            {
                expect(validateJSON(goodWaivedEntry)).toBeTruthy();
                expect(validateJSON(goodFlexibleEntry)).toBeTruthy();
            });
            test('should not be valid JSON', () =>
            {
                expect(validateJSON(invalidDateFormat)).not.toBeTruthy();
                expect(validateJSON(invalidDateType)).not.toBeTruthy();
                expect(validateJSON(invalidDateValue)).not.toBeTruthy();
                expect(validateJSON(invalidDayInMonth)).not.toBeTruthy();
            });
        });

        describe('validate data', function()
        {
            const goodWaivedEntry = [{ 'type': 'waived', 'date': '2020-06-03', 'data': 'waived', 'hours': '08:00' }];
            const invalidDataType = [{ 'type': 'waived', 'date': '2020-06-03', 'data': ['waived'], 'hours': '08:00' }];
            test('should be valid JSON', () =>
            {
                expect(validateJSON(goodWaivedEntry)).toBeTruthy();
            });
            test('should not be valid JSON', () =>
            {
                expect(validateJSON(invalidDataType)).not.toBeTruthy();
            });
        });

        describe('validate hours', function()
        {
            const goodWaivedEntry = [{ 'type': 'waived', 'date': '2020-06-03', 'data': 'waived', 'hours': '08:00' }];
            const goodWaivedEntry2 = [{ 'type': 'waived', 'date': '2020-06-03', 'data': 'waived', 'hours': '--:--' }];
            const invalidHoursFormat = [{ 'type': 'waived', 'date': '2020-06-03', 'data': 'waived', 'hours': '08-00' }];
            const invalidHoursType = [{ 'type': 'waived', 'date': '2020-06-03', 'data': 'waived', 'hours': 8 }];
            const invalidHoursValue = [{ 'type': 'waived', 'date': '2020-06-03', 'data': 'waived', 'hours': '30:00' }];
            const invalidHoursValueNegative = [{ 'type': 'waived', 'date': '2020-06-03', 'data': 'waived', 'hours': '-01:00' }];
            test('should be valid JSON', () =>
            {
                expect(validateJSON(goodWaivedEntry)).toBeTruthy();
                expect(validateJSON(goodWaivedEntry2)).toBeTruthy();
            });
            test('should not be valid JSON', () =>
            {
                expect(validateJSON(invalidHoursFormat)).not.toBeTruthy();
                expect(validateJSON(invalidHoursType)).not.toBeTruthy();
                expect(validateJSON(invalidHoursValue)).not.toBeTruthy();
                expect(validateJSON(invalidHoursValueNegative)).not.toBeTruthy();
            });
        });

        describe('validate values', function()
        {
            const goodFlexibleEntry = [{ 'type': 'flexible', 'date': '2020-06-03', 'values': ['08:00', '12:00', '13:00', '14:00'] }];
            const invalidValuesFormat1 = [{ 'type': 'flexible', 'date': '03-06-2020', 'values': ['0800', '12:00', '13:00', '14:00'] }];
            const invalidValuesFormat2 = [{ 'type': 'flexible', 'date': '03-06-2020', 'values': ['08', '12:00', '13:00', '14:00'] }];
            const invalidValuesFormat3 = [{ 'type': 'flexible', 'date': '03-06-2020', 'values': [8, '12:00', '13:00', '14:00'] }];
            const invalidValuesFormat4 = [{ 'type': 'flexible', 'date': '03-06-2020', 'values': ['08-00', '12:00', '13:00', '14:00'] }];
            const invalidValuesType = [{ 'type': 'flexible', 'date': ['2020-06-03'], 'values': '08:00'}];
            const invalidValuesValue = [{ 'type': 'flexible', 'date': '2020-26-03', 'values': ['80:00', '12:00', '13:00', '14:00'] }];
            // TODO
            //const invalidPointsInTime = [{ 'type': 'flexible', 'date': '2020-02-31', 'values': ['08:00', '07:00', '13:00', '14:00'] }];
            test('should be valid JSON', () =>
            {
                expect(validateJSON(goodFlexibleEntry)).toBeTruthy();
            });
            test('should not be valid JSON', () =>
            {
                expect(validateJSON(invalidValuesFormat1)).not.toBeTruthy();
                expect(validateJSON(invalidValuesFormat2)).not.toBeTruthy();
                expect(validateJSON(invalidValuesFormat3)).not.toBeTruthy();
                expect(validateJSON(invalidValuesFormat4)).not.toBeTruthy();
                expect(validateJSON(invalidValuesType)).not.toBeTruthy();
                expect(validateJSON(invalidValuesValue)).not.toBeTruthy();
                //expect(validateJSON(invalidPointsInTime)).not.toBeTruthy();
            });
        });


        const goodFlexibleEntry = [{ 'type': 'flexible', 'date': '2020-06-03', 'values': ['08:00', '12:00', '13:00', '14:00'] }];
        const goodWaivedEntry = [{ 'type': 'waived', 'date': '2020-06-03', 'data': 'waived', 'hours': '08:00' }];
        const badFlexibleEntry = [{ 'type': 'flex', 'date': '2020-06-03', 'values': ['not-an-hour'] }];
        const badFlexibleEntry2 = [{ 'type': 'flexible', 'date': '2020-06-03', 'values': 'not-an-array' }];
        const badWaivedEntry = [{ 'type': 'waived', 'date': '2020-06-03', 'data': 'day-begin', 'hours': 'not-an-hour' }];
        test('should be valid', () =>
        {
            expect(validateJSON(goodWaivedEntry)).toBeTruthy();
            expect(validateJSON(goodFlexibleEntry)).toBeTruthy();
            expect(validateJSON(badFlexibleEntry)).not.toBeTruthy();
            expect(validateJSON(badFlexibleEntry2)).not.toBeTruthy();
            expect(validateJSON(badWaivedEntry)).not.toBeTruthy();
        });
    });
});
