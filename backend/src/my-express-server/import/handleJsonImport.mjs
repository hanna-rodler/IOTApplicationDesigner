import Dialog from '../classes/Dialog.mjs';
import MappingLevel from '../classes/MappingLevel.mjs';

export function parseJsonImportFile(file) {
    const jsonFile = JSON.parse(file);
    // console.log('file content ', jsonFile);

    const dialog = new Dialog(jsonFile.discover_prefix, jsonFile.connection);
    // dialog can be sent to DB 1:1;

    const mapping = new MappingLevel(jsonFile.mapping.plugins, jsonFile.mapping.topic_level);
    mapping.parseTopicLevels();
    const edges = mapping.edges;
    // console.log('edges ', edges);
    const mappings = mapping.mappings;
    // console.log('mappings', mappings);
}