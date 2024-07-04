// UploadBtn.tsx
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { MdOutlineFileUpload } from 'react-icons/md';
import '../index.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/'

const UploadBtn: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setError(null); 
        const file = acceptedFiles[0];
        
        const reader = new FileReader();
        reader.onload = async () => {
            const fileContent = reader.result;
            try {
                const response = await axios.post(API_URL +'api/import', { fileContent });
                const projectId = response.data.id;

                // redirect to project page
                navigate(`/project/${projectId}`);
            } catch (error) {
                console.error('Error sending POST request:', error);
                setError('Failed to upload file');
            }
        };
        
        reader.onerror = () => {
            console.error('Error reading file');
            setError('Failed to read file');
        };

        reader.readAsText(file);
    }, []);

    const onDropRejected = useCallback(() => {
        setError('Only .json files are accepted');
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        onDropRejected,
        accept: { ' application/json': ['.json']}
    });

    return (
        <div className="uploadContainer sm:mt-0 mt-4">
            <div
                {...getRootProps()}
                className={`uploadBtn ${
                    isDragActive ? 'bg-gray-200 border-topbar' : 'bg-white'
                }`}
                >
                <input {...getInputProps()} />
                <MdOutlineFileUpload className="iconBtn" />
                <span className="min-w-64">{isDragActive ? 'drop the .json file here ...' : 'Drag & drop .json files here, or click to select files'} {error && <span className="text-red-500 mt-2"><br/>{error}</span>}</span>
            
            </div>
    </div>
    );
};

export default UploadBtn;
