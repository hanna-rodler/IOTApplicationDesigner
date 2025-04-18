import React, { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // State to manage sidebar visibility

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarWidth = isOpen ? "w-64" : "w-0"; // Calculate sidebar width based on isOpen state
  const sidebarPadding = isOpen ? "px-4 pt-5" : "p-0";

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    type: string,
    nodeName: string,
    nodeType: string = ''
  ) => {
    event.dataTransfer.setData("nodeType", nodeType);
    event.dataTransfer.setData("type", type);
    event.dataTransfer.setData("nodeName", nodeName);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside
      className={`sidebar fixed right-0 ${sidebarWidth} ${sidebarPadding}`}
    >
      {/* Sidebar Content */}
      <div>
        <div className="text-sm mb-4">
          Drag and drop the mappings and topics into the editor.
        </div>
        <h5>Topics</h5>
        <div
          className="nodeBtn bg-topic"
          onDragStart={(event) => onDragStart(event, "topic", "New Topic", "topic")}
          draggable
        >
          New Topic
        </div>
        <div
            className="nodeBtn bg-actuator"
            onDragStart={(event) => onDragStart(event, "topic", "New Actuator", "actuator")}
            draggable
        >
          New Actuator
        </div>
        <div
            className="nodeBtn bg-sensor"
            onDragStart={(event) => onDragStart(event, "topic", "New Sensor", "sensor")}
            draggable
        >
          New Sensor
        </div>

        <h5 className="pt-3">Mappings</h5>
        <div
          className="nodeBtn bg-mapping"
          onDragStart={(event) => onDragStart(event, "mapping", "Static", "static")}
          draggable
        >
          Static Mapping
        </div>
        <div
          className="nodeBtn bg-mapping"
          onDragStart={(event) => onDragStart(event, "mapping", "Value", "value")}
          draggable
        >
          Value Mapping
        </div>
        <div
          className="nodeBtn bg-mapping"
          onDragStart={(event) => onDragStart(event, "mapping", "JSON", "json")}
          draggable
        >
          JSON Mapping
        </div>
      </div>

      <button
        className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-btn text-base"
        onClick={toggleSidebar}
      >
        {isOpen ? "Close Sidebar" : "Open Sidebar"}
      </button>
    </aside>
  );
};

export default Sidebar;