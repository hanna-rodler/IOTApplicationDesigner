import path from 'path';
import { fileURLToPath } from 'url';
import {getFileName} from './utils/utils.mjs';
import {getStaticTestTopics, getValueTestTopics, getDialog, getValueEdges, getValueMappings, getStaticEdges, getStaticMappings} from './utils/testData.mjs';
import {renderMappingsToJson} from './utils/nodeMapping.mjs';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FILE_PREFIX = path.join(__dirname, 'mqttFiles');

export const exportToJson = async (req, res) => {
        // TODO: get data from DB
        const dialog = getDialog();
        const topics = getStaticTestTopics();
        // const topics = getValueTestTopics();
        const edges = getStaticEdges();
        // const edges = getValueEdges();
        const mappings = getStaticMappings();
        // const mappings = getValueMappings();
    
        let mqttJson = dialog;
        mqttJson.mapping = {}
    
        // console.log('mqtt json ', mqttJson);
    
        if(topics && edges && mappings){
            mqttJson.mapping.topic_levels = await renderMappingsToJson(topics, edges, mappings);
            const fileName = getFileName(dialog.discover_prefix);
        
            console.log(fileName, ' name');
        
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