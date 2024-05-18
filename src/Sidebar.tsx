import React from "react";

// eslint-disable-next-line react-refresh/only-export-components
export default () => {
  const onDragStart = (event, nodeType, label) => {
    event.dataTransfer.setData("application/reactflow", nodeType, label);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="bg-sidebar sidebar">
      <div className="description">
        You can drag these nodes to the pane on the right.
      </div>
      <div
        className="nodeBtn"
        onDragStart={(event) => onDragStart(event, "input")}
        draggable
      >
        Fridge
      </div>
      <div
        className="nodeBtn"
        onDragStart={(event) => onDragStart(event, "default", "Switch")}
        draggable
      >
        Switch
      </div>
      <div
        className="nodeBtn"
        onDragStart={(event) => onDragStart(event, "output")}
        draggable
      >
        Light
      </div>
    </aside>
  );
};
