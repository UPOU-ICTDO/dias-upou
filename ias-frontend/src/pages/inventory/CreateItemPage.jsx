import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircleIcon } from '@heroicons/react/outline';
import {
    Form,
    Field,
    FormikProvider,
    useFormik
} from 'formik';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

/* Components */
import Dropdown from '../../components/forms/DropdownSelect1';
import InputField from '../../components/forms/InputField';
import PrimaryButton from '../../components/buttons/PrimaryBtn';
import SecondaryButton from '../../components/buttons/SecondaryBtn';

/* Utility functions */
import { postFetch } from '../../utils/apiRequest';
import {
    statusOptions,
    mainCategoryOptions,
    subcategoryOptions,
    officeOptions,
    buildingOptions,
    locationOptions
} from '../../utils/objectProperties';
import uri from './../../uri';



/* This component is used to edit or delete an inventory item. */
const CreateItemPage = () => {

    // State handler for the main category selected
    const [mainCategory, setMainCategory] = useState('');
    // State handler for the filtered options for subcategory
    const [subcategory, setSubcategory] = useState([]);
    // State handler for the building selected
    const [building, setBuilding] = useState('');
    // State handler for the filtered options for exact locations
    const [locations, setLocations] = useState('');

    // To be used for navigating to other pages
    const navigate = useNavigate();

    // Handles POST request for inventory item creation
    const handleAdd = async (values) => {
        
        // Object to be added to inventory
        let newItem = {
            // category: '',
            // subCategory: '',
            deviceName: values.deviceName.toUpperCase(),
            status: values.status,
            category: values.subCategory,
            MACAddress: values.MACAddress,
            purchaseDate: values.purchaseDate,
            repletionDate: values.repletionDate,
            serialNumber: values.serialNumber.toUpperCase(),
            vendor: values.vendor.toUpperCase(),
            building: values.building,
            exactLocation: values.exactLocation,
            office: values.office,
            currentUser: values.currentUser,
            notes: values.notes,
        };

        // Perform POST request
        postFetch(uri.backend + '/inventory', newItem).then((res) => {
            // Checking if the action is successful
            if (!res) {
                Swal.fire({
                    icon: 'error',
                    title: 'Server Error',
                    text: 'Action has been aborted',
                });
            } else {
                Swal.fire(
                    'Success',
                    'Inventory item has been created!',
                    'success'
                );
            };
        })
    }

    // Delay/timeout for forms
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    // Formik setup for input fields
    const inputSetup = useFormik({
        // initial values for the fields
        initialValues: {
            deviceName: '',
            status: '',
            category: '',
            subCategory: '',
            serialNumber: '',
            purchaseDate: '',
            repletionDate: '',
            vendor: '',
            building: '',
            exactLocation: '',
            MACAddress: '',
            office: '',
            currentUser: '',
            notes: ''
        },
        // submit handler
        onSubmit: async (values) => {
            await sleep(500);
            
            // pass submitted values to DB
            handleAdd(values);

            // navigate back to inventory page
            navigate('/inventory');
        },
        // form validation rules
        validationSchema: Yup.object({
            deviceName: Yup.string().required('Device Name is required'),
            status: Yup.string().required('Status is required'),
            category: Yup.string().required('Category is required'),
            subCategory: Yup.string().required('Subcategory is required'),

            purchaseDate: Yup.date()
                .transform((value, originalValue) => {
                    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])\/(19|20)\d{2}$/
                    
                    // convert date to string and check if the date format is correct. if so, convert back to date
                    if (dateRegex.test(originalValue.toString())) return new Date(originalValue)
                    else return originalValue
                })
                .min(new Date(1950, 0, 1), 'Must be later than 1950')
                .max(new Date(), 'Must not be later than current date')
                .typeError('Format: MM/DD/YYYY')
                .required('Puchase Date is required'),
            
            repletionDate: Yup.date()
                .transform((value, originalValue) => {
                    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])\/(19|20)\d{2}$/
                    
                    // convert date to string and check if the date format is correct. if so, convert back to date
                    if (dateRegex.test(originalValue.toString())) return new Date(originalValue)
                    else return originalValue
                })
                .min(Yup.ref('purchaseDate'), 'Must be after purchase date')
                .typeError('Format: MM/DD/YYYY')
                .required('Repletion Date is required'),
            
            building: Yup.string().required('Building is required'),
            exactLocation: Yup.string().required('Exact location is required'),

            MACAddress: Yup.string().matches(
                // MAC Addresses can be six pairs of characters separated by hyphens or colons
                // or three groups of hexadecimal digits separated by dots.
                /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})|([0-9a-fA-F]{4}\\.[0-9a-fA-F]{4}\\.[0-9a-fA-F]{4})$/i,
                'Please enter a valid MAC Address'
            ),

            office: Yup.string().required('Current Office is required'),
            currentUser: Yup.string().required('Current User is required'),
        })
    })


    // Function that will handle cancellation of action and returning to inventory page
    function confirmCancel() {

        // Popup window for confirmation of action
        Swal.fire({
            title: 'Are you sure?',
            text: "Your draft will be discarded!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#2a7146',
            confirmButtonText: 'Discard draft',

        }).then((result) => {

            // Cancellation is confirmed
            if (result.isConfirmed) {
                // Return to inventory page
                navigate('/inventory');
            };
        });
    }


    const dropdowns = [
        { label: "Category", name:"category", options: mainCategoryOptions },
        { label: "Subcategory", name: "subcategory", options: subcategoryOptions },
        { label: "Building", name: "building", options: buildingOptions },
        { label: "Exact location", name:"location", options: locationOptions },
    ]

    // Filter out the options for subcategories based on the main category selected
    useEffect(() => {
        let temp = [...subcategory];
        dropdowns.filter(
            (fields) => {
                if (fields.name === 'subcategory') {
                    fields.options.filter((obj) => {
                        if (obj.link === mainCategory) {
                            temp.unshift(obj);
                        }
                    })
                }
            }
        )
        setSubcategory(temp);
    }, [mainCategory]);


    // Filter out the options for exact locations based on the building selected
    useEffect(() => {
        let temp = [...locations];
        // Go through the dropdowns array
        dropdowns.filter(
            (fields) => {
                // Find the location object
                if (fields.name === 'location') {
                    // Iterate through the properties of location object
                    fields.options.filter((obj) => {
                        // Push the subcategories with link value the same as selected building
                        if (obj.link === building) {
                            temp.unshift(obj);
                        }
                    })
                }
            }
        )
        setLocations(temp);
    }, [building]);


    return (
        // Main Page content
        <div className="bg-gray-50 h-screen w-full lg:w-[87vw] lg:absolute lg:top-0 lg:right-0 overflow-y-scroll">

            {/* Header */}
            <div className="px-[4vw] lg:px-[2.25vw] pt-[3vw] sm:pt-[1.5vw] flex text-lg sm:text-2.5xl fhd:text-[1.75vw] font-montserrat font-bold">
                <span>Create New Inventory Item</span>
                <PlusCircleIcon className="hidden lg:block lg:w-7 fhd::w-[1.5vw] ml-3" />
            </div>

            <hr className='mt-3 lg:mt-7 border-1 border-gray-300 lg:border-dark-blue' />
            
            {/* Page Body */}
            <div className='m-10 lg:p-10'>
                <FormikProvider value={inputSetup}>
                    <Form>
                        <div className="lg:flex justify-between">
                            {/* Device Name */}
                            <InputField
                                width="lg:w-2/3 font-inter lg:pr-5"
                                inputStyle="font-inter w-full px-[0.5rem] h-[2.4rem] rounded"
                                labelStyle="text-base font-montserrat font-semibold mt-2 block mb-[1vh]"
                                label="Device Name *"
                                id="deviceName"
                                name="deviceName"
                                placeholder="Device Name"
                                type="text"
                                helpText="Users can set device name only upon creation. Be sure that the device name is final."
                            />
                            {/* Status */}
                            <Dropdown
                                label="Status *"
                                name="status"
                                dropdownStyle="lg:w-1/3 lg:pl-5"
                                className="font-inter max-w-xl"
                                options={statusOptions}
                                onChange={value => {
                                    inputSetup.setFieldValue('status', value.value)                          
                                }}
                                value={inputSetup.values.status}
                            />
                        </div>
                        <div className="lg:flex mt-4">
                            {/* Category */}
                            <Dropdown
                                label="Category *"
                                dropdownStyle="lg:w-1/3 lg:pr-10"
                                className="font-inter max-w-xl"
                                options={mainCategoryOptions}
                                onChange={value => {
                                    setSubcategory([]);
                                    setMainCategory(value.value);
                                    inputSetup.setFieldValue('category', value.value);                          
                                }}
                                value={inputSetup.values.category}
                            />
                            {/* Subcategory */}
                            <Dropdown
                                label="Subcategory"
                                dropdownStyle="lg:w-1/3 lg:pr-5"
                                className="font-inter max-w-xl"
                                options={subcategory}
                                onChange={value => {
                                    inputSetup.setFieldValue('subCategory', value.value)                          
                                }}
                                value={inputSetup.values.subCategory}
                            />
                            {/* Serial Number */}
                            <InputField
                                width="lg:w-1/3 lg:pl-5 font-inter"
                                inputStyle="font-inter w-full px-[0.5rem] h-[2.4rem] rounded"
                                labelStyle="text-base font-montserrat font-semibold mt-2 block mb-[1vh]"
                                label="Serial Number"
                                id="serialNumber"
                                name="serialNumber"
                                placeholder="Serial Number"
                                type="text"
                            />
                        </div>
                        <div className="lg:flex mt-4">
                            {/* Purchase Date */}
                            <InputField
                                width="lg:w-1/3 font-inter lg:pr-10"
                                inputStyle="font-inter w-full px-[0.5rem] h-[2.4rem] rounded"
                                labelStyle="text-base font-montserrat font-semibold mt-2 block mb-[1vh]"
                                 label="Purchase Date *"
                                id="purchaseDate"
                                name="purchaseDate"
                                placeholder="MM/DD/YYYY"
                                type="text"
                            />
                            {/* Repletion Date */}
                            <InputField
                                width="lg:w-1/3 font-inter lg:pr-5"
                                inputStyle="font-inter w-full px-[0.5rem] h-[2.4rem] rounded"
                                labelStyle="text-base font-montserrat font-semibold mt-2 block mb-[1vh]"
                                label="Repletion Date *"
                                id="repletionDate"
                                name="repletionDate"
                                placeholder="MM/DD/YYYY"
                                type="text"
                            />
                            {/* Vendor */}
                            <InputField
                                width="lg:w-1/3 font-inter lg:pl-5"
                                inputStyle="font-inter w-full px-[0.5rem] h-[2.4rem] rounded"
                                labelStyle="text-base font-montserrat font-semibold mt-2 block mb-[1vh]"
                                label="Vendor"
                                id="vendor"
                                name="vendor"
                                placeholder="Vendor Name"
                                type="text"
                            />
                        </div>
                        <div className="lg:flex mt-4">
                            {/* Building */}
                            <Dropdown
                                label="Building *"
                                dropdownStyle="lg:w-1/3 lg:pr-10"
                                className="font-inter max-w-xl"
                                options={buildingOptions}
                                onChange={value => {
                                    setLocations([]);
                                    setBuilding(value.value);
                                    inputSetup.setFieldValue('building', value.value)
                                }}
                                value={inputSetup.values.building}
                            />    
                            {/* Exact Location */}
                            <Dropdown
                                label="Exact Location *"
                                dropdownStyle="lg:w-1/3 lg:pr-5"
                                className="font-inter max-w-xl"
                                options={locations}
                                onChange={value => {
                                    inputSetup.setFieldValue('exactLocation', value.value)                          
                                }}
                                value={inputSetup.values.exactLocation}
                            />
                            {/* MAC Address */}
                            <InputField
                                width="lg:w-1/3 font-inter lg:pl-5"
                                inputStyle="font-inter w-full px-[0.5rem] h-[2.4rem] rounded"
                                labelStyle="text-base font-montserrat font-semibold mt-2 block mb-[1vh]"
                                label="MAC Address"
                                id="MACAddress"
                                name="MACAddress"
                                placeholder="XX : XX : XX : XX : XX : XX"
                                helpText="Can be six pairs of characters separated by colons or hyphens, or 
                                            3 groups of four hexadecimal characters separated by dots."
                                type="text"
                            />
                        </div>
                        <div className="lg:flex">
                            {/* Current Office */}
                            <Dropdown
                                label="Current Office *"
                                dropdownStyle="lg:w-1/3 lg:pr-10 lg:-mt-2"
                                className="font-inter max-w-xl"
                                options={officeOptions}
                                onChange={value => {
                                    inputSetup.setFieldValue('office', value.value)                          
                                }}
                                value={inputSetup.values.office}
                            />
                            {/* Current User */}
                            <InputField
                                width="lg:w-1/3 font-inter lg:pr-5"
                                inputStyle="font-inter w-full px-[0.5rem] h-[2.4rem] rounded"
                                labelStyle="text-base font-montserrat font-semibold block mb-[1vh]"
                                label="Current User *"
                                id="currentUser"
                                name="currentUser"
                                placeholder="Current User"
                                type="text"
                            />
                        </div>

                        {/* Notes */}
                        <div className="lg:w-2/3 lg:pr-5">
                            <span className="text-base font-montserrat font-semibold mt-8 block mb-[1vh]">Notes</span>
                            <div className="border border-gray-300 p-1 rounded-xl">
                                {/* Notes Textarea */}
                                <Field
                                    className='w-full h-20 p-1 pl-2 sm:pl-2.5 rounded font-inter text-sm sm:text-base lg:text-lg'
                                    name="notes"
                                    component="textarea"
                                    placeholder="Type to add a note..."
                                />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex mt-2 float-right space-x-3">
                            <PrimaryButton
                                type="submit"
                                textSize="text-xs sm:text-base lg:text-[1vw] mt-4 lg:mt-0"
                                isDisabled={!inputSetup.dirty}
                            >
                                Create Item
                            </PrimaryButton>
                            <SecondaryButton
                                type="reset"
                                textSize="text-xs sm:text-base lg:text-[1vw] mt-4 lg:mt-0"
                                handleClick={confirmCancel}
                            >
                                Discard
                            </SecondaryButton>
                        </div>
                    </Form>
                </FormikProvider>
            </div>
        </div>
    );
};


export default CreateItemPage;