import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import Dialog from './classes/Dialog.mjs';
import MappingLevel from './classes/import/MappingLevel.mjs';
import ExportHandler from './classes/export/ExportHandler.mjs';
import axios from 'axios';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FILE_PREFIX = path.join(__dirname, 'mqttFiles');

export const exportToJson = async (req, res) => {
    try {
        const id = req.params.id;
        console.log('getting export for project with id ', id);
        const projectResponse = await axios.get(`http://localhost:5000/api/projects/${id}`)
        const project = projectResponse.data;
        // const testdataLoader = new TestDataLoader('staticAndValue');
        // const {dialog, topics, edges, mappings} = testdataLoader.getTestData();
        const { _id, ...dialogWithout_id } = project.dialog;
        const dialog = dialogWithout_id;
        console.log('dialog ', dialog);
        const fileName = project.name;
        const topics = project.topics;
        const edges = project.edges;
        const mappings = project.mappings;
        // console.log('found project ', fileName, ': ', project);


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
        console.log(error);
        res.status(500).json({error: 'Failed to export project with error '.error.response});
    }
}

export const importFromJsonBE = async(req, res) => {
    // TODO: implement import JSON.

    const fileName = 'mapfile.json';
    let reactFlowData = {}
    try {
        await fs.readFile(path.join(FILE_PREFIX, fileName), 'utf8', (err, data) => {
            if (err) {
                console.log('error reading file: ' + err);
                return res.status(500).json({ message: 'Failed to read file', error: err });
            }
            reactFlowData = parseJsonImportFile(data);
            console.log('Successfully read file ');
        });
        console.log('react flow data ', reactFlowData);
        const response = await axios.post("http://localhost:5000/api/projects/", reactFlowData);
        console.log('Response from server: ', response.data);
        res.status(200).json({ message: 'File read successfully', data: reactFlowData });
    } catch (error) {
        console.error("Error sending post request:", error);
        // TODO: server http error code
        res.status(500).json({message: 'Failed to save project'});
    }
}

export const importFromJson = async (req, res) => {
    try {
        const { fileContent } = req.body;
        const reactFlowData = parseJsonImportFile(fileContent);

        // Example: Send the parsed data to another API
        const createdProjectResponse = await axios.post("http://localhost:5000/api/projects/", reactFlowData);
        console.log('createdProjectResponse from server: ', createdProjectResponse.status);
        const projectId = createdProjectResponse.data._id;
        console.log('projectId', projectId);
        const addMappingsRes = await axios.post("http://localhost:5000/api/projects/"+projectId+"/mappings", reactFlowData.mappings);
        console.log('mappings response ', addMappingsRes.status)
        const addEdgesRes = await axios.post("http://localhost:5000/api/projects/"+projectId+"/edges", reactFlowData.edges);
        console.log('mappings response ', addEdgesRes.status)
        const addTopicsRes = await axios.post("http://localhost:5000/api/projects/"+projectId+"/topics", reactFlowData.topics);
        console.log('mappings response ', addTopicsRes.status)
        const addDialogRes = await axios.post("http://localhost:5000/api/projects/"+projectId+"/dialog", reactFlowData.dialog);
        console.log('mappings response ', addDialogRes.status)

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

    console.log('react flow mappedEdges ', jsonFile.reactFlow.mappedEdges);
    const mappingLevel = new MappingLevel(jsonFile.mapping.topic_level, jsonFile.reactFlow, jsonFile.mapping.plugins);
    mappingLevel.parseTopicLevels();
    
    let topics = mappingLevel.renderTopics();
    
    const edges = mappingLevel.renderEdges();
    const mappings = mappingLevel.renderMappings();
    

    return {
        dialog: dialog,
        edges: edges,
        mappings: mappings,
        topics: topics,
        isImport: true,
        name: 'New Project'
    }
}