import React, { useState, useEffect } from 'react';
import { CheckIcon, ArrowPathIcon } from '@heroicons/react/20/solid';

function LoadingSteps(searchResponse) {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const handleStepChange = setInterval(() => {
      if (currentStep === 4 && !searchResponse) {
        // If currentStep is 4 and searchResponse is null (no content), stay at step 4
        setCurrentStep(4);
      } else {
        setCurrentStep((prevStep) => (prevStep < 5 ? prevStep + 1 : 5)); // Stops at step 5
      }
    }, 10000); // Change to next step every 10 seconds
  
    return () => clearInterval(handleStepChange);
  }, [currentStep, searchResponse]);

  const renderStepIcon = (step) => {
    if (step < currentStep) {
      return <CheckIcon className="w-5 h-5 text-green-500" />;
    } else if (step === currentStep) {
      return <ArrowPathIcon className="w-5 h-5 text-blue-500 animate-spin" />;
    }
    return null;
  };

  const steps = [
    'Unicore processes your query',
    'Checks that there are no sensitive details in the query',
    'Builds the code',
    'Runs a cyber analysis on the code',
    'The code is ready, enjoy!'
  ];

  return (
    <div className="p-4 bg-transparent">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">Generate an answer:</h2>
      <ul className="space-y-2">
        {steps.slice(0, currentStep).map((description, index) => (
          <li key={index} className="flex items-center">
            <div className="IconShapes w-8 h-8 p-1.5 bg-gray-700 rounded-lg flex items-center justify-center">
              {renderStepIcon(index + 1)}
            </div>
            <span className="ml-3 text-sm text-gray-700">{description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LoadingSteps;
