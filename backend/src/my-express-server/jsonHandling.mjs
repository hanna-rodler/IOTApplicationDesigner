import Dialog from './classes/Dialog.mjs';
import MappingLevel from './classes/import/MappingLevel.mjs';
import ExportHandler from './classes/export/ExportHandler.mjs';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const path = join(__dirname, './../../../.env');
dotenv.config({path: path});

const API_URL = process.env.API_URL_BE;

export const exportToJson = async (req, res) => {
    try {
        const id = req.params.id;
        const projectResponse = await axios.get(`${API_URL}projects/${id}`)
        const project = projectResponse.data;
        const { _id, ...dialogWithout_id } = project.dialog;
        const dialog = dialogWithout_id;
        const fileName = project.name;
        const topics = project.topics;
        const edges = project.edges;
        const mappings = project.mappings;


        let mqttJson = dialog;
        mqttJson.mapping = {}
    
        if(topics && edges && mappings){
            const exportHandler = new ExportHandler(topics, edges, mappings);
            mqttJson.mapping.topic_level = exportHandler.renderedTopicLevels;
            mqttJson.reactFlow = exportHandler.renderReactFlowJson(fileName);
        
            res.status(200).json({ fileName: fileName, file: mqttJson});
        } else {
            res.status(500).json({message: 'topics, edges or mappings are empty'});
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({error: 'Failed to export project with error '.error.response});
    }
}

export const importFromJson = async (req, res) => {
    try {
        const { fileContent } = req.body;
        const reactFlowData = parseJsonImportFile(fileContent);

        // Example: Send the parsed data to another API
        const createdProjectResponse = await axios.post(API_URL+"projects/", reactFlowData);
        const projectId = createdProjectResponse.data._id;
        await axios.post(API_URL+"projects/"+projectId+"/mappings", reactFlowData.mappings);
        await axios.post(API_URL+"projects/"+projectId+"/edges", reactFlowData.edges);
        await axios.post(API_URL+"projects/"+projectId+"/topics", reactFlowData.topics);
        await axios.post(API_URL+"projects/"+projectId+"/dialog", reactFlowData.dialog);
        // Respond to the client
        res.status(200).json({ message: 'File read successfully', id: projectId});
    } catch (error) {
        console.error("Error handling the request:", error);
        res.status(500).json({ message: 'Failed to read file or send data', error });
    }
};

function parseJsonImportFile(file) {
    const jsonFile = JSON.parse(file);

    const dialog = new Dialog(jsonFile.discover_prefix, jsonFile.connection);
    // dialog can be sent to DB 1:1;

    const mappingLevel = new MappingLevel(jsonFile.mapping.topic_level, jsonFile.reactFlow, jsonFile.mapping.plugins);
    mappingLevel.parseTopicLevels();
    
    let topics = mappingLevel.renderTopics();
    
    const edges = mappingLevel.renderEdges();
    const mappings = mappingLevel.renderMappings();

    let projectName = 'New Project';
    if (jsonFile.reactFlow !== undefined && jsonFile.reactFlow.projectName !== undefined) {
        projectName = jsonFile.reactFlow.projectName;
    }

    return {
        dialog: dialog,
        edges: edges,
        mappings: mappings,
        topics: topics,
        isImport: true,
        name: projectName
    }
}