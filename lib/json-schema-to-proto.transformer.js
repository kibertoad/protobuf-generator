const _ = require('lodash');

const TYPE_MAP = Object.freeze({
  string: 'string',
  boolean: 'bool',
  number: 'float',
  integer: 'int64'
});

function transform(jsonSchema) {
  return _.transform(
    jsonSchema.properties,
    (result, attrValue, attrKey) => {
      const attrCounter = result.length;
      result.push(transformAttribute(attrValue, attrKey, attrCounter, jsonSchema));
      return result;
    },
    []
  );
}

function transformAttribute(attributeValue, attributeKey, attrCounter, jsonSchema) {
  let attrType;
  if (Array.isArray(attributeValue.type)) {
    [attrType] = attributeValue.type;
  } else {
    attrType = attributeValue.type;
  }

  // It is recommended to use Unix time encoded into a int64 for date/time information
  if (attributeValue.format === 'date-time') {
    attrType = 'integer';
  }

  const fieldType = TYPE_MAP[attrType];
  const fieldNumber = attrCounter + 1;

  return {
    fieldType,
    fieldName: attributeKey,
    fieldNumber
  };
}

module.exports = {
  transform
};
