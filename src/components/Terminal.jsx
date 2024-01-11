import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';
import SideNavBar from '../NavBar/SideNavBar';
import SearchDropdown from '../common/SearchDropdown';
import SecondaryNavBar from '../NavBar/SecondaryNavBar';
import LoadingSteps from '../common/LoadingSteps';
import { XCircleIcon } from '@heroicons/react/20/solid'
import { ExclamationTriangleIcon,CodeBracketIcon,CogIcon,PencilIcon,XMarkIcon} from '@heroicons/react/20/solid'
import { useTypingEffect } from '../common/TypingEffect';
import ActionButton from '../common/ActionButton';
import { BrowserRouter as Router, Route, Link,useHistory } from "react-router-dom";



const options = [
  { id: 1, name: 'Create new Automation' },
  { id: 2, name: 'Execute Automation from bank' },
  { id: 3, name: 'Ask General Inquiry Using bank' },
  { id: 4, name: 'Ask General Inquiry Internal about your ENV' },
  { id: 5, name: 'Show Unicore Insights & Recommendations' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Terminal = () => {
  const history = useHistory()
  const [activeButton, setActiveButton] = useState(null);
  const [userQuery, setUserQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResponse, setSearchResponse] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // State to track loading
  const [showLoadingSteps, setShowLoadingSteps] = useState(true); // State to track whether to show LoadingSteps
  const [executeResponse, setexecuteResponse] = useState(null);

  const interKeyStrokeDurationInMs = 100;

  const handleSearch = async (query) => {
    console.log('Sending query:', query);
    try {
      if (query !== '') {
        setIsSearching(true);
        const response = await axios.post('http://localhost:80/user_query', { search_data: query });
        setSearchResponse(response.data);
        setIsSearching(false); 
        setIsLoading(false); // Set loading to false when response arrives
      }
    } catch (error) {
      console.error('Error sending query:', error);
      setIsLoading(false); // Set loading to false in case of an error
    }finally {
    setIsSearching(false); // Search is complete
  }
  };

  const handleExecute = async  () => {
    try {
      // const response = await axios.post('http://your-server-endpoint');
      // Update state with response for displaying
      // setexecuteResponse(response.data);
      // Redirect to the new route
      history.push('/documentation', { searchResponse:searchResponse });
    } catch (error) {
      console.error('Error on execute:', error);
    }
  };
  


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const codeToType = searchResponse?.interactor_response?.prompter_response?.llm_response.code || '';
  const language = searchResponse?.interactor_response?.prompter_response?.llm_response.language || 'python';

  const Code = useTypingEffect(codeToType, interKeyStrokeDurationInMs);
  const Language = useTypingEffect(language, interKeyStrokeDurationInMs);


  const ResponseDisplay = ({  language, code }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [editableCode, setEditableCode] = useState(code);

    const toggleEditMode = () => {
      setIsEditMode(!isEditMode);
      // If switching from edit to view mode, you may want to handle the save operation here
    };

    const handleCancel = () => {
      // Reload the page when the "Cancel" button is clicked
      window.location.reload();
    };
    
    return (
      <div className="response-container bg-gray-900 p-2 rounded-md shadow">
        {/* Title Line with Score and Language */}
        <div className="title-line flex justify-between items-center mb-2">
          <div className="language text-lx font-semibold text-white">
            Language: {language.toUpperCase()}
          </div>
        </div>

        {/* Code Display */}
        <div className="code-output bg-gray-900 p-2 rounded-md" style={{ height: 'calc(100vh - 200px)' }}>
          {isEditMode ? (
            <textarea
              className="w-full h-full text-sm text-white bg-gray-800 p-2 rounded-md"
              value={editableCode}
              onChange={(e) => setEditableCode(e.target.value)}
            />
          ) : (
            <pre className="whitespace-pre-wrap text-sm text-white">{editableCode}</pre>
          )}
        </div>

        {/* Button */}
        <div className="fixed bottom-0 p-4 bg-gray-900 flex justify-between items-center space-x-7">
        <ActionButton
          onClick={handleExecute}
          activeIndicator={<CogIcon className="w-5 h-5 relative" />}
          isActive={true}
          buttonText="Execute"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        />
        <ActionButton
          onClick={toggleEditMode}
          activeIndicator={isEditMode ? <XMarkIcon className="w-5 h-5 relative" /> : <PencilIcon className="w-5 h-5 relative" />}
          isActive={true}
          buttonText={isEditMode ? "Save" : "Edit"}
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        />
        <ActionButton
          onClick={handleCancel}
          activeIndicator={<XMarkIcon className="w-5 h-5 relative" />}
          isActive={true}
          buttonText="Cancel"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        />
      </div>
    </div>
    );
  };

  const CodeScoring = ({ codeQualityScore,vulnerabilitiesCount,bandit_result,llm_scaned }) => {
    return (
      <div className="response-container bg-gray-900 p-2 rounded-md shadow">
        {/* Title Line with Score and Language */}
        <div className="title-line flex justify-between items-center mb-2">
          <div className="language text-xl font-semibold text-white">
            Code Scoring
          </div>
        </div>
        {/* Scoring Display */}
        <div className="flex space-x-4 p-4 bg-gray-900">
        {/* Card 1: Code Quality Testing */}
        <div className="w-44 h-48 p-5 bg-gray-600 rounded-lg shadow flex-col justify-start items-start inline-flex">
          <div className="self-stretch h-36 flex-col justify-between items-start flex">
            <div className="self-stretch h-20 flex-col justify-center items-start gap-1 flex">
              <div className="w-8 h-8 bg-teal-50 rounded-full flex justify-center items-center mx-auto">
                {/* Icon placeholder */}
                <CodeBracketIcon className="w-4 h-4 text-gray-800" />
              </div>
              <div className="self-stretch text-gray-200 text-base font-sans leading-normal" style={{ fontFamily: 'sans-serif' }}>Code Quality Testing</div>
            </div>
            <div className="p-2.5 bg-gray-50 rounded-lg flex justify-center items-center">
              <div className="text-center text-emerald-400 font-bold text-base font-sans leading-normal" style={{ fontFamily: 'sans-serif' }}>{codeQualityScore}/100</div>
            </div>
          </div>
        </div>

        {/* Card 2: Vulnerabilities Testing */}
        <div className="w-44 h-48 p-5 bg-gray-600 rounded-lg shadow flex-col justify-start items-start inline-flex">
          <div className="self-stretch h-36 flex-col justify-between items-start flex">
            <div className="self-stretch h-20 flex-col justify-center items-start gap-1 flex">
              <div className="w-8 h-8 bg-teal-50 rounded-full flex justify-center items-center mx-auto">
                {/* Icon placeholder */}
                <img src="/bug.svg" alt="bug" className="w-4 h-4" />
              </div>
              <div className="self-stretch text-gray-200 text-base font-sans leading-normal" style={{ fontFamily: 'sans-serif' }}>Vulnerabilities Testing</div>
            </div>
            <div className="p-2.5 bg-gray-50 rounded-lg flex justify-center items-center">
              <div className="text-center text-emerald-400 font-bold text-base font-sans leading-normal" style={{ fontFamily: 'sans-serif' }}>{vulnerabilitiesCount ? vulnerabilitiesCount : 0} Threats Found</div>
            </div>
          </div>
        </div>

        {/* Card 3: Sandbox Execution Testing */}
        <div className="w-44 h-48 p-5 bg-gray-600 rounded-lg shadow flex-col justify-start items-start inline-flex">
          <div className="self-stretch h-36 flex-col justify-between items-start flex">
            <div className="self-stretch h-20 flex-col justify-center items-start gap-1 flex">
              <div className="w-8 h-8 bg-teal-50 rounded-full flex justify-center items-center mx-auto">
                {/* Icon placeholder */}
                <img src="/bug.svg" alt="bug" className="w-4 h-4" />
              </div>
              <div className="self-stretch text-gray-200 text-base font-sans leading-normal" style={{ fontFamily: 'sans-serif' }}>Sandbox Execution Testing</div>
            </div>
            <div className="p-2.5 bg-gray-50 rounded-lg flex justify-center items-center">
              <div className="text-center text-emerald-400 font-bold text-base font-sans leading-normal" style={{ fontFamily: 'sans-serif' }}>Success</div>
            </div>
          </div>
        </div>
      </div>

      <div className="response-details-container">
          {/* Code Scanning Result */}
          {bandit_result && bandit_result.length > 0 &&
            <div className="rounded-md bg-red-400 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <XCircleIcon className="w-4 h-4 relative text-red-700" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Code scanning</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <ul role="list" className="list-disc space-y-1 pl-5">
                      {bandit_result.map((result, index) => (
                        <li key={index}>{result.issue_text}</li> // Displaying the issue_text of each result
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          }

          {/* Attention Needed Result */}
          { llm_scaned &&
            <div className="rounded-md bg-yellow-100 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Attention needed</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <ul role="list" className="list-disc space-y-1 pl-5">
                      {/* {llm_scaned.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))} */}
                      <li>{llm_scaned}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    );
  };

  const handleClick = (buttonName) => {
    setActiveButton(buttonName);
    // Perform other actions if needed
  };

  return (
    console.log(searchResponse),
    <div  className="flex h-screen bg-gray-900">
        {/* SideNavBar */}
        <div className="hidden md:flex md:flex-shrink-0 ">
          <SideNavBar />
        </div>
        <div className=" flex-row w-screen overflow-hidden">
        <NavBar />
        {/* Two-column layout */}
        <div className="flex flex-1 overflow-auto">
          <div className="flex-1 w-2/5"> {/* 40% width */}
            {/* Place your content here */}
            { searchResponse && (
              <ResponseDisplay 
                language={Language} 
                code={Code}
                
              />
            )}
          </div>
          {/* Right Column for ResponseDisplay */}
          <div className="flex-1 w-3/5"> {/* 60% width */}
            {/* Place your content here */}
            {(  searchResponse) && (
              <CodeScoring 
                codeQualityScore={searchResponse.interactor_response?.prompter_response?.code_score?.unicore_score} 
                vulnerabilitiesCount={searchResponse.interactor_response?.prompter_response?.code_score?.bandit_result?.vulnerabilities_founded} 
                llm_scaned={searchResponse.interactor_response?.prompter_response?.code_score?.llm_scan_result?.security_vulnerabilities?.explanation}
                bandit_result={searchResponse.interactor_response?.prompter_response?.code_score?.bandit_result?.results_desc}
              />
            )}
          </div>
        </div>
  
        {/* SecondaryNavBar */}
          <div className="absolute  bottom-0 right-0 w-1/4 z-20 h-screen">
            <SecondaryNavBar isOpen={isOpen} toggleSidebar={toggleSidebar} />
          </div>
  
        {/* Search Dropdown */}
        {showLoadingSteps && !searchResponse && (
          <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center justify-center space-y-4 pb-4" style={{ width: '-webkit-fill-available' }}>
            {/* LoadingSteps div */}
            {isSearching && (
              <div className="mb-4 w-full px-4">
              <div className="max-w-lg mx-auto"> {/* Adjust max-width as needed */}
                <LoadingSteps searchResponse={searchResponse} setShowLoadingSteps />
              </div>
            </div>
            )}

            {/* SearchDropdown div */}
            <div className="w-full flex justify-end">
              <div className="max-w-7xl">
                <SearchDropdown handleSearch={handleSearch} />
              </div>
            </div>
          </div>
        )}
        </div>
        </div>
  );
  
};

export default Terminal;
