function parseDefinitions(jsonSchema, definitions = []) {
  if (jsonSchema.type === 'object' || jsonSchema.title) {
    definitions.push(jsonSchema);

    if (jsonSchema.properties) {
      parseDefinitions(jsonSchema.properties, definitions);
    }
  }

  if (jsonSchema.items) {
    parseDefinitions(jsonSchema.items, definitions);
  }

  return definitions;
}

module.exports = {
  parseDefinitions
};
