export function getDialog(){
    return {
        "discover_prefix": "iotempower_json_static_value",
        "connection": {
            "keep_alive": 60,
            "client_id": "MQTT-Integrator",
            "clean_session": true,
            "will_topic": "will/topic",
            "will_message": "Last Will",
            "will_qos": 0,
            "will_retain": false,
            "username": "Username",
            "password": "Password"
        }
    }
}

export function getImportDialog() {
    return {
        "discover_prefix": "importData_to_export",
        "connection": {
            "keep_alive": 60,
            "client_id": "MQTT-Integrator",
            "clean_session": true,
            "will_topic": "will/topic",
            "will_message": "Last Will",
            "will_qos": 0,
            "will_retain": false,
            "username": "Username",
            "password": "Password"
        }
    }
}

export function getImportTopics() {
    return [
        {
            "id": "topic_wIxHz4JrNIgX",
            "data": {
                "nodeName": "nodeName"
            },
            "reportTopic": "test01/button1",
            "commandTopic": "",
            "subscriptionType": "binary_sensor",
            "qos": 2,
            "type": "topic",
            "position": {
                "x": 100,
                "y": 150
            }
        },
        {
            "id": "topic_Fpxlk1qYQD3w",
            "data": {
                "nodeName": "nodeName"
            },
            "reportTopic": "test01/rfid",
            "commandTopic": "",
            "subscriptionType": "new rfid reader",
            "qos": "",
            "type": "topic",
            "position": {
                "x": 100,
                "y": 150
            }
        },
        {
            "id": "topic_27BFBPvpYFVF",
            "data": {
                "nodeName": "nodeName"
            },
            "reportTopic": "temperature/celsius/set",
            "commandTopic": "temperature/celsius",
            "subscriptionType": "",
            "qos": 2,
            "type": "topic",
            "position": {
                "x": 100,
                "y": 150
            }
        },
        {
            "id": "topic_Sb1a35Lx23lc",
            "data": {
                "nodeName": "nodeName"
            },
            "reportTopic": "temperature/kelvin/set",
            "commandTopic": "temperature/kelvin",
            "subscriptionType": "",
            "qos": 2,
            "type": "topic",
            "position": {
                "x": 100,
                "y": 150
            }
        },
        {
            "id": "topic_yMQHDEKjoZyR",
            "data": {
                "nodeName": "nodeName"
            },
            "reportTopic": "",
            "commandTopic": "test02/strip1/rgb/set",
            "subscriptionType": "",
            "qos": "",
            "type": "topic",
            "position": {
                "x": 100,
                "y": 150
            }
        },
        {
            "id": "topic_640AkT4XXu8e",
            "data": {
                "nodeName": "nodeName"
            },
            "reportTopic": "",
            "commandTopic": "strip/strip1/brightness/set",
            "subscriptionType": "",
            "qos": "",
            "type": "topic",
            "position": {
                "x": 100,
                "y": 150
            }
        },
        {
            "id": "topic_XzbmCmLcusus",
            "data": {
                "nodeName": "nodeName"
            },
            "reportTopic": "",
            "commandTopic": "temperature/farenheit",
            "subscriptionType": "",
            "qos": "",
            "type": "topic",
            "position": {
                "x": 100,
                "y": 150
            }
        }
    ]
}

export function getImportMappings(){
    return [
        {
            "id": "static_3pLsRgknaR",
            "nodeType": "static",
            "message": "pressed",
            "mapped_message": "front red",
            "qos": "",
            "retain": "",
            "type": "mapping",
            "position": {
                "x": 100,
                "y": 100
            }
        },
        {
            "id": "static_Qqpbh4coM8",
            "nodeType": "static",
            "message": "released",
            "mapped_message": "0",
            "qos": "",
            "retain": "",
            "type": "mapping",
            "position": {
                "x": 100,
                "y": 100
            }
        },
        {
            "id": "value_pvujRwFmHjt",
            "nodeType": "value",
            "mapping": "front {{ message }}",
            "qos": "",
            "retain": "",
            "type": "mapping",
            "position": {
                "x": 100,
                "y": 100
            }
        },
        {
            "id": "value_Hg8ABqCUdNx",
            "nodeType": "value",
            "mapping": "{{ round(float(message), 2) }}",
            "qos": 2,
            "retain": true,
            "type": "mapping",
            "position": {
                "x": 100,
                "y": 100
            }
        },
        {
            "id": "value_LhotPd6lxMI",
            "nodeType": "value",
            "mapping": "{{ round(float(message) + 273.15, 2) }}",
            "qos": 1,
            "retain": true,
            "type": "mapping",
            "position": {
                "x": 100,
                "y": 100
            }
        },
        {
            "id": "value_rGXGFgc7Ab5",
            "nodeType": "value",
            "mapping": "{{ round(float(message) * 1.8 + 32, 2) }}",
            "qos": 2,
            "retain": true,
            "type": "mapping",
            "position": {
                "x": 100,
                "y": 100
            }
        },
        {
            "id": "value_84VgGHEZ4VP",
            "nodeType": "value",
            "mapping": "{{ round(float(message) - 273.15, 2) }}",
            "qos": 2,
            "retain": true,
            "type": "mapping",
            "position": {
                "x": 100,
                "y": 100
            }
        },
        {
            "id": "value_dyO6Z6evNJC",
            "nodeType": "value",
            "mapping": "{{ round(float(message), 2) }}",
            "qos": 1,
            "retain": true,
            "type": "mapping",
            "position": {
                "x": 100,
                "y": 100
            }
        },
        {
            "id": "value_x4Utr6SFFXk",
            "nodeType": "value",
            "mapping": "{{ round((float(message) - 273.15) * 1.8 + 32, 2) }}",
            "qos": 2,
            "retain": true,
            "type": "mapping",
            "position": {
                "x": 100,
                "y": 100
            }
        }
    ]
}

export function getImportEdges(){
    return [
        {
            "id": "reactflow__edge-in9ggmmJ361J",
            "source": "topic_wIxHz4JrNIgX",
            "sourceHandle": "reportTopic",
            "target": "static_3pLsRgknaR",
            "targetHandle": "mappingIn"
        },
        {
            "id": "reactflow__edge-outjJB5Pu4x3Jw",
            "source": "static_3pLsRgknaR",
            "sourceHandle": "mappingOut",
            "target": "topic_yMQHDEKjoZyR",
            "targetHandle": "commandTopic"
        },
        {
            "id": "reactflow__edge-inLyMK48dkHO",
            "source": "topic_wIxHz4JrNIgX",
            "sourceHandle": "reportTopic",
            "target": "static_Qqpbh4coM8",
            "targetHandle": "mappingIn"
        },
        {
            "id": "reactflow__edge-outyaEziMnCbee",
            "source": "static_Qqpbh4coM8",
            "sourceHandle": "mappingOut",
            "target": "topic_640AkT4XXu8e",
            "targetHandle": "commandTopic"
        },
        {
            "id": "reactflow__edge-inPsigl0tyLV",
            "source": "topic_Fpxlk1qYQD3w",
            "sourceHandle": "reportTopic",
            "target": "value_pvujRwFmHjt",
            "targetHandle": "mappingIn"
        },
        {
            "id": "reactflow__edge-outLcg6yHjOmyo",
            "source": "value_pvujRwFmHjt",
            "sourceHandle": "mappingOut",
            "target": "topic_yMQHDEKjoZyR",
            "targetHandle": "commandTopic"
        },
        {
            "id": "reactflow__edge-inPQsKVtIxy0",
            "source": "topic_27BFBPvpYFVF",
            "sourceHandle": "reportTopic",
            "target": "value_Hg8ABqCUdNx",
            "targetHandle": "mappingIn"
        },
        {
            "id": "reactflow__edge-outRsVd7Zg0l7Y",
            "source": "value_Hg8ABqCUdNx",
            "sourceHandle": "mappingOut",
            "target": "topic_27BFBPvpYFVF",
            "targetHandle": "commandTopic"
        },
        {
            "id": "reactflow__edge-inmxRTljKXIp",
            "source": "topic_27BFBPvpYFVF",
            "sourceHandle": "reportTopic",
            "target": "value_LhotPd6lxMI",
            "targetHandle": "mappingIn"
        },
        {
            "id": "reactflow__edge-outl5xjrwxLzt1",
            "source": "value_LhotPd6lxMI",
            "sourceHandle": "mappingOut",
            "target": "topic_Sb1a35Lx23lc",
            "targetHandle": "commandTopic"
        },
        {
            "id": "reactflow__edge-inACaD37B7di",
            "source": "topic_27BFBPvpYFVF",
            "sourceHandle": "reportTopic",
            "target": "value_rGXGFgc7Ab5",
            "targetHandle": "mappingIn"
        },
        {
            "id": "reactflow__edge-out2G7lrDV4fQD",
            "source": "value_rGXGFgc7Ab5",
            "sourceHandle": "mappingOut",
            "target": "topic_XzbmCmLcusus",
            "targetHandle": "commandTopic"
        },
        {
            "id": "reactflow__edge-iny8RRzSgsKl",
            "source": "topic_Sb1a35Lx23lc",
            "sourceHandle": "reportTopic",
            "target": "value_84VgGHEZ4VP",
            "targetHandle": "mappingIn"
        },
        {
            "id": "reactflow__edge-outums9cCAMi8W",
            "source": "value_84VgGHEZ4VP",
            "sourceHandle": "mappingOut",
            "target": "topic_27BFBPvpYFVF",
            "targetHandle": "commandTopic"
        },
        {
            "id": "reactflow__edge-ingor1Y7SeIa",
            "source": "topic_Sb1a35Lx23lc",
            "sourceHandle": "reportTopic",
            "target": "value_dyO6Z6evNJC",
            "targetHandle": "mappingIn"
        },
        {
            "id": "reactflow__edge-out5U7vItoxDvd",
            "source": "value_dyO6Z6evNJC",
            "sourceHandle": "mappingOut",
            "target": "topic_Sb1a35Lx23lc",
            "targetHandle": "commandTopic"
        },
        {
            "id": "reactflow__edge-inaW9W8ZeyDB",
            "source": "topic_Sb1a35Lx23lc",
            "sourceHandle": "reportTopic",
            "target": "value_x4Utr6SFFXk",
            "targetHandle": "mappingIn"
        },
        {
            "id": "reactflow__edge-outPjEjyOW1bAN",
            "source": "value_x4Utr6SFFXk",
            "sourceHandle": "mappingOut",
            "target": "topic_XzbmCmLcusus",
            "targetHandle": "commandTopic"
        }
    ]
}

export function getAllTestTopics(){
    const staticAndValue = getStaticAndValueTopics();
    const jsonObj = getJsonTestTopics();
    const merged = staticAndValue.concat(jsonObj);
    return merged;
}

export function getStaticAndValueTopics(){
    const staticObj = getStaticTestTopics();
    const value = getValueTestTopics();
    const merged = staticObj.concat(value);
    return merged;
}

export function getStaticTestTopics() {
    return [
        {
            "id": "button1",
            "nodeName": "button1",
            "reportTopic": "test01/button1",
            "commandTopic": "xyz",
            "subscriptionType": "binary_sensor",
            "qos": 2,
            "type": "binary_sensor",
            "position": {x: 100, y: 100}
        },
        {
            "id": "button2",
            "nodeName": "button2",
            "reportTopic": "button2",
            "commandTopic": "xyz",
            "subscriptionType": "test01/button2/binary_sensor",
            "qos": 2,
            "type": "binary_sensor",
            "position": {x: 100, y: 100}
        },
        {
            "id": "setRGB",
            "nodeName": "strip1",
            "reportTopic": "xyz",
            "commandTopic": "strip/strip1/rgb/set",
            "qos": '',
            "subscriptionType": '',
            "type": "topic",
            position: {x: 100, y: 100}
        },
        {
            "id": "setBrightnessReleased",
            "nodeName": "Strip 1",
            "reportTopic": "xyz",
            "commandTopic": "strip/strip1/brightness/set",
            "qos": '',
            "subscriptionType": '',
            "type": "topic",
            position: {x: 100, y: 100}
        }
    ]
}

export function getJsonTestTopics(){
    return [
        {
            "id": "jsonMapping",
            "nodeName": "jsonMapping",
            "reportTopic": "mapping/json",
            "commandTopic": "",
            "subscriptionType": "",
            "qos": 0,
            "type": "topic",
            "position": {x: 100, y: 100}
        },
        {
            "id": "onboard",
            "nodeName": "onboard",
            "reportTopic": "",
            "commandTopic": "test02/onboard/set",
            "subscriptionType": "",
            "qos": 0,
            "type": "topic",
            "position": {x: 100, y: 100}
        },
    ]
}

export function getValueTestTopics(){
    // TODO: wildcard mapping value.json erstes.
    return [
        // {
        //     "id": "double",
        //     "nodeName": "double_name",
        //     "reportTopic": "double",
        //     "commandTopic": "",
        //     "subscriptionType": "",
        //     "qos": "",
        //     "type": "",
        //     "position": {x: 100, y: 100}
        // },
        {
            "id": "tempCels",
            "nodeName": "tempCels",
            "reportTopic": "temperature/celsius/set",
            "commandTopic": "temperature/celsius",
            "subscriptionType": "button1/binary_sensor",
            "qos": 2,
            "type": "topic",
            "position": {x: 100, y: 100}
        },
        {
            "id": "tempKelvin",
            "nodeName": "tempKelN",
            "reportTopic": "temperature/kelvin/set",
            "commandTopic": "temperature/kelvin",
            "subscriptionType": "",
            "qos": 2,
            "type": "topic",
            "position": {x: 100, y: 100}
        },
        {
            "id": "tempFar",
            "nodeName": "tempFahrenheit",
            "reportTopic": "temperature/farenheit/set",
            "commandTopic": "temperature/farenheit",
            "subscriptionType": "",
            "qos": 2,
            "type": "topic",
            "position": {x: 100, y: 100}
        },
        {
            "id": "tempOwn",
            "nodeName": "tempFahrenheit",
            "reportTopic": "temperature/myOwnTemp",
            "commandTopic": "temperature/myOwnTemp",
            "subscriptionType": "",
            "qos": '',
            "type": "topic",
            "position": {x: 100, y: 100}
        },
        {
            "id": "kelvinOwn",
            "nodeName": "tempFahrenheit",
            "reportTopic": "temperature/kelvin",
            "commandTopic": "",
            "subscriptionType": "",
            "qos": '',
            "type": "topic",
            "position": {x: 100, y: 100}
        },

    ]
    
}

export function getAllTestMappings(){
    const staticAndValue = getStaticAndValueMappings();
    const jsonObj = getJsonMappings();
    const merged = staticAndValue.concat(jsonObj);
    return merged;
}

export function getStaticAndValueMappings(){
    const staticObj = getStaticMappings();
    const value = getValueMappings();
    const merged = staticObj.concat(value);
    return merged;
}

export function getStaticMappings(){
    return [
        {
            "id": "staticMapping",
            "nodeType": "static",
            "message": "released",
            "mapped_message": "0",
            "qos": "",
            "retain": "",
            "type": "mapping",
            "position": {
                "x": 100,
                "y": 100
            }
        },
        {
            "id": "staticMapping2",
            "nodeType": "static",
            "message": "released",
            "mapped_message": "0",
            "qos": 1,
            "retain": "",
            "type": "mapping",
            "position": {
                "x": 100,
                "y": 100
            }
        },
        {
            "id": "RGBMapping",
            "nodeType": "static",
            "message": "pressed",
            "mapped_message": "front red",
            "qos": "",
            "retain": "",
            "type": "mapping",
            "position": {
                "x": 100,
                "y": 100
            }
        }
    ]
}

export function getJsonMappings(){
    return [
        {
            id: 'json_onboard',
            nodeType: 'json',
            type: 'mapping',
            position: {x: 100, y: 100},
            mapping: '{% if message.state == "on" %}on{% else if message.state == "off" %}off{% endif %}',
            qos: 0,
            retain: false
        },
    ]
}

export function getValueMappings(){
    // TODO: try out, wenn irgendwelche targets edges keinen matching finden oder im FE validaten
    return [
        {
            id: 'celsius_celsius',
            nodeType: 'value',
            type: 'mapping',
            position: {x: 100, y: 100},
            mapping: '{{ round(float(message), 2) }}',
            qos: 2,
            retain: true
        },
        {
            id: 'celsius_kelvin',
            nodeType: 'value',
            type: 'mapping',
            position: {x: 100, y: 100},
            mapping: '{{ round(float(message) + 273.15, 2) }}',
            qos: 1,
            retain: true
        },
        {
            id: 'celsius_far',
            nodeType: 'value',
            type: 'mapping',
            position: {x: 100, y: 100},
            mapping: '{{ round(float(message) * 1.8 + 32, 2) }}',
            qos: 2,
            retain: true
        },
        {
            id: 'kelvin_celsius',
            nodeType: 'value',
            type: 'mapping',
            position: {x: 100, y: 100},
            mapping: '{{ round(float(message) - 273.15, 2) }}',
            qos: 2,
            retain: true
        },
        {
            id: 'kelvin_kelvin',
            nodeType: 'value',
            type: 'mapping',
            position: {x: 100, y: 100},
            mapping: '{{ round(float(message), 2) }}',
            qos: 1,
            retain: true
        },
        {
            id: 'kelvin_far',
            nodeType: 'value',
            type: 'mapping',
            position: {x: 100, y: 100},
            mapping: '{{ round((float(message) - 273.15) * 1.8 + 32, 2) }}',
            qos: 2,
            retain: true
        },
        {
            id: 'far_celsius',
            nodeType: 'value',
            type: 'mapping',
            position: {x: 100, y: 100},
            mapping: '{{ round((float(message) - 32) / 1.8, 2) }}',
            qos: 2,
            retain: true
        },
        {
            id: 'far_kelvin',
            nodeType: 'value',
            type: 'mapping',
            position: {x: 100, y: 100},
            mapping: '{{ round((float(message) - 32) / 1.8 + 273.15, 2) }}',
            qos: 2,
            retain: true
        },
        {
            id: 'far_far',
            nodeType: 'value',
            type: 'mapping',
            position: {x: 100, y: 100},
            mapping: '{{ round(float(message), 2) }}',
            qos: 2,
            retain: true
        },
        {
            id: 'own_own',
            nodeType: 'value',
            type: 'mapping',
            position: {x: 100, y: 100},
            mapping: '{{ round(float(message), 2) }}',
            qos: 2,
            retain: true
        },
        {
            id: 'kelvin_own',
            nodeType: 'value',
            type: 'mapping',
            position: {x: 100, y: 100},
            mapping: '{{ round(float(message), 2) }}',
            qos: 2,
            retain: true
        },
    ]
}

export function getAllTestEdges(){
    const staticAndValue = getStaticAndValueEdges();
    const jsonObj = getJsonEdges();
    const merged = staticAndValue.concat(jsonObj);
    return merged;
}


export function getStaticAndValueEdges(){
    const staticObj = getStaticEdges();
    const value = getValueEdges();
    const merged = staticObj.concat(value);
    return merged;
}

export function getJsonEdges(){
    return [
        {
            "source": "jsonMapping",
            "sourceHandle": "reportTopic",
            "target": "json_onboard",
            "targetHandle": "mappingIn",
            "id": "reactflow__edge-button1reportTopic-staticMappingmappingIn"
        },
        {
            "source": "json_onboard",
            "sourceHandle": "mappingOut",
            "target": "onboard",
            "targetHandle": "commandTopic",
            "id": "MappingmappingOut-setBrightnessReleasedcommandTopic"
        },
    ]
}

export function getValueEdges() {
    return [
        {
            "source": "tempCels",
            "sourceHandle": "reportTopic",
            "target": "celsius_celsius",
            "targetHandle": "mappingIn",
            "id": "reactflow__edge-button1reportTopic-staticMappingmappingIn"
        },
        {
            "source": "celsius_celsius",
            "sourceHandle": "mappingOut",
            "target": "tempCels",
            "targetHandle": "commandTopic",
            "id": "reactflow__edge-staticMappingmappingOut-setBrightnessReleasedcommandTopic"
        },
        {
            "source": "celsius_kelvin",
            "sourceHandle": "mappingOut",
            "target": "tempKelvin",
            "targetHandle": "commandTopic",
            "id": "reactflow__edge-staticMappingmappingOut-setBrightnessReleasedcommandTopic"
        },
        {
            "source": "tempCels",
            "sourceHandle": "reportTopic",
            "target": "celsius_kelvin",
            "targetHandle": "mappingIn",
            "id": "reactflow__edge-button1reportTopic-staticMappingmappingIn"
        },
        {
            "source": "tempCels",
            "sourceHandle": "reportTopic",
            "target": "celsius_far",
            "targetHandle": "mappingIn",
            "id": "reactflow__edge-button1reportTopic-staticMappingmappingIn"
        },
        {
            "source": "celsius_far",
            "sourceHandle": "mappingOut",
            "target": "tempFar",
            "targetHandle": "commandTopic",
            "id": "reactflow__edge-staticMappingmappingOut-setBrightnessReleasedcommandTopic"
        },
        {
            "source": "tempKelvin",
            "sourceHandle": "reportTopic",
            "target": "kelvin_celsius",
            "targetHandle": "mappingIn",
            "id": "reactflow__edge-button1reportTopic-staticMappingmappingIn"
        },
        {
            "source": "kelvin_celsius",
            "sourceHandle": "mappingOut",
            "target": "tempCels",
            "targetHandle": "commandTopic",
            "id": "reactflow__edge-staticMappingmappingOut-setBrightnessReleasedcommandTopic"
        },
        { 
            "source": "tempKelvin",
            "sourceHandle": "reportTopic",
            "target": "kelvin_kelvin",
            "targetHandle": "mappingIn",
            "id": "reactflow__edge-button1reportTopic-staticMappingmappingIn"
        },
        {
            "source": "kelvin_kelvin",
            "sourceHandle": "mappingOut",
            "target": "tempKelvin",
            "targetHandle": "commandTopic",
            "id": "reactflow__edge-staticMappingmappingOut-setBrightnessReleasedcommandTopic"
        },
        {
            "source": "tempKelvin",
            "sourceHandle": "reportTopic",
            "target": "kelvin_far",
            "targetHandle": "mappingIn",
            "id": "reactflow__edge-button1reportTopic-staticMappingmappingIn"
        },
        {
            "source": "kelvin_far",
            "sourceHandle": "mappingOut",
            "target": "tempFar",
            "targetHandle": "commandTopic",
            "id": "reactflow__edge-staticMappingmappingOut-setBrightnessReleasedcommandTopic"
        },
        {
            "source": "tempFar",
            "sourceHandle": "reportTopic",
            "target": "far_celsius",
            "targetHandle": "mappingIn",
            "id": "reactflow__edge-button1reportTopic-staticMappingmappingIn"
        },
        {
            "source": "far_celsius",
            "sourceHandle": "mappingOut",
            "target": "tempCels",
            "targetHandle": "commandTopic",
            "id": "reactflow__edge-staticMappingmappingOut-setBrightnessReleasedcommandTopic"
        },
        {
            "source": "tempFar",
            "sourceHandle": "reportTopic",
            "target": "far_kelvin",
            "targetHandle": "mappingIn",
            "id": "reactflow__edge-button1reportTopic-staticMappingmappingIn"
        },
        {
            "source": "far_kelvin",
            "sourceHandle": "mappingOut",
            "target": "tempKelvin",
            "targetHandle": "commandTopic",
            "id": "reactflow__edge-staticMappingmappingOut-setBrightnessReleasedcommandTopic"
        },
        {
            "source": "tempFar",
            "sourceHandle": "reportTopic",
            "target": "far_far",
            "targetHandle": "mappingIn",
            "id": "reactflow__edge-button1reportTopic-staticMappingmappingIn"
        },
        {
            "source": "far_far",
            "sourceHandle": "mappingOut",
            "target": "tempFar",
            "targetHandle": "commandTopic",
            "id": "reactflow__edge-staticMappingmappingOut-setBrightnessReleasedcommandTopic"
        },
        {
            "source": "tempOwn",
            "sourceHandle": "reportTopic",
            "target": "own_own",
            "targetHandle": "mappingIn",
            "id": "reactflow__edge-button1reportTopic-staticMappingmappingIn"
        },
        {
            "source": "own_own",
            "sourceHandle": "mappingOut",
            "target": "tempOwn",
            "targetHandle": "commandTopic",
            "id": "reactflow__edge-staticMappingmappingOut-setBrightnessReleasedcommandTopic"
        },
        {
            "source": "kelvinOwn",
            "sourceHandle": "reportTopic",
            "target": "kelvin_own",
            "targetHandle": "mappingIn",
            "id": "reactflow__edge-button1reportTopic-staticMappingmappingIn"
        },
        {
            "source": "kelvin_own",
            "sourceHandle": "mappingOut",
            "target": "tempOwn",
            "targetHandle": "commandTopic",
            "id": "reactflow__edge-staticMappingmappingOut-setBrightnessReleasedcommandTopic"
        },
    ]
}

export function getStaticEdges(){
    return [
        {
            "source": "button1",
            "sourceHandle": "reportTopic",
            "target": "staticMapping",
            "targetHandle": "mappingIn",
            "id": "reactflow__edge-button1reportTopic-staticMappingmappingIn"
        },
        {
            "source": "staticMapping",
            "sourceHandle": "mappingOut",
            "target": "setBrightnessReleased",
            "targetHandle": "commandTopic",
            "id": "reactflow__edge-staticMappingmappingOut-setBrightnessReleasedcommandTopic"
        },
        {
            "source": "button2",
            "sourceHandle": "reportTopic",
            "target": "staticMapping2",
            "targetHandle": "mappingIn",
            "id": "reactflow__edge-button1reportTopic-staticMappingmappingIn"
        },
        {
            "source": "staticMapping2",
            "sourceHandle": "mappingOut",
            "target": "setBrightnessReleased",
            "targetHandle": "commandTopic",
            "id": "reactflow__edge-staticMappingmappingOut-setBrightnessReleasedcommandTopic"
        },
        {
            "source": "RGBMapping",
            "sourceHandle": "mappingOut",
            "target": "setRGB",
            "targetHandle": "commandTopic",
            "id": "reactflow__edge-staticMappingmappingOut-setBrightnessReleasedcommandTopic"
        },
        {
            "source": "button1",
            "sourceHandle": "reportTopic",
            "target": "RGBMapping",
            "targetHandle": "mappingIn",
            "id": "reactflow__edge-button1reportTopic-staticMappingmappingIn"
        },
    ]
}
