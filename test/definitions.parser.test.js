const parser = require('../lib/definitions.parser');
const entitySchema = require('./schemas/entity.schema');

describe('definitions.parser', () => {
  describe('parseDefinitions', () => {
    it('parses arrays for definitions', () => {
      const parsedDefinitions = parser.parseDefinitions({
        type: 'array',
        items: entitySchema
      });

      expect(parsedDefinitions).toEqual([entitySchema]);
    });
  });
});
