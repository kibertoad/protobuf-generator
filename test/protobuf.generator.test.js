const generator = require('../lib/protobuf.generator');
const fileUtils = require('./utils/file.utils');
const crudBlueprint = require('./blueprints/crud.blueprint');

describe('protobuf.generator', () => {
  describe('generate', () => {
    it('happy path', () => {
      const generatedProto = generator.generate(crudBlueprint);

      const expectedProto = fileUtils.loadProto('crud.proto');
      expect(generatedProto).toEqual(expectedProto);
    });
  });
});
