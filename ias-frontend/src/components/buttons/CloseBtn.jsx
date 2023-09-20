import { XIcon } from '@heroicons/react/solid';


/** 
 * This component is a close button used for all kinds of modal windows
 * Props:
 *   handleClose --- {function} handles onClick event for the button
 */
const CloseBtn = ({ handleClose }) => {
    return (
        <XIcon
            className="cursor-pointer absolute top-3 right-3 w-4 sm:w-5 hover:text-gray-500 hover:transition-all hover:ease-in"
            onClick={handleClose}
        />
    );
};


export default CloseBtn;