import {getStaticTestTopics, getValueTestTopics, getDialog, getValueEdges, getValueMappings, getStaticEdges, getStaticMappings, getStaticAndValueTopics, getStaticAndValueEdges, getStaticAndValueMappings, getJsonTestTopics, getJsonEdges, getJsonMappings, getAllTestTopics, getAllTestEdges, getAllTestMappings, getImportDialog, getImportTopics, getImportMappings, getImportEdges} from './testData.mjs';

export default class TestDataLoader{
    constructor(type) {
        if(type === 'static' || type === 'json' || type === 'value' || type === 'staticAndValue' || type === 'all' || type === 'import'){
            this.type = type
        } else {
            console.error('Type must be "static", "json", "value", "valueAndJson", "all" or "import"');
        }
    }

    getTestData(){
        let dialog = [];
        let topics = [];
        let edges = [];
        let mappings = [];

        if(this.type === 'import') {
            dialog = getImportDialog();
        } else {
            dialog = getDialog();
        }
        if(this.type === 'static') {
            edges = getStaticEdges();
            topics = getStaticTestTopics();
            mappings = getStaticMappings();
        } else if(this.type === 'json') {
            edges = getJsonEdges();
            topics = getJsonTestTopics();
            mappings = getJsonMappings();
        } else if(this.type === 'value') {
            edges = getValueEdges();
            topics = getValueTestTopics();
            mappings = getValueMappings();
        } else if (this.type === 'staticAndValue') {
            edges = getStaticAndValueEdges();
            topics = getStaticAndValueTopics();
            mappings = getStaticAndValueMappings();
        } else if(this.type === 'all') {
            edges = getStaticAndValueEdges();
            topics = getStaticAndValueTopics();
            mappings = getStaticAndValueMappings();
        } else if(this.type === 'import') {
            edges = getImportEdges();
            topics = getImportTopics();
            mappings = getImportMappings();
        }

        return {
            dialog: dialog,
            topics: topics,
            edges: edges,
            mappings: mappings
        }
    }
}