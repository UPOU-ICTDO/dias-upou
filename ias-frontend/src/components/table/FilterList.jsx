
import { useState, useEffect } from 'react';
import { FormikProvider, useFormik, Form } from 'formik';

/* Components */
import PrimaryButton from '../buttons/PrimaryBtn';
import Dropdown from '../forms/DropdownSelect1'

/* Importing options to be used for the dropdown selects */
import {
    buildingOptions,
    mainCategoryOptions,
    subcategoryOptions,
    statusOptions,
    locationOptions,
    officeOptions
} from '../../utils/objectProperties'


const dropdowns = [
    { label: "Category", name:"category", options: mainCategoryOptions },
    { label: "Subcategory", name: "subcategory", options: subcategoryOptions },
    { label: "Building", name: "building", options: buildingOptions },
    { label: "Exact location", name:"location", options: locationOptions },
]

// delay/timeout
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));


/**
 * This component is used to display all the contents of the filter options popover.
 */
const FilterList = ({params,setParams}) => {

    // State handler for the main category selected
    const [mainCategory, setMainCategory] = useState('');
    // State handler for the filtered options for subcategory
    const [subcategory, setSubcategory] = useState([]);
    // State handler for the building selected
    const [building, setBuilding] = useState('');
    // State handler for the filtered options for exact locations
    const [locations, setLocations] = useState('');


    // Formik setup for input fields
    const inputSetup = useFormik({
        // initial values for the fields
        initialValues: {
            status: '',
            category: '',
            subcategory: '',
            building: '',
            exactLocation: '',
            office: ''
        },
        // submit handler
        onSubmit: async (values) => {
            await sleep(300);

            // pass submitted values to DB
            setParams((prevState) => {
                return({
                     ...prevState,
                    status: values.status,
                    category: values.subcategory,
                    building: values.building,
                    exactLocation: values.exactLocation,
                    office: values.office
             });
        })
    }})

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
        dropdowns.filter(
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

    
    return (
        <div className="bg-white px-6 pt-3 pb-14 z-10 lg:z-50 flex-grow rounded-lg shadow-lg ring-1 ring-black ring-opacity-20">
            <FormikProvider value={inputSetup}>
                <Form>
                    {/* Status */}
                    <Dropdown
                        dropdownStyle="grid lg:grid-cols-3"
                        className="col-span-2"
                        options={statusOptions}
                        label="Status"
                        value={inputSetup.values.status}
                        onChange={value => {
                            inputSetup.setFieldValue('status', value.value)                          
                        }}
                    />
                    {/* Category */}
                    <Dropdown
                        dropdownStyle="grid lg:grid-cols-3"
                        className="col-span-2"
                        options={mainCategoryOptions}
                        label="Category"
                        value={inputSetup.values.category}
                        onChange={value => {
                            setMainCategory(value.value);
                            inputSetup.setFieldValue('category', value.value);
                            if (value.value === "Scanners") {
                                inputSetup.setFieldValue('subcategory', value.value);
                            }
                        }}
                    />
                    {/* Subcategory */}
                    <Dropdown
                        isDisabled={(mainCategory === "Scanners")}   // Disable if main category is "Scanners"
                        dropdownStyle="grid lg:grid-cols-3"
                        className="col-span-2"
                        options={subcategory}
                        label="Subcategory"
                        value={inputSetup.values.subcategory}
                        onChange={value => {
                            inputSetup.setFieldValue('subcategory', value.value);
                        }}
                    />
                    {/* Building */}
                    <Dropdown
                        dropdownStyle="grid lg:grid-cols-3"
                        className="col-span-2"
                        options={buildingOptions}
                        label="Building"
                        value={inputSetup.values.building}
                        onChange={value => {
                            setBuilding(value.value);
                            inputSetup.setFieldValue('building', value.value);
                        }}
                    />
                    {/* Exact Location */}
                    <Dropdown
                        dropdownStyle="grid lg:grid-cols-3"
                        className="col-span-2"
                        options={locations}
                        label="Exact Location"
                        value={inputSetup.values.exactLocation}
                        onChange={value => {
                            inputSetup.setFieldValue('exactLocation', value.value);
                        }}
                    />
                    {/* Current Office */}
                    <Dropdown
                        dropdownStyle="grid lg:grid-cols-3"
                        className="col-span-2"
                        options={officeOptions}
                        label="Current Office"
                        value={inputSetup.values.office}
                        onChange={value => {
                            inputSetup.setFieldValue('office', value.value);
                        }}
                    />
                    {/* Apply Filters Button */}
                    <div className="float-right mt-4">
                        <PrimaryButton type="submit" textSize="text-sm">Apply Filters</PrimaryButton>
                    </div>
                </Form>
            </FormikProvider>
        </div>
    );
};


export default FilterList;