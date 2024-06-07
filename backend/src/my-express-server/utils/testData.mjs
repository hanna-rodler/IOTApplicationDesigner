export function getDialog(){
    return {
        "discover_prefix": "iotempower",
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