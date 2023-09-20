import { useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import {
    Form,
    Field,
    FormikProvider,
    useFormik
} from 'formik';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

/* Components */
import CircleBtns from '../../../components/buttons/CircleBtns';
import Dropdown from '../../../components/forms/DropdownSelect1';
import InputField from '../../../components/forms/InputField';
import Modal from '../../../components/layouts/Modal';
import PrimaryButton from '../../../components/buttons/PrimaryBtn';
import SecondaryButton from '../../../components/buttons/SecondaryBtn';

/* Utility functions */
import { putFetch, deleteFetch } from '../../../utils/apiRequest';
import {
    statusOptions,
    officeOptions,
    buildingOptions,
    locationOptions
} from '../../../utils/objectProperties';
import uri from './../../../uri';
import { useEffect } from 'react';



/**
 * This component is a modal window used to edit or delete an inventory item.
 */
const EditDeleteItemModal = ({ data, index, setData }) => {

    // State handler for modal window
    const [isOpen, setIsOpen] = useState(false);
    // State handler for selected building
    const [building, setBuilding] = useState('');
    // State handler for filtered options for exact locations
    const [locations, setLocations] = useState([]);


    // Function to close the modal window
    function handleClose() {
        setIsOpen(false);
        // TODO: Reset input fields
    }

    // Formik setup for input fields
    const inputSetup = useFormik({
        // Setup initial values for the fields
        initialValues: {
            _id: data[index]._id,
            status: data[index].status,
            MACAddress: data[index].MACAddress,
            serialNumber: data[index].serialNumber,
            vendor: data[index].vendor,
            building: '',
            exactLocation: '',
            office: data[index].office,
            currentUser: data[index].currentUser,
            notes: data[index].notes
        },
        // Submit handler
        onSubmit: (values) => {
            // perform PUT request
            handleEdit(values, data)

            // Close modal window and reset input fields
            setIsOpen(false);
            // TODO: Reset input fields
        },
        // For form validation and errors
        validationSchema: Yup.object({
            status: Yup.string().required('Status is required'),
            MACAddress: Yup.string().matches(
                // MAC Addresses can be six pairs of characters separated by hyphens or colons
                // or three groups of hexadecimal digits separated by dots.
                /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})|([0-9a-fA-F]{4}\\.[0-9a-fA-F]{4}\\.[0-9a-fA-F]{4})$/i,
                'Please enter a valid MAC Address'
            ),
            building: Yup.string().required('Building is required'),
            exactLocation: Yup.string().required('Exact location is required'),
            office: Yup.string().required('Current Office is required'),
            currentUser: Yup.string().required('Current User is required'),
        }),
    });

    // To be used for filtering options
    const filterOptions = [
        { label: "Building", name: "building", options: buildingOptions },
        { label: "Exact location", name:"location", options: locationOptions },
    ]

    // Filter out the options for exact locations based on the building selected
    useEffect(() => {
        let temp = [...locations];
        filterOptions.filter(
            (fields) => {
                if (fields.name === 'location') {
                    fields.options.filter((obj) => {
                        if (obj.link === building) {
                            temp.unshift(obj);
                        }
                    })
                }
            }
        )
        setLocations(temp);
    }, [building]);

    
    // Handles PUT request for inventory item updates
    function handleEdit(values) {

        // get array index of object that was changed
        let targetIndex = data.findIndex(obj => obj._id == data[index]._id);
        let updateInventory = [...data];

        // Setup values for the fields
        updateInventory[targetIndex] = {
            _id: values._id,
            deviceName: data[index].deviceName.toUpperCase(),
            status: values.status,
            category: data[index].category,
            MACAddress: values.MACAddress,
            purchaseDate: data[index].purchaseDate,
            repletionDate: data[index].repletionDate,
            serialNumber: values.serialNumber.toUpperCase(),
            vendor: values.vendor.toUpperCase(),
            building: values.building,
            exactLocation: values.exactLocation,
            office: values.office,
            currentUser: values.currentUser,
            notes: values.notes
        }

        // Perform PUT request
        putFetch(`${uri.backend}/inventory/${data[targetIndex]._id}`, updateInventory[targetIndex])
            .then((val) => {
                // Display popup boxes whether the action is successful or not
                if (!val) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Server Error',
                        text: 'Failed to update inventory item.',
                    });
                } else {
                    setData([...updateInventory]);
                    Swal.fire(
                        'Success',
                        'Inventory item has been updated successfully.',
                        'success'
                    );
                }
            }
        );
    }

    // This function is used to handle deletion of inventory items.
    function handleDelete() {

        // Popup window for confirmation of action
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#7b7b7b',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'

        }).then((result) => {

            // Deletion is confirmed
            if (result.isConfirmed) {

                // Perform DELETE request
                deleteFetch(uri.backend + "/inventory/", `${data[index]._id}`)
                    .then((val) => {
                        // Check if action is successful
                        if (!val) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Server Error',
                                text: 'Failed to delete inventory item.',
                            })
                        } else {
                            // Get array index of object that was deleted
                            let targetIndex = data.findIndex(obj => obj._id == data[index]._id);

                            // Update UI by splicing data from list
                            let newData = [...data];
                            newData.splice(targetIndex, 1);
                            setData([...newData]);

                            // Completion of action
                            Swal.fire(
                                'Deleted!',
                                'Inventory item record has been deleted!',
                                'success'
                            );
                        }
                    });
            };
        });
    };

    // Styling
    const circleBtnStyle=`bg-light-blue p-[1vw] sm:p-1.5 text-dark-blue hover:bg-dark-blue hover:text-light-blue`

    return (
        <>
            {/* Button that will trigger the modal window */}
            <CircleBtns
                style={circleBtnStyle}
                textLeft="Edit Item"
                textRight="Delete Item"
                handleLeft={() => setIsOpen(true)}
                handleRight={() => handleDelete()}
            >
                <PencilIcon className="w-[4.5vw] mx-auto sm:w-full"/>
                <TrashIcon className="w-[4.5vw] mx-auto sm:w-full"/>
            </CircleBtns>

            {/* Modal Window */}
            <Modal
                openModal={isOpen}
                handleClose={handleClose}
                modalTitle="Edit Item Details"
                modalSize="max-w-3xl"
            >
                {/* Forms */}
                <FormikProvider value={inputSetup} enableReinitialize={true} officeOptions={officeOptions }>
                    <Form className="mt-4 font-inter text-sm sm:text-base lg:text-lg">

                        {/* Modal Body */}
                        <div className="px-5">
                            
                            {/* Device Name */}
                            <div className="flex space-x-10 font-medium">
                                <span>Device Name</span>
                                <span>{data[index].deviceName}</span>
                            </div>

                            <div className="lg:flex mt-4">
                                {/* Status */}
                                <Dropdown
                                    label="Status *"
                                    name="status"
                                    dropdownStyle="lg:w-1/2 lg:pr-5"
                                    className="font-inter max-w-xl"
                                    options={statusOptions}
                                    onChange={value => {
                                        inputSetup.setFieldValue('status', value.value)                          
                                    }}
                                    value={inputSetup.values.status}
                                />

                                {/* MAC Address */}
                                <InputField
                                    width="lg:w-1/2 font-inter lg:pl-5"
                                    inputStyle="font-inter w-full px-[0.5rem] h-[2.7rem] rounded"
                                    labelStyle="text-sm lg:text-base font-montserrat font-semibold mt-2 block mb-[1vh]"
                                    label="MAC Address"
                                    id="MACAddress"
                                    name="MACAddress"
                                    placeholder="XX : XX : XX : XX : XX : XX"
                                    helpText="Can be six pairs of characters separated by colons or hyphens, or 
                                                3 groups of four hexadecimal characters separated by dots."
                                    type="text"
                                />
                            </div>

                            <div className="lg:flex mt-2">
                                {/* Serial Number */}
                                <InputField
                                    width="lg:w-1/2 font-inter lg:pr-5"
                                    inputStyle="font-inter w-full px-[0.5rem] h-[2.7rem] rounded"
                                    labelStyle="text-sm lg:text-base font-montserrat font-semibold mt-2 block mb-[1vh]"
                                    label="Serial Number"
                                    id="serialNumber"
                                    name="serialNumber"
                                    placeholder="Serial Number"
                                    type="text"
                                />

                                {/* Vendor */}
                                <InputField
                                    width="lg:w-1/2 font-inter lg:pl-5"
                                    inputStyle="font-inter w-full px-[0.5rem] h-[2.7rem] rounded"
                                    labelStyle="text-sm lg:text-base font-montserrat font-semibold mt-2 block mb-[1vh]"
                                    label="Vendor"
                                    id="vendor"
                                    name="vendor"
                                    placeholder="Vendor Name"
                                    type="text"
                                />
                            </div>

                            <div className="lg:flex mt-2">
                                {/* Building */}
                                <Dropdown
                                    label="Building *"
                                    dropdownStyle="lg:w-1/2 lg:pr-5"
                                    className="font-inter max-w-xl"
                                    options={buildingOptions}
                                    onChange={value => {
                                        setLocations([]);           // empty out the locations array
                                        setBuilding(value.value);   // set the selected building
                                        inputSetup.setFieldValue('building', value.value);
                                    }}
                                    value={inputSetup.values.building}
                                />    

                                {/* Exact Location */}
                                <Dropdown
                                    label="Exact Location *"
                                    dropdownStyle="lg:w-1/2 lg:pl-5"
                                    className="font-inter max-w-xl"
                                    options={locations}
                                    onChange={value => {
                                        inputSetup.setFieldValue('exactLocation', value.value)                          
                                    }}
                                    value={inputSetup.values.exactLocation}
                                />
                            </div>

                            <div className="lg:flex mt-2">
                                {/* Current Office */}
                                <Dropdown
                                    label="Current Office *"
                                    dropdownStyle="lg:w-1/2 lg:-mt-2 lg:pr-5"
                                    className="font-inter max-w-xl"
                                    options={officeOptions}
                                    onChange={value => {
                                        inputSetup.setFieldValue('office', value.value)                          
                                    }}
                                    value={inputSetup.values.office}
                                />
                                
                                {/* Current User */}
                                <InputField
                                    width="lg:w-1/2 font-inter lg:pl-5"
                                    inputStyle="font-inter w-full px-[0.5rem] h-[2.7rem] rounded"
                                    labelStyle="text-sm lg:text-base font-montserrat font-semibold block mb-[1vh]"
                                    label="Current User *"
                                    id="currentUser"
                                    name="currentUser"
                                    placeholder="Current User"
                                    type="text"
                                />
                            </div>

                            {/* Notes */}
                            <div className="w-full">
                                <span className="text-sm lg:text-base font-montserrat font-semibold mt-4 block mb-[1vh]">Notes</span>
                                
                                {/* Textarea */}
                                <div className="border border-gray-300 p-1 rounded-xl">
                                    <Field
                                        className='w-full h-20 p-1 pl-2 sm:pl-2.5 rounded font-inter text-sm sm:text-base lg:text-lg'
                                        name="notes"
                                        component="textarea"
                                        placeholder="Type to add a note..."
                                    />
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex float-right space-x-2 my-6 -mr-2">
                                <PrimaryButton
                                    type="submit"
                                    textSize="text-xs sm:text-sm lg:text-base"
                                    isDisabled={!inputSetup.isValid || !inputSetup.dirty}
                                >
                                    Save
                                </PrimaryButton>
                                <SecondaryButton
                                    type="reset"
                                    textSize="text-xs sm:text-sm lg:text-base"
                                    handleClick={() => {
                                        inputSetup.setFieldValue('status', '');
                                        inputSetup.setFieldValue('office', '');
                                        handleClose();
                                    }}
                                >
                                    Cancel
                                </SecondaryButton>
                                </div>
                            </div>
                    </Form>
                </FormikProvider>
            </Modal>
        </>
    );
};


export default EditDeleteItemModal;