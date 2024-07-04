import {useEffect, useState} from "react";
import TopBar from "./TopBar";
import { convertToValidJson } from "../utils/jsonHandling";
import { FirstDialogue } from "../types/jsonTypes";
import {
    createProject,
    getProjectById,
    getSubcollectionItem,
    updateProjectName,
    updateSubcollectionItem
} from "../services/api";
import {useNavigate, useParams} from 'react-router-dom';


const DialogForm = () => {
    const navigate = useNavigate();
    const { projectId } = useParams();

    const [projectName, setProjectName] = useState('');
    const [formData, setFormData] = useState<FirstDialogue>({
        discover_prefix: '',
        keep_alive: 60,
        client_id: '',
        clean_session: true,
        will_message: '',
        will_topic: '',
        will_qos: 0,
        will_retain: false,
        username: '',
        password: '',
    });

    const transformFetchedData = (dialog) => {
        return {
            discover_prefix: dialog.discover_prefix || '',
            keep_alive: dialog.connection?.keep_alive || 60,
            client_id: dialog.connection?.client_id || '',
            clean_session: dialog.connection?.clean_session || true,
            will_message: dialog.connection?.will_message || '',
            will_topic: dialog.connection?.will_topic || '',
            will_qos: dialog.connection?.will_qos || 0,
            will_retain: dialog.connection?.will_retain || false,
            username: dialog.connection?.username || '',
            password: dialog.connection?.password || '',
        };
    };

    useEffect(() => {
        if (projectId) {
            const fetchProjectData = async () => {
                try {
                    const dialog = await getSubcollectionItem(projectId, 'dialog');
                    if (dialog) {
                        setFormData(transformFetchedData(dialog));
                    }
                } catch (error) {
                    console.error('Error fetching project data:', error);
                }
            };
            fetchProjectData();
        }
    }, [projectId]);

    useEffect(() => {
        if (projectId) {
            const fetchProjectName = async () => {
                try {
                    const project = await getProjectById(projectId);
                    setProjectName(project.name || '');
                } catch (error) {
                    console.error('Error fetching project data:', error);
                }
            };
            fetchProjectName();
        }
    }, [projectId]);

    const handleClick = () => {
        navigate(-1)
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === "projectName") {
            setProjectName(value);
        } else {
            setFormData({
                ...formData,
                [name]: type === 'checkbox' ? checked : value,
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const convertedData = convertToValidJson(formData, true);

        try {
            const projectData = {
                name: projectName,
                dialog: convertedData,
            };

            if (projectId) {
                await updateProjectName(projectId, projectName);
                await updateSubcollectionItem(projectId, "dialog", convertedData);

                navigate('/project/' + projectId);
            } else {
                const createdProject = await createProject(projectData);

                navigate('/project/' + createdProject._id);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };


    return (
        <>
            <TopBar addButtons={false} />
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
                    <h2 className="text-2xl font-bold mb-6 text-center">MQTT Settings</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700">Project Name</label>
                            <input
                                type="text"
                                name="projectName"
                                value={projectName}
                                onChange={handleChange}
                                required={true}
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-secondary focus:ring-opacity-50"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Discover Prefix (optional)</label>
                            <input
                                type="text"
                                name="discover_prefix"
                                value={formData.discover_prefix}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-secondary focus:ring-opacity-50"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Keep Alive (optional, default: 60)</label>
                            <input
                                type="number"
                                name="keep_alive"
                                value={formData.keep_alive}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-secondary focus:ring-opacity-50"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Client ID (optional)</label>
                            <input
                                type="text"
                                name="client_id"
                                value={formData.client_id}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-secondary focus:ring-opacity-50"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Will Message (optional)</label>
                            <input
                                type="text"
                                name="will_message"
                                value={formData.will_message}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-secondary focus:ring-opacity-50"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Will Topic (optional)</label>
                            <input
                                type="text"
                                name="will_topic"
                                value={formData.will_topic}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-secondary focus:ring-opacity-50"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Will QoS (optional)</label>
                            <input
                                type="number"
                                name="will_qos"
                                value={formData.will_qos}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-secondary focus:ring-opacity-50"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Username (optional)</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-secondary focus:ring-opacity-50"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Password (optional)</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-secondary focus:ring-opacity-50"
                            />
                        </div>
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="clean_session"
                                    checked={formData.clean_session}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                <label className="text-gray-700">Clean Session</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="will_retain"
                                    checked={formData.will_retain}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                <label className="text-gray-700">Will Retain</label>
                            </div>
                        </div>
                        <div className="col-span-1 md:col-span-2 flex justify-center gap-5">
                            <button
                                type="submit"
                                className="secondaryBtn"
                            >
                                Submit
                            </button>
                            <button
                                type="button"
                                className="secondaryBtn"
                                onClick={handleClick}
                            >
                                Go Back
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default DialogForm;
