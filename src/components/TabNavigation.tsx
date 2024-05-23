import React from 'react';
import "../styles/tab-navigation.css";

const TabNavigation = ({ tabs, activeTab, setActiveTab, onDeleteTab, onRenameTab }) => {
    return (
        <div className="tab-navigation-bar">
            {tabs.map((tab, index) => (
                <button
                    key={index}
                    className="tab-navigation-button"
                    style={{backgroundColor: activeTab === index ? '#035B5B' : '#107878'}}
                    onClick={() => setActiveTab(index)}
                >
                    <div
                        className="tab-navigation-button-delete"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDeleteTab(index);
                        }}
                    >
                        ✕
                    </div>
                    <div
                        className="tab-navigation-button-edit"
                        onClick={(e) => {
                            e.stopPropagation();
                            onRenameTab(index);
                        }}
                    >
                        ✎
                    </div>
                    {tab.name}
                </button>
            ))}
        </div>
    );
};

export default TabNavigation;
