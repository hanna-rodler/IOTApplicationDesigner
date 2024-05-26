import React, { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage sidebar visibility

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarWidth = isOpen ? "w-64" : "w-0"; // Calculate sidebar width based on isOpen state
  const sidebarPadding = isOpen ? "px-4 pt-5" : "p-0";

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string,
    nodeName: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("nodeName", nodeName);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside
      className={`bg-sidebar sidebar fixed right-0 top-navHeight ${sidebarWidth} ${sidebarPadding} overflow-x-hidden transition-all duration-300`}
    >
      {/* <button
        className="fixed top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-btn mb-10"
        onClick={toggleSidebar}
      >
        {isOpen ? "Close Sidebar" : "Open Sidebar"}
      </button> */}

      {/* Sidebar Content */}
      <div className="">
        <div className="text-sm mb-4 hidden">
          You can drag these nodes to the pannel on the left.
        </div>

        <h5>Topics</h5>
        <div
          className="nodeBtn"
          onDragStart={(event) => onDragStart(event, "topic", "New")}
          draggable
        >
          New Topic
        </div>

        <h5 className="pt-3">Mappings</h5>
        <div
          className="nodeBtn"
          onDragStart={(event) => onDragStart(event, "input", "Static")}
          draggable
        >
          Static Mapping
        </div>
        <div
          className="nodeBtn"
          onDragStart={(event) => onDragStart(event, "input", "Value")}
          draggable
        >
          Value Mapping
        </div>
        <div
          className="nodeBtn"
          onDragStart={(event) => onDragStart(event, "input", "JSON")}
          draggable
        >
          JSON Mapping
        </div>
      </div>

      <button
        className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-btn"
        onClick={toggleSidebar}
      >
        {isOpen ? "Close Sidebar" : "Open Sidebar"}
      </button>
    </aside>
  );
};

export default Sidebar;
