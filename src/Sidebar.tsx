import React from "react";

// eslint-disable-next-line react-refresh/only-export-components
export default () => {
  const onDragStart = (event, nodeType, label) => {
    event.dataTransfer.setData("application/reactflow", nodeType, label);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside>
      <div className="description">
        You can drag these nodes to the pane on the right.
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "input")}
        draggable
      >
        Fridge
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "default", "Switch")}
        draggable
      >
        Switch
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, "output")}
        draggable
      >
        Light
      </div>
    </aside>
  );
};
