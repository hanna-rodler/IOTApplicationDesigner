import path from 'path';
import { fileURLToPath } from 'url';
import {getFileName} from './utils/utils.mjs';
import {getStaticTestTopics, getValueTestTopics, getDialog, getValueEdges, getValueMappings, getStaticEdges, getStaticMappings, getStaticAndValueTopics, getStaticAndValueEdges, getStaticAndValueMappings, getJsonTestTopics, getJsonEdges, getJsonMappings, getAllTestTopics, getAllTestEdges, getAllTestMappings, getImportDialog, getImportTopics, getImportMappings, getImportEdges} from './utils/testData.mjs';
import {renderMappingsToJson} from './utils/nodeMapping.mjs';
import fs from 'fs';
import Dialog from './classes/Dialog.mjs';
import MappingLevel from './classes/MappingLevel.mjs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FILE_PREFIX = path.join(__dirname, 'mqttFiles');

export const exportToJson = async (req, res) => {
        // TODO: get data from DB
        //const dialog = getDialog();

        // STATIC
        // const topics = getStaticTestTopics();
        // const edges = getStaticEdges();
        // const mappings = getStaticMappings();

        // VALUE
        // const topics = getValueTestTopics();
        // const edges = getValueEdges();
        // const mappings = getValueMappings();

        // JSON
        // const topics = getJsonTestTopics();
        // const edges = getJsonEdges();
        // const mappings = getJsonMappings();
        
        // VALUE AND STATIC
        // const topics = getStaticAndValueTopics();
        // const edges = getStaticAndValueEdges();
        // const mappings = getStaticAndValueMappings();

        // ALL TEST TOPICS
        // const topics = getAllTestTopics();
        // const edges = getAllTestEdges();
        // const mappings = getAllTestMappings();

        // TEST IMPORT
        const dialog = getImportDialog();
        const topics = getImportTopics();
        const edges = getImportEdges();
        const mappings = getImportMappings();

        let mqttJson = dialog;
        mqttJson.mapping = {}
    
        // console.log('mqtt json ', mqttJson);
    
        if(topics && edges && mappings){
            mqttJson.mapping.topic_levels = await renderMappingsToJson(topics, edges, mappings);
            const fileName = getFileName(dialog.discover_prefix);
        
            fs.writeFile(path.join(FILE_PREFIX, fileName), JSON.stringify(mqttJson, null, 2), (err) => {
                if (err) {
                    console.log('error writing file: ' + err);
                    return res.status(500).json({ message: 'Failed to write file', error: err });
                }
                console.log('Successfully wrote file');
                res.status(200).json({ message: 'File written successfully' });
            });
        } else {
            res.status(500).json({message: 'topics, edges or mappings are empty'});
        }
}

export const importFromJson = async(req, res) => {
    // TODO: implement import JSON.

    const fileName = 'mapfile.json';
    fs.readFile(path.join(FILE_PREFIX, fileName), 'utf8', (err, data) => {
        if (err) {
            console.log('error reading file: ' + err);
            return res.status(500).json({ message: 'Failed to read file', error: err });
        }
        const reactFlowData = parseJsonImportFile(data);
        console.log('Successfully read file ');
        res.status(200).json({ message: 'File read successfully', data: reactFlowData });
    });
}

function parseJsonImportFile(file) {
    const jsonFile = JSON.parse(file);
    // console.log('file content ', jsonFile);

    const dialog = new Dialog(jsonFile.discover_prefix, jsonFile.connection);
    // dialog can be sent to DB 1:1;

    const mapping = new MappingLevel(jsonFile.mapping.plugins, jsonFile.mapping.topic_level);
    mapping.parseTopicLevels();
    const mappings = mapping.mappings;
    // console.log('mappings', mappings);
    
    const topics = mapping.renderTopics();
    // console.log('topics ', topics);

    const edges = mapping.renderEdges();
    // const edges = mapping.edges;
    // console.log('edges ', edges);

    return {
        dialog: dialog,
        edges: edges,
        mappings: mappings,
        topics: topics
    }
}