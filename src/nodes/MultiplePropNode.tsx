import {useCallback} from 'react';
import {Handle, Position} from 'reactflow';

const handleIndent = {top: 50};

const isConnectable = true;

function TextUpdaterNode({prop}) {
    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    return (
        <div className="text-updater-node">
            <Handle type="target" position={Position.Left} isConnectable={isConnectable} id="switchOnOff"/>
            <Handle type="target" position={Position.Left} isConnectable={isConnectable} style={handleIndent}
                    id="temperatureFridge"/>
            <div>
                <div>
                    <label><b>Fridge</b></label>
                </div>
                <label>SwitchOnOff</label>
                <label>TemperatureFridge</label>
            </div>
            <Handle
                type="source"
                position={Position.Right}
                id="switchOnOff"
                style={handleIndent}
                isConnectable={isConnectable}
            />
        </div>
    );
}

export default TextUpdaterNode;