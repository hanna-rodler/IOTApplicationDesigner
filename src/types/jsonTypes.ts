export type FirstDialogue = {
  discover_prefix: string;
  keep_alive: number;
  client_id: string;
  clean_session: boolean;
  will_message: string;
  will_topic: string;
  will_qos: number;
  will_retain: boolean;
  username: string;
  password: string;
};

export type JSONPrefix = {
  discover_prefix: string;
  connection: Connection;
};

export interface Mapping {
  mapping: MappingProperties;
  discover_prefix?: string;
  connection?: Connection;
}

export interface Connection {
  keep_alive?: number;
  client_id?: string;
  clean_session?: boolean;
  will_topic?: string;
  will_message?: string;
  will_qos?: number;
  will_retain?: boolean;
  username?: string;
  password?: string;
}

export interface MappingProperties {
  plugins?: string[];
  topic_level: TopicLevel | TopicLevel[];
}

type TopicLevel = {
  name: string;
  topic_level?: TopicLevel;
  subscription?: Subscription;
};

export interface Subscription {
  qos?: number;
  type?: string;
  static?: StaticMapping | StaticMapping[];
  value?: TemplateMapping | TemplateMapping[];
  json?: TemplateMapping | TemplateMapping[];
}

export interface StaticMapping {
  message_mapping: MessageMapping | MessageMapping[];
}

export interface MessageMapping {
  message: string;
  mapped_message: string;
}

export interface TemplateMapping {
  mapping_template: string;
  suppressions?: string[];
  mapped_topic: string;
  retain?: boolean;
  qos?: number;
}

export interface MappingCommons {
  mapped_topic: string;
  retain?: boolean;
  qos?: number;
}
