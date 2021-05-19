const CopyService = require('./copy-service.js');

const collectorService = new CopyService('output_root');
collectorService.copyFiles('input_root');
