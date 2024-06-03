import { Schema, model } from 'mongoose';

const mappingSchema = new Schema({
    discover_prefix: { type: String, default: '' },
    connection: {
        keep_alive: { type: Number, default: 60 },
        client_id: { type: String, default: '' },
        clean_session: { type: Boolean, default: false },
        will_topic: { type: String, default: '' },
        will_message: { type: String, default: '' },
        will_qos: { type: Number, default: 0 },
        will_retain: { type: Boolean, default: false },
        username: { type: String, default: '' },
        password: { type: String, default: '' },
    },
    mapping: { type: Schema.Types.Mixed, required: true },
});

export const Mapping = model('Mapping', mappingSchema);

/*
import { Schema, model } from 'mongoose';

const mappingSchema = new Schema({
    discover_prefix: { type: String, default: '' },
    connection: {
        keep_alive: { type: Number, default: 60 },
        client_id: { type: String, default: '' },
        clean_session: { type: Boolean, default: false },
        will_topic: { type: String, default: '' },
        will_message: { type: String, default: '' },
        will_qos: { type: Number, default: 0 },
        will_retain: { type: Boolean, default: false },
        username: { type: String, default: '' },
        password: { type: String, default: '' },
    },
    mapping: { type: Schema.Types.Mixed, required: true },
});

export const Mapping = model('Mapping', mappingSchema);
*/