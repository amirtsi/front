import React, { useState,useEffect,useRef } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { CheckCircleIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import ActionButton from '../common/ActionButton';
import { Fragment } from 'react';
;

function SecondaryNavBar({ isOpen, toggleSidebar }) {
  const [activeButton, setActiveButton] = useState(null);
  const [selected, setSelected] = useState(null);
  const [clicked, setClicked] = useState(true);
  const [isGoogleBardAvailable, setIsGoogleBardAvailable] = useState(false);
  

  const handleshow = () => {
    setClicked(!clicked);
  };

  const handleClick = (buttonName) => {
    setActiveButton(buttonName);
    // Perform other actions if needed
  };

  const handelselected = (option) => {
    setSelected(option);
    setClicked(false);
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const options = [
    { id: 1, name: 'Create new Automation' },
    { id: 2, name: 'Execute Automation from bank' },
    { id: 3, name: 'Ask General Inquiry Using bank' },
    { id: 4, name: 'Ask General Inquiry Internal about your ENV' },
    { id: 5, name: 'Show Unicore Insights & Recommendations' },
  ];

  return (
    <div className="absolute top-16 right-0 w-full h-full ">
      {/* Sidebar Overlay */}
      {isOpen && (
        <div className="absolute top-0 right-0 w-full h-full bg-gray-800 ">
          <div className="flex flex-col inset-0 bg-gray-800 w-full bg-opacity-75 transition-opacity"></div>
          {/* Right Sidebar Content */}
          <div className="absolute right-0 top-0  h-full bg-gray-800  " style={{ width: '-webkit-fill-available' }}>
            <div className="py-10 px-7">
              <div className="Button mt-4 px-3 py-2 absolute left-4 top-4 bg-gray-800 rounded-lg border border-gray-600 justify-center items-center gap-2 inline-flex" onClick={toggleSidebar}>
                <div className="Text text-white text-xs font-sans" style={{ fontFamily: 'sans-serif' }}>
                  <ActionButton
                    className="Button w-10 h-5 px-3 py-1 bg-gray-800 "
                    onClick={toggleSidebar}
                    buttonText="Close"
                  />
                </div>
                <div className="ChevronRight w-3 h-3 relative" />
              </div>
              <h1 className="text-2xl font-semibold text-white mt-14">Choose LLM Provider:</h1>
              <div className="mt-4 space-y-4">
                {/* ActionButton Component */}
                <div className="Frame31 w-60 h-28 relative text-2xl font-bold bg-gray-700 rounded-lg shadow border-2 border-white">
                  <ActionButton
                    className={`Content h-16 left-4 top-4 absolute flex-col justify-start text-white items-start gap-3 inline-flex ${activeButton === 'ChatGPT' ? 'bg-opacity-100' : ''}`}
                    onClick={() => handleClick('ChatGPT')}
                    isActive={activeButton === 'ChatGPT'}
                    activeIndicator={<CheckCircleIcon className="CheckCircle w-5 h-5 absolute top-0 left-0" />}
                    icon={<img src="/OpenAI_Logo 1.svg" alt="ChatGPT" />}
                    iconPosition="left"
                    includeTextField={true}
                    buttonText="OpenAI"
                  >
                    {/* Additional content */}
                  </ActionButton>
                </div>

                {/* ActionButton Component */}
                {isGoogleBardAvailable ? (
                  <div className="Frame31 w-60 h-28 relative bg-gray-600  rounded-lg shadow border-2 border-white">
                    <ActionButton
                      className={`Content h-16 left-4 top-4 text-2xl font-bold absolute flex-col justify-start text-white items-start gap-3 inline-flex ${activeButton === 'GoogleBard' ? 'bg-opacity-100' : ''}`}
                      onClick={() => handleClick('GoogleBard')}
                      isActive={activeButton === 'GoogleBard'}
                      activeIndicator={<CheckCircleIcon className="CheckCircle w-5 h-5 absolute top-0 left-0" />}
                      icon={<img src="/image 3google Bard.svg" alt="GoogleBard" />}
                      iconPosition="left"
                      includeTextField={true}
                      buttonText="Google Bard"
                    >
                      {/* Additional content */}
                    </ActionButton>
                  </div>
                ) : (
                  <div className="Frame31 w-60 h-28 relative bg-gray-600 rounded-lg shadow border-2 ">
                    {/* "Coming Soon" text with blur effect */}
                    <div className="Content absolute inset-0 flex flex-col justify-center items-center backdrop-blur-lg">
                      <img src="/image 3google Bard.svg" alt="GoogleBard" className="w-16  blur-sm h-9" />
                      <div className="ComingSoon text-center text-gray-200 text-lg font-medium font-['Inter'] leading-snug">Coming soon</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 space-y-4">
              {/* Selection Menu */}
              <Menu as="div" className="relative justify-center inline-block text-left">
              <div className='"py-10 px-7'>
                <button
                  onClick={handleshow}
                  className="Input w-auto min-w-80 h-10 p-3 bg-gray-600 text-gray-300 rounded-lg border border-gray-600 flex justify-start items-center" // Updated this line
                >
                  <span className="flex-grow text-left">{selected ? selected.name : 'Options'}</span> {/* Added span for text */}
                  <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                </button>
              </div>

                <Transition
                  show={clicked}
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <div className="flex items-center justify-center">
                    <div className="relative  z-10 mt-2 w-80 origin-top-right rounded-md bg-gray-600 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {options.map((option) => (
                          <button
                            key={option.id}
                            onClick={() => handelselected(option)}
                            className={classNames(
                              selected === option ? 'bg-gray-700 text-gray-300' : 'text-gray-300',
                              'block px-7 py-2 text-sm text-left w-full hover:bg-gray-700'
                            )}
                          >
                            {option.name}
                            {selected === option && (
                              <CheckCircleIcon className="-mr-1 h-5 w-5 text-green-500" aria-hidden="true" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </Transition>
              </Menu>
              {/* Start Button */}
              <div className="Button mt-4 px-3 py-2 absolute left-4 bottom-4 bg-blue-600 rounded-lg border border-gray-600 justify-center items-center gap-2 inline-flex" style={{ width: 'au' }}> {/* Adjust the width as needed */}
                  <div className="Text text-white text-xs font-sans" style={{ fontFamily: 'sans-serif' }}>
                    <ActionButton
                      className="Button w-full h-5 px-3 py-1" // The button will take the full width of the parent div
                      onClick={toggleSidebar}
                      buttonText="Start"
                    />
                  </div> 
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SecondaryNavBar;
