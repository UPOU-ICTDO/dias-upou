import 'tippy.js/dist/tippy.css';
import Tippy from '@tippyjs/react';
import { followCursor } from 'tippy.js';
import { useState } from 'react';

/* Components */
import Modal from '../../../components/layouts/Modal';

/* Utility functions */
import { convertString } from '../../../utils/convertString';
import { itemFieldsView } from '../../../utils/objectProperties';


/**
 * This component is a modal window used to display information about the inventory item clicked.
 */
const ViewItemModal = ({
    style,          // {string} styling for the container that will trigger the modal window
    data,           // {data} data to be displayed in the modal window
    ...props        // will catch any other props
}) => {

    // State handler for modal window
    const [isOpen, setIsOpen] = useState(false);

    // Function to close the modal window
    const handleClose = () => {
        setIsOpen(false);
    }

    return (
        <>
            {/* Wrapping the container that will trigger the modal window with a tooltip. */}
            <Tippy
                content={<span>Click to view item details</span>}
                followCursor="initial"
                plugins={[followCursor]}
            >
                <div className={style} onClick={() => setIsOpen(true)}>{props.children}</div>
            </Tippy>

            {/* Modal Window */}
            <Modal
                openModal={isOpen}
                handleClose={handleClose}
                modalTitle="Item Details"
                modalSize="max-w-lg"
            >
                {/* Modal Body */}
                <div className="mt-[3vw] mb-[5vw] sm:my-6 font-inter text-[3.75vw] sm:text-lg">
                    
                    {/* Table */}
                    <div className="table m-auto">
                        {/* Table Body */}
                        <div className="table-row-group">
                            {/* Mapping object field into the table */}
                            {Object.entries(data).map(([key, val]) => 
                                // Table Row
                                <div key={key} className="table-row justify-center">
                                    <div className="table-cell font-medium w-1/2 sm:w-48 sm:pl-5">{itemFieldsView[key]}</div>
                                    
                                    {/* Since the value of the category field is in Pascal case joined together by underscores,
                                    we need to convert it first to title casing before displaying it. */}
                                    {key === "category" ?
                                        <div className="table-cell break-words pr-5">
                                                {convertString(val)}
                                        </div>
                                    
                                    // Checking if the field is _id
                                    : key === "_id" ?
                                            <></>   // Do not display _id in the UI
                                    
                                    //If field is a date convert it to date string    
                                    : key === "purchaseDate" || key==="repletionDate"?
                                        <div className="table-cell break-words pr-5">
                                            {new Date(val*1000).toLocaleDateString("en-US")}
                                        </div>
                                        :
                                            // Else, display value for all other fields
                                            <div className="table-cell break-words pr-5">
                                                {/* Display "--" if field value is an empty string. */}
                                                { val === "" ? "--" : val}
                                            </div>
                                    }
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Invisible focusable element inside the window to prevent component error. */}
                <button className="opacity-0 absolute bottom-0"/>
            </Modal>
        </>
    );
};


export default ViewItemModal;