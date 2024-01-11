import {
  CommandLineIcon,
  SquaresPlusIcon,
  ChartBarSquareIcon,
  CircleStackIcon,
  BellIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';

import { Cog6ToothIcon,UserCircleIcon,ChatBubbleBottomCenterIcon,PencilSquareIcon } from '@heroicons/react/20/solid';

import { Link, useLocation } from 'react-router-dom';


const SideNavBar = () => {
  const location = useLocation();


  const navigation = [
    { name: 'Dashboard', href:'#', icon: ChartBarSquareIcon, current: true },
    { name: 'Terminal', href:'/terminal', icon: CommandLineIcon, current: false },
    { name: 'Unicore Canvas', href: '#', icon: SquaresPlusIcon, current: false },
    { name: 'Insights', href: '#', icon:   LightBulbIcon , current: false },
    { name: 'Alerts', href: '#', icon: BellIcon, current: false },
  ];

  const teams = [
    { id: 1, name: 'Integrations', href:'/integrations', icon: CircleStackIcon, current: false },
    { id: 2, name: 'Settings', href: '#', icon: Cog6ToothIcon, current: false },
    { id: 3, name: 'User Management', href: '#', icon: UserCircleIcon, current: false },
    { id: 4, name: 'Audit Logs', href: '#', icon: PencilSquareIcon, current: false },
    { id: 5, name: 'Support', href: '#', icon: ChatBubbleBottomCenterIcon, current: false },
  ];

  return (
    <div className="flex flex-col gap-y-5 overflow-y-auto bg-gray-800 px-6">
      <div className="Group2 w-28 h-8 relative">
      <div className="Group1 left-0  absolute">
      {/* Your logo or company name here */}
         <img
              className="mx-auto h-10 w-auto "
              src="/logo.svg"
              alt="Unicore"
            />
      </div>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${
                      location.pathname === item.href
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                    {item.name}
                    {item.count && (
                      <span
                        className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-gray-900 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-white ring-1 ring-inset ring-gray-700"
                        aria-hidden="true"
                      >
                        {item.count}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <div className="text-xs font-semibold leading-6 text-gray-400"></div>
            <ul role="list" className="-mx-2 mt-2 space-y-1">
              {teams.map((team) => (
                <li key={team.name}>
                  <Link
                    to={team.href}
                    className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${
                      location.pathname === team.href
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                      {team.icon && <team.icon className="h-6 w-6 shrink-0" aria-hidden="true" />}
                    </span>
                    <span className="truncate">{team.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="-mx-6 mt-auto">
            {/* User profile section */}
            {/* Add user-related information and options here */}
            <Link
              to="/profile"
              className="flex items-center gap-x-4 px-6 py-3 text-xl font-semibold leading-6 text-white hover:bg-gray-800"
            >
              {/* User profile image */}
              <span aria-hidden="true">Unicore Admin</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideNavBar;
