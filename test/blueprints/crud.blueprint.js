const entitySchema = require('../schemas/entity.schema');
const { CODE_PARAM, CODES_PARAM, DELETE_RESPONSE, EMPTY_PARAM } = require('./crud.params');

const blueprint = Object.freeze({
  package: 'entity',
  service: {
    name: 'EntityCrud',
    methods: {
      CreateEntity: {
        parameters: entitySchema,
        returns: entitySchema
      },
      GetEntity: {
        parameters: CODE_PARAM,
        returns: entitySchema
      },
      GetAllEntities: {
        parameters: EMPTY_PARAM,
        returns: {
          title: 'EntitiesResponse',
          type: 'object',
          properties: {
            entities: {
              type: 'array',
              items: entitySchema
            }
          }
        }
      },
      UpdateEntity: {
        parameters: entitySchema,
        returns: entitySchema
      },
      DeleteEntity: {
        parameters: CODE_PARAM,
        returns: DELETE_RESPONSE
      },
      DeleteEntities: {
        parameters: CODES_PARAM,
        returns: DELETE_RESPONSE
      }
    }
  }
});

module.exports = blueprint;
