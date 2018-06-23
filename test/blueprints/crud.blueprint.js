const entitySchema = require('../schemas/entity.schema');

const blueprint = Object.freeze({
  package: 'entity',
  service: {
    name: 'EntityCrud',
    methods: [
      {
        name: 'CreateEntity',
        parameters: entitySchema,
        returns: entitySchema
      }
    ]
  }
});

module.exports = blueprint;
