import path from 'path';
import { fileURLToPath } from 'url';
import {getFileName} from './utils/utils.mjs';
import {getStaticTestTopics, getValueTestTopics, getDialog, getValueEdges, getValueMappings, getStaticEdges, getStaticMappings, getStaticAndValueTopics, getStaticAndValueEdges, getStaticAndValueMappings, getJsonTestTopics, getJsonEdges, getJsonMappings, getAllTestTopics, getAllTestEdges, getAllTestMappings} from './utils/testData.mjs';
import {renderMappingsToJson} from './utils/nodeMapping.mjs';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FILE_PREFIX = path.join(__dirname, 'mqttFiles');

export const exportToJson = async (req, res) => {
        // TODO: get data from DB
        const dialog = getDialog();

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

        const topics = getAllTestTopics();
        const edges = getAllTestEdges();
        const mappings = getAllTestMappings();

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

export const importJson = async(req, rees) => {
    // TODO: implement import JSON.
}