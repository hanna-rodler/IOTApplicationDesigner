import "reactflow/dist/style.css";
import TopBar from "../components/TopBar";
import "../index.css";
import {NavLink, useNavigate} from "react-router-dom";
import React, { useEffect, useState } from "react";
import {deleteProject, getProjects} from "../services/api";
import UploadBtn from "../components/UploadBtn";

export function ProjectListPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projects = await getProjects();
                projects.forEach((project) => {
                    const screenshotUrl = localStorage.getItem(`projectScreenshot-${project._id}`);
                    if (screenshotUrl) {
                        project.screenshotUrl = screenshotUrl;
                    }
                });
                setProjects(projects);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };
        fetchProjects();
    }, []);

    const handleClick = () => {
        navigate(-1);
    };

    const handleNewClick = () => {
        navigate("/setup")
    }

    const handleDelete = async (projectId) => {
        if (window.confirm("Are you sure you want to permanently delete this Project?")) {
            try {
                await deleteProject(projectId);
                setProjects((prevProjects) => prevProjects.filter((project) => project._id !== projectId));
            } catch (error) {
                console.error("Error deleting project:", error);
            }
        }
    };

    return (
        <>
            <TopBar />
            <div className="min-h-screen bg-gray-100 p-4 pl-8 pr-8">
                <div className="container mx-auto mt-6">
                    <div className="flex justify-between items-center mt-6 mb-12 flex-wrap">
                        <div className="flex justify-center items-center gap-y-3">
                            <h1 className="text-2xl font-bold mb-0 max-1280:mb-3">Click on an existing Project to open it!</h1>
                        </div>
                        <div className="flex flex-row gap-x-4 flex-wrap gap-y-3">
                            <UploadBtn />
                            <button
                                className="bg-secondary hover:bg-topbar text-white px-4 py-2 rounded-btn text-base"
                                onClick={handleNewClick}
                            >
                                New Project
                            </button>
                            <button
                                className="bg-secondary hover:bg-topbar text-white px-4 py-2 rounded-btn text-base"
                                onClick={handleClick}
                            >
                                Go Back
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-3">
                        {projects.map((project) => (
                            <div key={project._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                <div className="flex justify-between items-center pt-6 pb-6 pr-8 pl-8">
                                    <NavLink to={`/project/${project._id}`} className="">
                                        <h4 className="text-xl font-semibold text-gray-800 hover:text-secondary transition-colors duration-300">{project.name}</h4>
                                    </NavLink>
                                    <button className="delete-node" onClick={() => handleDelete(project._id)}>X</button>
                                </div>
                                <div >
                                    {project.screenshotUrl && (
                                        <NavLink to={`/project/${project._id}`}>
                                            <img src={project.screenshotUrl} alt={`${project.name} screenshot`} className="mt-2 w-full h-auto rounded-md" />
                                        </NavLink>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
