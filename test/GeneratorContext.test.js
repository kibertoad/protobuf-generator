const GeneratorContext = require('../lib/GeneratorContext');
const entitySchema = require('./schemas/entity.schema');
const _ = require('lodash');

describe('GeneratorContext', () => {
  describe('addDefinition', () => {
    it('requires title for definitions', () => {
      const context = new GeneratorContext();

      expect(() => {
        context.addDefinition(
          Object.assign({}, entitySchema, {
            title: undefined
          })
        );
      }).toThrow(/Please add title attribute to this definition/);
    });

    it('requires definitions to be non-contradicting', () => {
      const context = new GeneratorContext();
      context.addDefinition(_.cloneDeep(entitySchema));

      const contradictingSchema = _.cloneDeep(entitySchema);
      contradictingSchema.properties.code.type = 'integer';
      expect(() => {
        context.addDefinition(contradictingSchema);
      }).toThrow(/Contradicting definition/);
    });
  });
});
