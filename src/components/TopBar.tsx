import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import {BiEdit, BiExport, BiFolderOpen, BiFolderPlus, BiSave} from "react-icons/bi";
import {Tooltip} from 'react-tooltip';
import '../styles/TopBar.css'

interface Props {
    onExportProject: () => void;
    onSaveProject: () => void;
    onAddTab: () => void;
    addButtons: boolean;
    onOpenProject: () => void;
    onEditProject: () => void;
}

const TopBar: React.FC<Props> = ({onAddTab, onOpenProject, onEditProject, addButtons, onSaveProject, onExportProject}) => {
    const [isSaved, setIsSaved] = useState(false);

    const handleSave = () => {
        onSaveProject();
        setIsSaved(true);
        setTimeout(() => {
            setIsSaved(false);
        }, 1000); // Adjust the duration to match your CSS animation duration
    };
    return (
        <div
            className="bg-secondary text-white font-bold text-[30px] h-topBar flex justify-between items-center relative z-5">
            <NavLink className="flex items-center gap-2 ml-2" to="/">
                <img src="./../../public/logo.png" className="w-[35px] h-[35px] mr-2 ml-2"/>
                <div>IoT Configurator</div>
            </NavLink>
            <div className="flex items-center mr-2">
                {addButtons && (
                    <div className="flex flex-row gap-1.5">
                        <BiExport className="navBarBtn focus:outline-none" onClick={onExportProject}
                                  data-tooltip-id="exportBtn" data-tooltip-content="Export"/>
                        <Tooltip id="exportBtn" className="customTooltip"/>

                        <BiEdit className="navBarBtn focus:outline-none" onClick={onEditProject} data-tooltip-id="editBtn"
                                data-tooltip-content="Edit"/>
                        <Tooltip id="editBtn" place="bottom" className="customTooltip"/>

                        <BiSave className={`navBarBtn focus:outline-none ${isSaved ? 'save-success' : ''}`}
                                data-tooltip-id="saveBtn" data-tooltip-content="Save" onClick={handleSave}
                        />
                        <Tooltip id="saveBtn" place="bottom" className="customTooltip"/>

                        <BiFolderOpen className="ml-8 navBarBtn focus:outline-none" onClick={onOpenProject} data-tooltip-id="openBtn"
                                      data-tooltip-content="Open Project"/>
                        <Tooltip id="openBtn" place="bottom-end" className="customTooltip"/>

                        <BiFolderPlus className="navBarBtn focus:outline-none" onClick={onAddTab} data-tooltip-id="addBtn" data-tooltip-content="New Project"/>
                      <Tooltip id="addBtn" place="bottom-end" className="customTooltip"/>
                  </div>
                  )}
              </div>
            </div>
          );
};

export default TopBar;
