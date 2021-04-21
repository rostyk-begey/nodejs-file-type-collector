import CollectorService from './services/collector.service.js';
import CopyService from './services/copy.service.js';
import CopyVideoFilesHandler from './copy-handlers/copy-video-files.handler.js';
import CopyAudioFilesHandler from './copy-handlers/copy-audio-files.handler.js';
import CopyPhotoFilesHandler from './copy-handlers/copy-photo-files.handler.js';
import CopyOtherFilesHandler from './copy-handlers/copy-other-files.handler.js';

(() => {
  const copyService = new CopyService([
    new CopyVideoFilesHandler(),
    new CopyAudioFilesHandler(),
  ]);
  copyService.addHandler(new CopyPhotoFilesHandler());
  copyService.addHandler(new CopyOtherFilesHandler());
  const collectorService = new CollectorService('output_root', copyService);

  collectorService.run('input_root');
})();
