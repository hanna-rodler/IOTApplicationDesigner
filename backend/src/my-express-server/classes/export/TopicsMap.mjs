import Topic from './Topics.mjs';

// TODO: braucht keine eigene Klasse, oder? kein .topics dann nötig
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
}