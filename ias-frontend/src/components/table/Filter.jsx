import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon } from '@heroicons/react/solid';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

// Component
import FilterList from './FilterList';


/**
 * This component will be used as filter options that is implemented as a popover on the left side of the search bar.
 */
export default function Filter({ params, setParams }) {
    return (
        <Popover className="w-full">
            {({ open }) => (
                <>
                    {/* Popover button to open and close the filter options */}
                    <Tippy content={<span>Choose Filters</span>}>
                        <Popover.Button
                            className={` ${open ? '' : ''}
                                inline-flex items-center rounded-xl px-3 py-2 text-base font-medium text-white group
                                bg-dark-blue hover:bg-light-blue hover:border-dark-blue transition duration-150 ease-in-out
                                focus:outline-none focus:ring-2 focus:ring-dark-blue focus:ring-opacity-25`}
                        >
                            <MenuIcon
                                className={`${open ? '' : ''}
                                w-5 sm:w-7 fhd:w-[1.5vw] text-light-blue group-hover:text-dark-blue transition duration-150 ease-in-out`}
                                aria-hidden="true"
                            />
                        </Popover.Button>
                    </Tippy>
                    
                    {/* Transition Effect */}
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        {/* List of filters available */}
                        <Popover.Panel className="z-10 lg:z-50 mt-3">
                            <FilterList
                                params={params}
                                setParams={setParams}
                            />
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    );
};
