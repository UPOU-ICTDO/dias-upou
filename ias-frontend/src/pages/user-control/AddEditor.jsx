import { useState } from 'react';
import { PlusSmIcon } from '@heroicons/react/solid';
import { useFormik, FormikProvider, Form } from 'formik';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

/* Components */
import Dropdown from '../../components/forms/DropdownSelect1';
import InputField from '../../components/forms/InputField';
import Modal from '../../components/layouts/Modal';
import PrimaryButton from '../../components/buttons/PrimaryBtn';
import SecondaryButton from '../../components/buttons/SecondaryBtn';

/* Utility functions */
import { accessLevelOptions, officeOptions } from '../../utils/objectProperties';
import { getFetch, postFetch } from '../../utils/apiRequest';
import uri from './../../uri';



/**
 * This component is a modal window that will receive information regarding the new editor to be added.
 * Props:
 *   data           --- {object} state of current editors in the editor collection
 *   setCurrentData --- {function} sets the value of data
 */
const AddEditorModal = ({ data, setCurrentData }) => {
    
    // State handler for modal window
    const [isOpen, setIsOpen] = useState(false);

    // This function creates a POST request to add an editor to server state
    async function handleAdd(values) {
        // Creating object for new editor
        let newEditor = {
            email: values.email,
            office: values.office,
            privileges: values.privileges
        };

        // Perform POST request
        var val = await postFetch(uri.backend + '/editors/', newEditor)
            // Checking if the action is successful
        if (!val) {
            Swal.fire({
                icon: 'error',
                title: 'Server Error',
                text: 'Action has been aborted',
            });
        } else {
            var user_id = await getFetch(uri.backend+'/editors',{email:values.email});

            if(user_id.data){
                let temp = data;
                temp.unshift({
                    _id: user_id.data[0]._id,
                    email: values.email,
                    office: values.office,
                    privileges: values.privileges,
                })
                setCurrentData([...temp]);
            }
            Swal.fire(
                'Success',
                'Editor record has been added!',
                'success'
            );
        }

            // Update UI state

    }

    // Delay/timeout
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    // Formik setup for forms
    const dropdownSetup = useFormik({
        initialValues: {
            email: '',
            office: '',
            privileges: '',
        },
        // submit handler
        onSubmit: async (values) => {
            await sleep(300);
            handleAdd(values);

            // TODO: reset input fields
            setIsOpen(false);
        },
        // for form validation and errors
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Email is required')
                .matches(
                    /^.+@up(ou)?\.edu\.ph$/,
                    'Please enter a valid UP/UPOU email'
                )
        }),
    });

    // Function to close modal window
    function handleClose() {
        setIsOpen(false);
        
        // TODO: Reset input fields
    }

    return (
        <>
            {/* Button that will trigger the modal window */}
            <PrimaryButton
                handleClick={() => setIsOpen(true)}
                textSize="text-xs sm:text-base lg:text-[1vw] mt-4 lg:mt-0"
            >
                <PlusSmIcon className="inline-flex w-5 mr-0.5 py-1 sm:w-7 sm:py-0 sm:-ml-1 lg:mr-2 lg:-ml-2"/>
                Add Editor
            </PrimaryButton>

            {/* Modal Window */}
            <Modal openModal={isOpen} handleClose={handleClose} modalTitle="Add New Editor" modalSize="max-w-lg">

                {/* Modal Body */}
                <FormikProvider value={dropdownSetup}>
                    <Form className="text-sm sm:text-base lg:text-lg font-inter">

                        {/* Input Field */}
                        <InputField
                            inputStyle="shadow rounded leading-tight py-[0.75vh] px-[0.75vw] w-full"
                            labelStyle="font-semibold mt-2 block mb-[1vh]"
                            label="Email Address:"
                            id="email"
                            name="email"
                            type="text"
                            placeholder="xxxxxxxx@up(ou).edu.ph"
                        />

                        {/* Office Dropdown Select */}
                        <div className="mt-4">
                            <span className="font-semibold">Office:</span>
                            <Dropdown
                                className="mt-3"
                                options={officeOptions}
                                onChange={value => {
                                    dropdownSetup.setFieldValue('office', value.value)                          
                                }}
                                value={dropdownSetup.values.office}
                            />
                        </div>

                        {/* Access Level Dropdown Select */}
                        <div className="mt-4">
                            <span className="font-semibold">Access Level:</span>
                            <Dropdown
                                className="mt-3"
                                options={accessLevelOptions}
                                onChange={value => {
                                    dropdownSetup.setFieldValue('privileges', value.value)                          
                                }}
                                value={dropdownSetup.values.privileges}
                            />
                        </div>
                        
                        {/* Buttons */}
                        <div className="flex float-right space-x-2 mt-10 mb-6">
                            <PrimaryButton
                                textSize="text-xs sm:text-sm lg:text-base"
                                type="submit"
                                handleClick={() => {
                                    setCurrentData([...data]);
                                }}
                                isDisabled={ !dropdownSetup.isValid
                                    || !dropdownSetup.dirty
                                    // || dropdownSetup.values.privileges === ""
                                    || (dropdownSetup.values.privileges === "" || dropdownSetup.values.office === "")
                                }
                            >
                                Save
                            </PrimaryButton>
                            <SecondaryButton
                                textSize="text-xs sm:text-sm lg:text-base"
                                type="reset"
                                handleClick={handleClose}
                            >
                                Cancel
                            </SecondaryButton>
                        </div>
                    </Form>
                </FormikProvider>
            </Modal>
        </>
    );
};


export default AddEditorModal;