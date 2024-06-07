import React from 'react';
import "../styles/tab-navigation.css";
import { MdEdit } from "react-icons/md";

const TabNavigation = ({ tabs, activeTab, setActiveTab, onDeleteTab, onRenameTab }) => {
    return (
        <div className="flex bg-topbar">
            {tabs.map((tab, index) => (
                <button
                    key={index}
                    className="tab-navigation-button"
                    style={{backgroundColor: activeTab === index ? '#035B5B' : '#107878'}}
                    onClick={() => setActiveTab(index)}
                >
                    <div
                        className="inline mr-3"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDeleteTab(index);
                        }}
                    >
                        ✕
                    </div>
                    {tab.name}
                    <div
                        className="ml-3 mr-3"
                        onClick={(e) => {
                            e.stopPropagation();
                            onRenameTab(index);
                        }}
                    >
                        <MdEdit />
                    </div>
                </button>
            ))}
        </div>
    );
};

export default TabNavigation;
