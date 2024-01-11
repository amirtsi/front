import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ActionButton from '../common/ActionButton';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import NavBar from '../NavBar/NavBar';
import SideNavBar from '../NavBar/SideNavBar';
import axios from 'axios'; // Import axios for server requests


const Documentation = () => {
    const history = useHistory();
    const searchResponse = history.location.state.searchResponse;
    const [logs, setLogs] = useState([
        "Log entry 1",
        "Log entry 2",
        "Log entry 3",
        // ...additional log entries
    ]);
    const [documents, setDocuments] = useState(''); // State to store server response
    const [documentUrl, setDocumentUrl] = useState('');


    const handleSaveScript = () => {
        alert("Script Saved");
        history.push('/terminal');
    };

    const fetchDocuments = async () => {
        try {
            const user_query = searchResponse.interactor_response?.prompter_response?.user_query;
            const llm_response = searchResponse.interactor_response?.prompter_response?.llm_response;
    
            // Construct the request body
            const requestBody = {
                user_query: user_query,
                llm_response: llm_response
            };
    
            // Make the POST request
            const response = await axios.post('http://localhost:8004/documentation', requestBody);

            const content = response.data?.documentation?.documentation?.choices?.[0]?.message?.content;
            const url = response.data?.doc_url;
            setDocuments(content);
            setDocumentUrl(url);
        } catch (error) {
            console.error('Error fetching documents:', error);
            // Handle error appropriately
        }
    };

    const handleBack = () => {
        history.push('/terminal');
    };

    const handleCopyUrl = () => {
        navigator.clipboard.writeText(documentUrl);
        alert('URL copied to clipboard!');
    };


    return (
        console.log(documents),
        <div className="flex flex-col h-screen bg-gray-900">
            <NavBar />

            <div className="flex flex-1 overflow-hidden">
                <div className="hidden md:flex md:flex-shrink-0">
                    <SideNavBar />
                </div>

                <div className="flex-1 p-4">
                    <div className="flex justify-start">
                        <ActionButton 
                            onClick={handleBack}
                            className="Button w-20 h-9 px-3 text-white py-2 rounded-lg border border-gray-400 justify-center items-center gap-2 inline-flex"
                            buttonText={'Back'}
                            activeIndicator={<ChevronLeftIcon className="w-3 h-3" />}
                            isActive={true}
                        />
                    </div>
                    
                    <div className="Frame14 w-80  bg-gray-900 rounded-lg mt-4 flex flex-row items-center justify-start gap-4"> {/* Adjust gap size as needed */}
                        <div className="Frame12 flex justify-start items-center gap-2">
                            <div className="Result text-gray-200 text-base font-normal">Result:</div>
                            <div className="Success text-green-300 text-base font-medium">Success</div>
                        </div>
                        <div className="Frame13 flex justify-start items-center gap-2">
                            <div className="StatusCode text-gray-200 text-base font-normal">Status Code:</div>
                            <div className="text-gray-50 text-base font-medium">202</div>
                        </div>
                    </div>

                    <div className="Rectangle1 w-full h-px bg-gray-200 rounded-sm mt-8" />
                    <div className="Logs text-white text-xl font-medium mt-4">Logs:</div>
                        <div className="code-output bg-gray-900 p-2 rounded-md mt-2 overflow-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                            <ul className="list-disc list-inside text-sm text-white bg-gray-800 p-2 rounded-md">
                                {logs.map((log, index) => (
                                    <li key={index}>{log}</li>
                                ))}
                            </ul>
                            <ActionButton
                                className="Button w-40 h-10 px-5 py-2.5 bg-blue-500 rounded-lg text-white shadow border border-blue-800 justify-center items-center gap-2  whitespace-nowrap inline-flex mt-4"
                                buttonText='Document Script'
                                onClick={fetchDocuments}
                            />
                        </div>
                    
                        <div className="Rectangle2 w-full h-px bg-gray-200 rounded-sm mt-8" />
                            <div className="Documents text-white text-xl font-medium mt-4">Document Content:</div>
                            {documents && (
                                <>
                                    <div className="code-output bg-gray-900 p-2 rounded-md mt-2" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                        <pre className="w-full h-full text-sm text-white bg-gray-800 p-2 rounded-md">
                                            {documents}
                                        </pre>
                                    </div>
                                    <div className="mt-4">
                                        <div className="text-white">Document URL:</div>
                                        <div className="flex items-center gap-2 mt-2">
                                            <input 
                                                type="text" 
                                                value={documentUrl} 
                                                className="flex-1 p-2 rounded-md bg-gray-800 text-white" // 'flex-1' makes the input field grow
                                                readOnly 
                                            />
                                            <ActionButton 
                                                buttonText="Copy" 
                                                onClick={handleCopyUrl}
                                                className="Button bg-blue-500 text-white rounded-lg" // Button size remains constant
                                            />
                                        </div>
                                    </div>
                                </>
                            )}


                    <ActionButton
                        className="Button w-28 h-10 px-5 py-2.5 bg-blue-500 rounded-lg text-white shadow border border-blue-800 justify-center items-center gap-2 inline-flex mt-4 whitespace-nowrap"
                        buttonText='Save Script'
                        onClick={handleSaveScript}
                    />
                </div>
            </div>
        </div>
    );
};

export default Documentation;
