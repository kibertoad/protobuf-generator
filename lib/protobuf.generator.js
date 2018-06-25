const _ = require('lodash');
const GeneratorContext = require('./GeneratorContext');
const jsonSchemaTransformer = require('./json-schema-to-proto.transformer');
const definitionsParser = require('./definitions.finder');

function generate(blueprint) {
  const context = new GeneratorContext();
  context.addRow('syntax = "proto3";');
  context.addRow();
  context.addRow(`package ${blueprint.package};`);
  context.addRow();
  context.addRow(`service ${blueprint.service.name} {`);

  _.forOwn(blueprint.service.methods, (method, methodName) => {
    context.addRow(
      `    rpc ${methodName}(${method.parameters.title}) returns (${method.returns.title});`
    );

    const parameterDefinitions = definitionsParser.parseDefinitions(method.parameters);
    const returnsDefinitions = definitionsParser.parseDefinitions(method.returns);
    parameterDefinitions.forEach(definition => {
      context.addDefinition(definition);
    });
    returnsDefinitions.forEach(definition => {
      context.addDefinition(definition);
    });
  });

  context.addRow(`}`);

  _.values(context.definitions).forEach(definition => {
    const protoMessageFields = jsonSchemaTransformer.transform(definition);

    context.addRow();
    context.addRow(`message ${definition.title} {`);
    protoMessageFields.forEach(field => {
      if (field.enumValues) {
        _outputEnum(context, field.fieldType, field.enumValues);
      }

      const repeatedStr = field.isRepeated ? 'repeated ' : '';
      context.addRow(
        `    ${repeatedStr}${field.fieldType} ${field.fieldName} = ${field.fieldNumber};`
      );
    });
    context.addRow(`}`);
  });

  return context.schemaText;
}

/**
 *
 * @param {GeneratorContext} context
 * @param {string} fieldType
 * @param {string[]} enumValues
 * @private
 */
function _outputEnum(context, fieldType, enumValues) {
  context.addRow(`    enum ${fieldType} {`);
  for (let i = 0; i < enumValues.length; i++) {
    context.addRow(`        ${enumValues[i]} = ${i};`);
  }
  context.addRow(`    }`);
}

module.exports = {
  generate
};
