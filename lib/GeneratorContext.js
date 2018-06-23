const _ = require('lodash');

class GeneratorContext {
  constructor() {
    this.schemaText = '';
    this.definitions = {};
  }

  addRow(row = '') {
    this.schemaText += row + '\n';
  }

  addDefinition(definition) {
    if (!definition.title) {
      throw new Error(
        'Please add title attribute to this definition: ' + JSON.stringify(definition)
      );
    }

    const existingDefinition = this.definitions[definition.title];

    if (existingDefinition && !_.isEqual(existingDefinition, definition)) {
      throw new Error(
        `Contradicting definition for ${existingDefinition} found, please ensure them to be identical`
      );
    }

    if (!existingDefinition) {
      this.definitions[definition.title] = definition;
    }
  }
}

module.exports = GeneratorContext;
