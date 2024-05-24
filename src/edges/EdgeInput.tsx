import {BaseEdge, EdgeLabelRenderer, getStraightPath, useReactFlow,} from 'reactflow';
import {useCallback} from "react";
import {useDispatch} from "react-redux";
import {setEdgeData} from "../redux/reducer/edgeSlice.ts";
import {store} from "../redux/store.ts";

export default function EdgeInput({id, sourceX, sourceY, targetX, targetY}) {
    const {setEdges} = useReactFlow();
    const [edgePath, labelX, labelY] = getStraightPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });
    const dispatch = useDispatch();

    const onChange = useCallback((evt) => {
        const edgeInfos = [id, evt.target.value]
        dispatch(setEdgeData(edgeInfos))
        setEdges(store.getState().edgeStore.edges);
    }, []);

    return (
        <>
            <BaseEdge id={id} path={edgePath}/>
            <EdgeLabelRenderer>
                    <div
                        style={{
                            position: 'fixed',
                            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                            pointerEvents: 'all',
                        }}
                        className="nodrag nopan"
                    >
                        <input id="edgeVal" type="number" onChange={onChange} className="nodrag" /></div>
            </EdgeLabelRenderer>
        </>
    );
}
