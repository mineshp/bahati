import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon, UserIcon } from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';

const navigation = [
  { name: 'Dashboard', href: '/', current: true },
  { name: 'Watchlists', href: '#', current: false }
]

const shares = [
  { name: 'VOW.DE', href: "/shares/VOW3.DE", logo: "/_static/logos/vw.png" },
  { name: 'NFLX', href: "/shares/NFLX", logo: "/_static/logos/netflix.png" },
  { name: 'BP.L', href: "/shares/BP.L", logo: "/_static/logos/bp.png" },
  { name: 'TSLA', href: "/shares/TSLA", logo: "/_static/logos/tesla.png" },
  { name: 'SPCE', href: "/shares/SPCE", logo: "/_static/logos/spce.jpg" },
  { name: 'ROO.L', href: "/shares/ROO.L", logo: "/_static/logos/deliveroo.jpeg" },
  { name: 'ENR', href: "/shares/ENR", logo: "/_static/logos/energizer.png" },
  { name: 'BABA', href: "/shares/BABA", logo: "/_static/logos/baba.png" },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface Props {
  user: {
    id: string,
    username: string
  } | null
}

export default function NavBar(props: Props) {
  const { user } = props;
  
  return (
    user?.username ?
    <Disclosure as="nav" className="bg-indigo-200">
      {({ open }) => (
        <>
          <div className="px-2 max-w-8xl sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-indigo-500 rounded-md hover:text-white hover:bg-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                <div className="flex items-center flex-shrink-0">
                  <img
                    className="block w-auto h-10 lg:hidden"
                    src="/_static/bahati_logo.png"
                    alt="Workflow"
                  />
                  <img
                    className="hidden w-auto h-10 lg:block"
                    src="/_static/bahati_logo.png"
                    alt="Workflow"
                  />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'text-rose-600' : 'text-white hover:bg-rose-600 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Menu as="div" className="relative inline-block text-left">

      <div>
        <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md hover:bg-rose-600 bg-rose-300">
          { 'Shares' }
          <ChevronDownIcon className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 w-40 mt-2 origin-top-right bg-white rounded-md shadow-lg sm:w-56 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
          {shares.map((shareItem) => (
            <Menu.Item key={shareItem.name}>
            {({ active }) => (
              <div className='flex hover:bg-rose-50'>
              <a
                href={shareItem.href}
                className={classNames(
                  active ? 'bg-rose-50 text-indigo-900' : 'text-indigo-700',
                  'block px-4 py-2 text-sm grow'
                )}
              >
                {shareItem.name}
              </a>
              <span className='flex-none pr-2 my-auto'><img className="w-8 min-h-8" src={shareItem.logo} alt={shareItem.name}></img></span>
              </div>
            )}
          </Menu.Item>
          ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
    
    {/* Profile dropdown */}
      { user?.username
        ?
          <Menu as="div" className="relative z-20 ml-3">
            <div>
              <Menu.Button className="flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span className="sr-only">Open user menu</span>
                {
                  user?.username
                  ?  <img
                    className="w-8 h-8 rounded-full"
                    src="/_static/min-profile.jpg"
                    alt={user?.username ? user?.username : 'Not logged in'}
                  />
                  : <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                }
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                    >
                      Your Profile
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                    >
                      Settings
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <form action="/logout" method="post">
                    <button type="submit" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                      Sign out
                    </button>
                    </form>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        :
        <UserIcon className="block w-6 h-6 ml-2 text-slate-600" aria-hidden="true" />
      }
        </div>
      </div>
    </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-rose-300 text-white' : 'text-rose-400 hover:bg-rose-600 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
    :
    <Disclosure as="nav" className="bg-indigo-200">
      {({ open }) => (
        <>
          <div className="px-2 max-w-8xl sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
              </div>
              <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                <div className="flex items-center flex-shrink-0">
                  <img
                    className="block w-auto h-10 lg:hidden"
                    src="/_static/bahati_logo.png"
                    alt="Workflow"
                  />
                  <img
                    className="hidden w-auto h-10 lg:block"
                    src="/_static/bahati_logo.png"
                    alt="Workflow"
                  />
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
    
        <UserIcon className="block w-6 h-6 ml-2 text-slate-600" aria-hidden="true" />
        </div>
      </div>
    </div>
        </>
      )}
    </Disclosure>
  )
}