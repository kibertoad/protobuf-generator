const GeneratorContext = require('./GeneratorContext');
const jsonSchemaTransformer = require('./json-schema-to-proto.transformer');
const definitionsParser = require('./definitions.parser');

function generate(blueprint) {
  const context = new GeneratorContext();
  context.addRow('syntax = "proto3";');
  context.addRow();
  context.addRow(`package ${blueprint.package};`);
  context.addRow();
  context.addRow(`service ${blueprint.service.name} {`);

  blueprint.service.methods.forEach(method => {
    context.addRow(
      `    rpc ${method.name}(${method.parameters.title}) returns (${method.returns.title});`
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

  Object.values(context.definitions).forEach(definition => {
    const protoMessageFields = jsonSchemaTransformer.transform(definition);

    context.addRow();
    context.addRow(`message ${definition.title} {`);
    protoMessageFields.forEach(field => {
      const repeatedStr = field.isRepeated ? 'repeated ' : '';
      context.addRow(
        `    ${repeatedStr}${field.fieldType} ${field.fieldName} = ${field.fieldNumber};`
      );
    });
    context.addRow(`}`);
  });

  return context.schemaText;
}

module.exports = {
  generate
};
