import { JSONPrefix, FirstDialogue } from "../types/jsonTypes";

export function convertToValidJson(
  formData: FirstDialogue,
  isPrefix: boolean
): JSONPrefix | undefined {
  if (isPrefix) {
    const prefix: JSONPrefix = {
      discover_prefix: formData.discover_prefix,
      connection: {
        keep_alive: formData.keep_alive,
        client_id: formData.client_id,
        clean_session: formData.clean_session,
        will_topic: formData.will_topic,
        will_message: formData.will_message,
        will_qos: formData.will_qos,
        will_retain: formData.will_retain,
        username: formData.username,
        password: formData.password,
      },
    };
    return prefix;
  }
}
