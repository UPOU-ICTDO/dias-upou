import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import CloseBtn from '../buttons/CloseBtn';


/**
 * This component is a modal window that displays the contents passed into it.
 */
const Modal = ({
    openModal,          // {boolean} will indicate whether the modal window should be shown or not
    handleClose,        // {function} used for the close button of the modal window
    modalTitle,         // {string} title to be displayed for the modal window
    modalSize,          // {string} tailwind class for the size of the modal window
    ...props            // will catch any other props
}) => {
   
    return (
        // Using the `Transition` component at the root level
        <Transition show={openModal} as={Fragment}>

            {/* Wrapping everything with dialog component */}
            <Dialog as="div" className="relative z-30" onClose={handleClose}>
                
                {/* Transition effect for the element inside this Transition.Child tag*/}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    {/* Overlay behind the modal window */}
                    <div className="fixed inset-0 bg-black bg-opacity-25"/>
                </Transition.Child>

                {/* Transition effect for the element inside this Transition.Child tag*/}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    {/* Container for the layer containing the modal window */}
                    <div className="fixed inset-0 flex items-center overflow-visible justify-center p-4">
                        
                        {/* The actual modal window  */}
                        <Dialog.Panel className={`w-full ${modalSize} overflow-scroll transform rounded-2xl bg-white px-5 text-left align-middle shadow-xl transition-all`}>

                            {/* Close Button */}
                            <CloseBtn handleClose={handleClose}/>

                            {/* Window Title */}
                            <Dialog.Title
                                as="div"
                                className="flex justify-center mt-6 mb-2 text-sm sm:text-xl font-inter font-semibold"
                            >
                                {modalTitle}
                            </Dialog.Title>

                            {/* Window Body */}
                            {props.children}
                        </Dialog.Panel>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
};


export default Modal;