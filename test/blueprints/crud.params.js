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

module.exports = {
  CODE_PARAM,
  CODES_PARAM,
  DELETE_RESPONSE,
  EMPTY_PARAM
};
