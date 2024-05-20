import { useCallback } from 'react';
import {Handle, NodeProps, Position, useReactFlow} from 'reactflow';

const handleStyle = { left: 10 };
const isConnectable = true;

function TextUpdaterNode({id, data}: NodeProps) {
    const { deleteElements } = useReactFlow();

    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    const onClick = useCallback(() => {
        deleteElements({ nodes: [{ id }] });
    }, [id, deleteElements]);

    return (
        <div className="text-updater-node">
            <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
            <div className="text-updater-node-header">
                <div>
                    <label htmlFor="text">Text:</label>
                    <input id="text" name="text" onChange={onChange} className="nodrag" />
                </div>
                <div className="delete-node" onClick={onClick}>X</div>
            </div>
            <Handle
                type="source"
                position={Position.Bottom}
                id="a"
                style={handleStyle}
                isConnectable={isConnectable}
            />
            <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
        </div>
    );
}

export default TextUpdaterNode;