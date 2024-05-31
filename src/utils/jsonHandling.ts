export async function writeMqttFile() {
  const response = await fetch("http://localhost:5000/write-mqtt-file", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to write JSON data to file");
  }

  return await response.json();
}
