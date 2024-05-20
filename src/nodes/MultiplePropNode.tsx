import {useCallback} from 'react';
import {Handle, NodeProps, Position, useReactFlow} from 'reactflow';

import "../styles/multiple-prop-node.css"

const handleIndent = {top: 54};
const initIndent = {top: 38};


const isConnectable = true;

function TextUpdaterNode({id, prop}: NodeProps) {
    const { deleteElements } = useReactFlow();

    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    const deleteNode = useCallback(() => {
        deleteElements({ nodes: [{ id }] });
    }, [id, deleteElements]);

    return (
        <div className="node-body">
            <Handle className="node-target-handle" type="target" position={Position.Left} isConnectable={isConnectable} id="switchOnOff" style={initIndent}/>
            <Handle className="node-target-handle" type="target" position={Position.Left} isConnectable={isConnectable} style={handleIndent}
                    id="temperatureFridge"/>
            <div>
                <div className="node-header">
                    <div className="node-heading">Fridge</div>
                    <div className="delete-node" onClick={deleteNode}>X</div>
                </div>
                <div className="node-props">
                    <div>SwitchOnOff</div>
                    <div>TemperatureFridge</div>
                </div>
            </div>
            <Handle
                type="source"
                position={Position.Right}
                id="switchOnOff"
                style={handleIndent}
                isConnectable={isConnectable}
                className="node-source-handle"
            />
        </div>
    );
}

export default TextUpdaterNode;