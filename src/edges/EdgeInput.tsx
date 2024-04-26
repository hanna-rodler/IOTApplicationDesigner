import {BaseEdge, EdgeLabelRenderer, getStraightPath, useReactFlow,} from 'reactflow';
import {useCallback} from "react";

export default function EdgeInput({id, sourceX, sourceY, targetX, targetY, data}) {
    const {setEdges} = useReactFlow();
    const [edgePath, labelX, labelY] = getStraightPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });

    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    return (
        <>
            <BaseEdge id={id} path={edgePath} data={data}/>
            <EdgeLabelRenderer>
                    <div
                        style={{
                            position: 'fixed',
                            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                            pointerEvents: 'all',
                        }}
                        className="nodrag nopan"
                    >
                        <input id="edgeVal" value={data} type="number" onChange={onChange} className="nodrag" /></div>
            </EdgeLabelRenderer>
        </>
    );
}
