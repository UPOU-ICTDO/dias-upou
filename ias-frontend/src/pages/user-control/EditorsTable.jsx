
import { useState } from 'react';
import { PencilIcon, TrashIcon, CheckIcon, XIcon, SelectorIcon } from '@heroicons/react/solid';
import { FormikProvider, Form, useFormik } from 'formik';
import Swal from 'sweetalert2';

/* Components */
import CircleBtns from '../../components/buttons/CircleBtns';
import Dropdown from '../../components/forms/DropdownSelect1';

/* Utility Functions */
import { accessLevelOptions } from '../../utils/objectProperties';
import { putFetch, deleteFetch } from '../../utils/apiRequest';
import uri from './../../uri';


// DEFAULT ORDER: DESCENDING by email
// need magre - fetch muna ng data kasi kailangan yung _id na field para sa URL


/**
 * This table will display the list of editors in a table.
 */
const EditorsTable = ({
    data,               // {array} array of editor objects fetched from database
    setCurrentData,     // {function} used to set data
    unsortedRows,       // {array} array of editor objects fetched from database
    setUnsortedRows     // {function} used to set unsortedRows
}) => {

    // State handler that will be used to disable all other edit buttons if one row is already being edited
    const [isEditing, setIsEditing] = useState(false);
    // State handler for the sort state of each column that can be sorted (Email, Office)
    const [sortState, setSortState] = useState([0, 0]);
    // State handler that tracks the current sorting arrangement of the data
    const [latestSort, setLatestSort] = useState(-1);
    

    //---------------------------------------- FORMS -------------------------------------------

    // Delay/timeout for forms
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    
    // Formik setup for editing of a row
    const editRow = useFormik({
        initialValues: {
            _id: '',
            index: 0,
            email: '',
            office: '',
            privileges: '',
        },
        // Submit handler
        onSubmit: async (values) => {
            await sleep(100);                   // Wait for the form to submit before replacing the elements
            handleSubmit(data, values);
            await sleep(100);
            setIsEditing(false);
            data[values.index].edit = false;    // Disable edit mode for the row upon submission
        }
    })

    //----------------------------------------HANDLERS------------------------------------------

    // Function that handles cancellation of edit
    function handleCancel(data, index) {
        setIsEditing(false);            // enable all action buttons
        data[index].edit = false;       // disable edit mode for the row index
        setCurrentData([...data]);      // to refresh the table
    }

    // Function that handles click event for an edit button of a row
    function handleEdit(data, index) {
        setIsEditing(true);             // disable all action buttons of other rows
        data[index].edit = true;        // enable edit mode for this row

        // set selected option to what is the original field value for this row
        editRow.setFieldValue('privileges', data[index].privileges); 
        // update field value
        setCurrentData([...data]);
    }

    // Function that handles onSubmit for edit access level
    function handleSubmit(data, values) {

        // Get array index of object that was changed
        const targetIndex = data.findIndex(obj => obj.email === values.email);

        // Create the updated object
        let newList = [...data];
        newList[targetIndex] = {
            _id: values._id,
            email: values.email,
            office: values.office,
            privileges: values.privileges
        };

        // Update server state by performing PUT HTTP request
        putFetch(uri.backend + `/editors/${data[values.index]._id}`, newList[targetIndex])
            .then((val) => {
                // Check if there is not error
                if (!val) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Server Error',
                        text: 'Failed to edit editor info.',
                    })
                } else {
                    // Update UI state
                    let index = values.index;
                    data[index].email = values.email;
                    data[index].office = values.office;
                    data[index].privileges = values.privileges;
                    setCurrentData([...data]);

                    Swal.fire(
                        'Success',
                        'Editor record has been edited successfully!',
                        'success'
                    );
                };
            });
    };


    // Function that handles deletion of an editor record
    function handleDelete(targetIndex, id) {
        
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

            // If the user confirmed deletion
            if (result.isConfirmed) {

                // Perform DELETE http request
                deleteFetch(`${uri.backend}/editors/`, id).then((val) => {
                    // Check if delete is successful
                    if (!val) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Server Error',
                            text: 'Failed to delete editor',
                        })
                    } else {
                        // Update UI by splicing deleted data from list in UI state
                        let newData = [...data];
                        newData.splice(targetIndex, 1);
                        setCurrentData(newData);
                        setUnsortedRows(newData);

                        Swal.fire(
                            'Deleted!',
                            'Editor record has been deleted.',
                            'success'
                        );
                    };
                });
            };
        });
    };


    //------------------------------------------SORTING------------------------------------------
    // The sorting functionality for the editors table will be handled fully by the client.

    // Function that will sort rows in ascending order based on the object property passed
    const sortRowsAsc = (object) => {
        const sortData = data;
        sortData.sort((a, b) => {
            if (a[object] < b[object]) {
                return -1;
            }
            if (a[object] > b[object]) {
                return 1;
            }
            return 0;
        });
        setCurrentData([...sortData]);
    };

    // Function that will sort rows in descending order based on the object property passed
    const sortRowsDsc = (object) => {
        const sortData = data;
        sortData.sort((a, b) => {
            if (a[object] > b[object]) {
                return -1;
            }
            if (a[object] < b[object]) {
                return 1;
            }
            return 0;
        });
        setCurrentData([...sortData]);
    };

    // Mother function for changing sort state and row data
    const changeSort = (index) => {
        // get the current sorting state
        let temp = sortState;

        // if the latest sort is not equal to 'index', reset sortState to initial state
        if (latestSort !== index) {
            temp = [0, 0];
        }

        temp[index] = (temp[index] + 1) % 3;    // cycle through values 0-2 (0 for default, 1 for asc, 2 for desc)
        setSortState([...temp]);                // set sort state, triggers re-rendering of component
        setLatestSort(index);                   // take note of the latest arrangement by setting this state

        // get the object property to sort by
        let toSort = '';
        switch (index) {
            case 0:
                toSort = 'email';
                break;
            case 1:
                toSort = 'office';
                break;
        }

        // Sort the rows
        if (temp[index] === 0) {
            // if 0, return sorting arrangement to default state
            setCurrentData([...unsortedRows]);
        } else if (temp[index] === 1) {
            // if 1, sort in ascending order
            sortRowsAsc(toSort);
        } else if (temp[index] === 2) {
            // if 2, sort in descending order
            sortRowsDsc(toSort);
        }
    };


    //----------------------------------------OTHERS---------------------------------------------
    
    // Styling
    const headerStyle = `table-cell py-[1vw] px-[6vw] sm:px-[3vw] lg:px-[1vw] truncate cursor-pointer hover:bg-gray-200 transition-all ease-in ease-out`
    const dataStyle = `table-cell py-[1.75vw] px-[6vw] sm:px-[3vw] lg:py-[1.1vw] lg:px-[1vw] truncate`
    const readRowStyle = `bg-light-blue text-dark-blue hover:bg-dark-blue hover:text-light-blue`
    const editRowStyle = `bg-gray-200 text-gray-600 hover:bg-gray-600 hover:text-gray-200`


    return (
        <div className="px-[4vw] overflow-auto">
            {/* Table */}
            <div className="table table-fixed overflow-scroll w-full my-[1.5vw] rounded-xl bg-white drop-shadow-lg">
                {/* Table Header Group */}
                <div className="table-header-group border-solid border-b-[0.2vw]">
                    {/* Table Row */}
                    <div className="table-row text-left text-sm sm:text-lg lg:text-[1.1vw] font-montserrat">
                        {/* Table Headers */}
                        <div className={`${headerStyle} w-48 lg:w-3/12`} onClick={() => changeSort(0)}> 
                            <div className="flex justify-between">
                                Email
                                <SelectorIcon className="w-6 text-gray-700"/>
                            </div>
                        </div>
                        <div className={`${headerStyle} w-52 lg:w-4/12`} onClick={() => changeSort(1)}>
                            <div className="flex justify-between">
                                Office
                                <SelectorIcon className="w-6 text-gray-700"/>
                            </div>
                        </div>
                        <div className={`table-cell w-44 lg:w-2/12 px-[6vw]  sm:px-[3.75vw] py-[1vw] lg:px-[1.5vw] truncate cursor-default`}>Access Level</div>
                        <div className="table-cell w-28 lg:w-2/12 text-center py-[1vw] px-[6vw] sm:px-[3vw] lg:px-[1vw] truncate cursor-default">Actions</div>
                    </div>
                </div>

                {/* Check if there are data available to display */}
                {data.length > 0 ? (
                    // Table Row Group
                    <div className="table-row-group font-inter text-sm sm:text-lg lg:text-[1vw]">
                        {data.map((editor, index) => (
                            editor.edit ?
                                // Table Row
                                // Display editing mode for a row
                                <div className="table-row table-fixed w-full border-b-[0.1vw] transition ease-out hover:transition hover:ease-in hover:bg-table-hover-color last:border-b-0" key={index}>
                                    {/* Table Cells */}
                                    <div className={`${dataStyle} font-medium`}>{editor.email}</div>
                                    <div className={`${dataStyle}`}>{editor.office}</div>
                                    
                                    {/* Dropdown for access level */}
                                    <div className="table-cell py-[1.75vw] px-[6vw] sm:px-[3vw] lg:py-[1.1vw] lg:px-[1vw]">
                                        <Dropdown
                                            className="w-full lg:w-3/4"
                                            key={index}
                                            options={accessLevelOptions}
                                            onChange={value => {
                                                editRow.setFieldValue('_id', editor._id)
                                                editRow.setFieldValue('email', editor.email)
                                                editRow.setFieldValue('office', editor.office)
                                                editRow.setFieldValue('privileges', value.value)
                                                editRow.setFieldValue('index', index)                                            
                                            }}
                                            value={editRow.values.privileges}
                                        />
                                    </div>

                                    {/* Actions column */}
                                    <div className="table-cell text-center">
                                        <FormikProvider value={editRow}>
                                        <Form>
                                            <CircleBtns
                                                style={editRowStyle}
                                                textLeft="Save"
                                                textRight="Cancel"
                                                typeLeft="submit"
                                                typeRight="button"
                                                handleRight={() => {handleCancel(data, index)}}
                                            >
                                                <CheckIcon />
                                                <XIcon/>
                                            </CircleBtns>
                                        </Form>
                                        </FormikProvider>  
                                    </div>
                                </div>
                                :
                                // Display reading mode for a row
                                <div className="table-row table-fixed border-b-[0.1vw] transition ease-out hover:transition hover:ease-in hover:bg-table-hover-color last:border-b-0" key={index}>
                                    <div className={`${dataStyle} font-medium`}>{editor.email}</div>
                                    <div className={`${dataStyle}`}>
                                        {editor.office}
                                    </div>
                                    <div className={`${dataStyle} sm:px-[3.75vw] lg:px-[1.5vw]`}>{editor.privileges}</div>
                                    
                                    {/* Actions column */}
                                    <div className="text-center">
                                        <CircleBtns
                                            style={readRowStyle}
                                            textLeft="Edit Access Level"
                                            textRight="Delete Editor"
                                            isDisabled={isEditing}
                                            handleLeft={() => {
                                                handleEdit(data, index)
                                            }}
                                            handleRight={() => handleDelete(index, editor._id)}
                                        >
                                            <PencilIcon />
                                            <TrashIcon />
                                        </CircleBtns>
                                    </div>
                                </div>
                        ))}
                    </div>
                ) : (
                    // If the dataset is still empty or search key did not match anything
                    <div className="h-[55vh] w-[79vw]">
                        <div className="pt-[15vh] text-lg text-center font-inter font-medium">
                            <i className=''>No data found.</i>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
};


export default EditorsTable;