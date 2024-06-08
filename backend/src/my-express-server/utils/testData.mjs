export function getDialog(){
    return {
        "discover_prefix": "iotempower_static",
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


export function getStaticTestTopics() {
    return [
        {
            "id": "button1",
            "nodeName": "button1",
            "reportTopic": "button1",
            "commandTopic": "xyz",
            "subscriptionType": "button1/binary_sensor",
            "qos": 2,
            "type": "binary_sensor",
            "position": {x: 100, y: 100}
        },
        {
            "id": "button2",
            "nodeName": "button2",
            "reportTopic": "button2",
            "commandTopic": "xyz",
            "subscriptionType": "button2/binary_sensor",
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
            "type": "",
            "position": {x: 100, y: 100}
        },
        {
            "id": "tempKelvin",
            "nodeName": "tempKelN",
            "reportTopic": "temperature/kelvin/set",
            "commandTopic": "temperature/kelvin",
            "subscriptionType": "",
            "qos": 2,
            "type": "",
            "position": {x: 100, y: 100}
        },
        {
            "id": "tempFar",
            "nodeName": "tempFahrenheit",
            "reportTopic": "temperature/farenheit/set",
            "commandTopic": "temperature/farenheit",
            "subscriptionType": "",
            "qos": 2,
            "type": "",
            "position": {x: 100, y: 100}
        },
        {
            "id": "tempOwn",
            "nodeName": "tempFahrenheit",
            "reportTopic": "temperature/myOwnTemp",
            "commandTopic": "temperature/kelvin",
            "subscriptionType": "",
            "qos": '',
            "type": "myType",
            "position": {x: 100, y: 100}
        },

    ]
    
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
