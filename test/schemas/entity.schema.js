const _ = require('lodash');
const Status = require('./status.enum');

const entitySchema = {
  title: 'Entity',
  type: 'object',
  properties: {
    code: {
      type: 'string'
    },
    name: {
      type: ['string', 'null']
    },
    isActive: {
      description: 'Is entity currently active?',
      default: true,
      type: 'boolean'
    },
    status: {
      type: 'string',
      enum: _.values(Status)
    },
    createdAt: {
      type: 'string',
      format: 'date-time'
    }
  },
  required: ['code']
};

module.exports = entitySchema;
