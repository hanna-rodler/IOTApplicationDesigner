import {useState} from "react";
import TopBar from "./TopBar";
import TabNavigation from "./TabNavigation";
import { writeMqttFile } from "../utils/jsonHandling";


const DialogForm = () => {
    const [formData, setFormData] = useState({
        discovery_prefix: '',
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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log('Form data submitted: ', formData);
    //     const response = await writeMqttFile();
    // };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await writeMqttFile();
            console.log(response.message);
        } catch (error) {
            console.error('Error writing JSON file:', error);
        }
    };

    return (
        <>
            <TopBar addButton={false}/>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
                    <h2 className="text-2xl font-bold mb-6 text-center">MQTT Settings</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700">Discovery Prefix (optional)</label>
                            <input
                                type="text"
                                name="discovery_prefix"
                                value={formData.discovery_prefix}
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
                        <div className="col-span-1 md:col-span-2 flex justify-center">
                            <button
                                type="submit"
                                className="secondaryBtn"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default DialogForm