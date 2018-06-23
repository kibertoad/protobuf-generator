const _ = require('lodash');

const TYPE_MAP = Object.freeze({
  string: 'string',
  boolean: 'bool',
  number: 'float',
  integer: 'int32'
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

function _resolveType(attributeValue) {
  let attrType;
  if (Array.isArray(attributeValue.type)) {
    [attrType] = attributeValue.type;
  } else {
    attrType = attributeValue.type;
  }

  let fieldType;
  // It is recommended to use Unix time encoded into a int64 for date/time information
  if (attributeValue.format === 'date-time') {
    fieldType = 'int64';
  }
  if (!fieldType) {
    fieldType = TYPE_MAP[attrType];
  }

  return fieldType;
}

function _resolveArrayElementType(arrayAttribute) {
  // If this is an array of entities, look no further
  if (arrayAttribute.items.title) {
    return arrayAttribute.items.title;
  }

  // Return primitive type
  return _resolveType(arrayAttribute.items);
}

function transformAttribute(attributeValue, attributeKey, attrCounter, jsonSchema) {
  const isRepeated = attributeValue.type === 'array';
  let fieldType = isRepeated
    ? _resolveArrayElementType(attributeValue)
    : _resolveType(attributeValue);

  const fieldNumber = attrCounter + 1;
  const enumValues = attributeValue.enum;

  if (enumValues) {
    fieldType = _.capitalize(attributeKey);
  }

  return {
    isRepeated,
    fieldType,
    fieldName: attributeKey,
    fieldNumber,
    enumValues
  };
}

module.exports = {
  transform
};
