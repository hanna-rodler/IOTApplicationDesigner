import { JSONPrefix, FirstDialogue } from "../types/jsonTypes";

export async function writeMqttFile(
  formData: FirstDialogue,
  isPrefix: boolean = false
) {
  const data = convertToValidJson(formData, isPrefix);
  const stringifiedData: string = JSON.stringify(data);
  if (data != undefined) {
    const response = await fetch("http://localhost:5000/write-mqtt-file", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: stringifiedData,
    });

    if (!response.ok) {
      throw new Error("Failed to write JSON data to file");
    }

    return await response.json();
  } else {
    throw new Error("Data is undefined");
  }
}

function convertToValidJson(
  formData: FirstDialogue,
  isPrefix: boolean
): JSONPrefix | undefined {
  if (isPrefix) {
    const prefix: JSONPrefix = {
      discover_prefix: formData.discovery_prefix,
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
