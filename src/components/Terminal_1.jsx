import React, { Fragment, useState,useEffect} from 'react';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';
import SideNavBar from '../NavBar/SideNavBar';
import { useTypingEffect } from '../common/TypingEffect';
import LLMProviderSelector from '../common/LLMProviderSelector';



function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}



const Terminal = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [userQuery, setUserQuery] = useState('');
  const [renderLevels, setRenderLevels] = useState(false);
  const [searchResponse, setSearchResponse] = useState(null);
  const interKeyStrokeDurationInMs = 50;
  
  const options = [
    { id: 1, name: 'Create new Automation' },
    { id: 2, name: 'Execute Automation from bank' },
    { id: 3, name: 'Ask General Inquiry Using bank' },
    { id: 4, name: 'Ask General Inquiry Internal about your ENV' },
    { id: 5, name: 'Show Unicore Insights & Recommendations' },
  ];

  const provider = [
    { id: 1, name: 'ChatGPT', icon: '/image 2Open AI.svg' },
    { id: 2, name: 'GoogleBard', icon: '/image 3google Bard.svg' },
    // ... other options
  ];


  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  // handle provider selection
  const handleProviderClick = (providerName) => {
    const providor = provider.find(opt => opt.name === providerName);
    setSelectedProvider(providor);
  };

  

  const [step1Complete, setStep1Complete] = useState(false);
  const [step2Complete, setStep2Complete] = useState(false);
  const [step3Complete, setStep3Complete] = useState(false);
  const [step4Complete, setStep4Complete] = useState(false);
  const [step5Complete, setStep5Complete] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();
    console.log('Sending query:', userQuery);
    try {
      console.log('Sending query:', userQuery);
      //chaeck if the userQuery is not empty  
      if (userQuery !== '') {    
        setRenderLevels(true);
        const response = await axios.post('http://localhost:80/user_query', { search_data: userQuery });
        setSearchResponse(response.data);
        setRenderLevels(false);
      }
    } catch (error) {
      console.error('Error sending query:', error);
      // Handle error (display error message, etc.)
    }
  };

  const handleClick = (buttonName) => {
    setActiveButton(buttonName);
    // Perform other actions if needed
  };

  useEffect(() => {
    const step1Timer = setTimeout(() => setStep1Complete(true), 30000); // 30 seconds
    const step2Timer = setTimeout(() => setStep2Complete(true), 45000); // 45 seconds
    const step3Timer = setTimeout(() => setStep3Complete(true), 60000); // 60 seconds
    const step4Timer = setTimeout(() => setStep4Complete(true), 75000); // 75 seconds
    const step5Timer = setTimeout(() => setStep5Complete(true), 90000); // 90 seconds

    // Cleanup function to clear timers
    return () => {
      clearTimeout(step1Timer);
      clearTimeout(step2Timer);
      clearTimeout(step3Timer);
      clearTimeout(step4Timer);
      clearTimeout(step5Timer);
    };
  }, []);

  const codeToType = searchResponse?.interactor_response?.prompter_response?.llm_response.code || '';
  const language = searchResponse?.interactor_response?.prompter_response?.llm_response.language || 'python';
  const score = String(searchResponse?.interactor_response?.prompter_response?.code_score.unicore_score || 0);
  
  const typedText = useTypingEffect(codeToType, interKeyStrokeDurationInMs);
  const typedLanguage = useTypingEffect(language, interKeyStrokeDurationInMs);
  const typedScore = useTypingEffect(score, interKeyStrokeDurationInMs);
  

  const renderLoadingSteps = () => (
    <div>
    <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Generate an answer:</h2>
    <ul className="max-w-md space-y-2 text-gray-500 list-inside dark:text-gray-400">
      {/* Step 1 */}
      <li className="flex items-center">
        {step1Complete ? (
          <svg className="w-4 h-4 mr-2 text-green-500 dark:text-green-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
          </svg>
        ) : (
          <div role="status">
            <svg aria-hidden="true" class="w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
            <span class="sr-only">Loading...</span>
          </div>
        )}
        Unicore processes your query
      </li>
        {/* Step 2 */}
        <li className="flex items-center">
        {step2Complete ? (
          <svg className="w-4 h-4 mr-2 text-green-500 dark:text-green-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
          </svg>
        ) : (
          <div role="status">
            <svg aria-hidden="true" class="w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
            <span class="sr-only">Loading...</span>
          </div>
        )}
          Checks that there are no sensitive details in the query
        </li>
        {/* Step 3 */}
        <li className="flex items-center">
        {step3Complete ? (
          <svg className="w-4 h-4 mr-2 text-green-500 dark:text-green-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
          </svg>
        ) : (
          <div role="status">
            <svg aria-hidden="true" class="w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
            <span class="sr-only">Loading...</span>
          </div>
        )}
         Build the code
        </li>
        {/* Step 4 */}
        <li className="flex items-center">
        {step4Complete ? (
          <svg className="w-4 h-4 mr-2 text-green-500 dark:text-green-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
          </svg>
        ) : (
          <div role="status">
            <svg aria-hidden="true" class="w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
            <span class="sr-only">Loading...</span>
          </div>
        )}
          Runs a cyber analysis on the code
        </li>
        {/* Step 5 */}
        <li className="flex items-center">
        {step5Complete ? (
          <svg className="w-4 h-4 mr-2 text-green-500 dark:text-green-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
          </svg>
        ) : (
          <div role="status">
            <svg aria-hidden="true" class="w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
            <span class="sr-only">Loading...</span>
          </div>
        )}
          The code is ready, enjoy!
        </li>
      </ul>
    </div>
  );

  const ResponseDisplay = ({ score, language, typedText }) => {
    return (
      <div className="response-container bg-white p-4 rounded-md shadow">
        {/* Title Line with Score and Language */}
        <div className="title-line flex justify-between items-center mb-4">
          <div className="language text-sm font-semibold text-gray-600">
            Language: {language.toUpperCase()}
          </div>
          <h3 className="text-lg font-bold text-gray-800">Code Response</h3>
          <div className="score text-sm font-semibold text-blue-600">
            Score: {score}/100
          </div>
        </div>
  
        {/* Code Display */}
        <div className="code-output bg-gray-100 p-4 rounded-md">
          <pre className="whitespace-pre-wrap text-sm text-gray-800">{typedText}</pre>
        </div>
      </div>
    );
  };
    
  
  return (
    <div className="flex h-screen bg-gray-900">
      {/* Side Navigation Bar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <SideNavBar />
      </div>

      <div className="flex-1 overflow-hidden">
        {/* Navigation Bar */}
        <NavBar />

        <main className="flex-1 relative overflow-y-auto focus:outline-none ">
            <LLMProviderSelector
                options={options}
                providers={provider}
                providor={selectedProvider}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                handleClick={handleProviderClick}
            />
            {/* ... other JSX */}
        </main>
    </div>
    </div>
);
};

export default Terminal;
