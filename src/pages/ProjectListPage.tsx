import "reactflow/dist/style.css";
import TopBar from "../components/TopBar";
import "../index.css";
import {NavLink, useNavigate} from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getProjects } from "../services/api";

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

    return (
        <>
            <TopBar />
            <div className="min-h-screen bg-gray-100 p-4">
                <div className="container mx-auto mt-6">
                    <div className="flex justify-center items-center mb-3">
                        <h1 className="text-2xl font-bold">Click on an existing Project to open it!</h1>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-3">
                        {projects.map((project) => (
                            <div key={project._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                <NavLink to={`/project/${project._id}`} className="block p-4">
                                    <h4 className="text-xl text-center mb-3 font-semibold text-gray-800 hover:text-secondary transition-colors duration-300">{project.name}</h4>
                                    {project.screenshotUrl && (
                                        <img src={project.screenshotUrl} alt={`${project.name} screenshot`} className="mt-2 w-full h-auto rounded-md" />
                                    )}
                                </NavLink>
                            </div>
                        ))}
                    </div>
                    <button
                        className="bg-secondary hover:bg-topbar mt-6 text-white px-4 py-2 rounded-btn text-base"
                        onClick={handleClick}
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </>
    );
}
