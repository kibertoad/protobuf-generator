const entitySchema = require('../schemas/entity.schema');

const EMPTY_PARAM = {
  title: 'Empty'
};

const CODE_PARAM = {
  title: 'Code',
  type: 'object',
  properties: {
    code: {
      type: 'string'
    }
  }
};

const CODES_PARAM = {
  title: 'Codes',
  type: 'object',
  properties: {
    codes: {
      type: 'array',
      items: {
        type: 'string'
      }
    }
  }
};

const DELETE_RESPONSE = {
  title: 'DeleteResponse',
  type: 'object',
  properties: {
    count: {
      type: 'integer'
    }
  }
};

const blueprint = Object.freeze({
  package: 'entity',
  service: {
    name: 'EntityCrud',
    methods: [
      {
        name: 'CreateEntity',
        parameters: entitySchema,
        returns: entitySchema
      },
      {
        name: 'GetEntity',
        parameters: CODE_PARAM,
        returns: entitySchema
      },
      {
        name: 'GetAllEntities',
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
      {
        name: 'UpdateEntity',
        parameters: entitySchema,
        returns: entitySchema
      },
      {
        name: 'DeleteEntity',
        parameters: CODE_PARAM,
        returns: DELETE_RESPONSE
      },
      {
        name: 'DeleteEntities',
        parameters: CODES_PARAM,
        returns: DELETE_RESPONSE
      }
    ]
  }
});

module.exports = blueprint;
