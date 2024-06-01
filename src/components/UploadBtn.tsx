// UploadBtn.tsx
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { MdOutlineFileUpload } from 'react-icons/md';
import '../index.css';

const UploadBtn: React.FC = () => {
    const [error, setError] = useState<string | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Handle the files
        console.log(acceptedFiles);
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
                <span className="min-w-64">{isDragActive ? 'drop the .json file here ...' : 'Drag & drop .json files here, or click to serelect files'}</span>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
    );
};

export default UploadBtn;
