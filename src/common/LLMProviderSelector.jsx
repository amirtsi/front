import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon,CheckCircleIcon } from '@heroicons/react/20/solid';
import ActionButton from '../common/ActionButton';

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
 
  const LLMProviderSelector = ({ options, providers, providor,selectedOption, setSelectedOption, handleClick }) => {
    return (
      <div className="flex">
        <div className="py-6 px-4">
          <h1 className="text-2xl font-semibold text-white">Choose LLM Provider:</h1>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {providers.map((provider, index) => (
              <ActionButton
                key={index}
                className={`relative w-238 h-118 bg-white p-2 rounded-md border-2 border-gray-300 shadow-md hover:shadow-lg transition duration-300`}
                onClick={() => handleClick(provider.name)}
                isActive={provider?.name === provider.name}
                activeIndicator={<CheckCircleIcon className="w-5 h-5 relative" />}
                icon={<img src={provider.icon} alt={provider.name} />}
                includeTextField={true}
                buttonText={provider.name}
              />
            ))}
          </div>
  
          <Listbox value={selectedOption} onChange={setSelectedOption}>
            {({ open }) => (
              <div className="relative mt-2">
                <Listbox.Label className="block text-sm font-medium leading-6 text-white">Selection menu</Listbox.Label>
                <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-12 text-left text-lg text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-lg sm:leading-7">
                  <span className="block truncate">{selectedOption.name}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </Listbox.Button>
                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {options.map((option, index) => (
                      <Listbox.Option
                        key={index}
                        className={({ active }) => classNames(active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-8 pr-4')}
                        value={option}
                      >
                        {({ selected, active }) => (
                          <>
                            <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                              {option.name}
                            </span>
                            {selected && (
                              <span
                                className={classNames(active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 left-0 flex items-center pl-1.5')}
                              >
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            )}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            )}
          </Listbox>
        </div>
      </div>
    );
  };

export default LLMProviderSelector;
