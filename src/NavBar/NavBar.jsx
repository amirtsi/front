import { Fragment, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { useLocation,useHistory } from 'react-router-dom';
import ActionButton from '../common/ActionButton';



export default function NavBar() {
  const location = useLocation();
  const history = useHistory();
  const currentPage = location.pathname.split('/')[1] || 'Home';

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // You can perform the search logic here, e.g., update state or make an API request.
    console.log('Search query:', searchQuery);
    history.push('/terminal');
  };


  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
            {/* Display Current Page */}
            <div className="text-white text-xl font-sans" style={{ fontFamily: 'sans-serif' }}>
              {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
            </div>

            <div className="w-1/4 flex items-center gap-2">
            <div className="relative flex-1">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                id="search"
                name="search"
                className="block w-full rounded-md border-0 bg-gray-700 py-1.5 pl-10 pr-3 text-gray-300 placeholder:text-gray-400 focus:bg-white focus:text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <ActionButton
              onClick={handleSearch}
              className="w-full sm:w-auto px-5 py-1.5 bg-blue-500 text-white rounded-lg shadow border border-blue-800 justify-center items-center gap-2 inline-flex"
              includeTextField={true}
              buttonText='Ask Unicore'
            />
          </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
