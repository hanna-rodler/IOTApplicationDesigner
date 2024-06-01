export type JSONPrefix = {
  discover_prefix: string;
  connection: {
    keep_alive: number;
    client_id: string;
    clean_session: boolean;
    will_topic: string;
    will_message: string;
    will_qos: number;
    will_retain: boolean;
    username: string;
    password: string;
  };
};

export type FirstDialogue = {
  discovery_prefix: string;
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
