import Topic from './Topics.mjs';

export default class TopicsMap {
    constructor(topics) {
        // remove last element _id (id of subcollection) and make iterable
        const topicsArray = Object.entries(topics)
            .filter(([key, value]) => key !== '_id')
            .map(([key, value]) => value);
            
        this.topics = new Map();
        for(let topic of topicsArray) {
            this.topics.set(topic.id, new Topic(topic))
        }
    }

    renderForReactFlowJson() {
        const topics = []
        for(const [id, topic] of this.topics) {
            console.log(`${id}: ${topic}`);
            topics.push(topic.renderForReactFlowJson())
        }
        console.log('react flow topics ', topics);
        return topics;
    }
}