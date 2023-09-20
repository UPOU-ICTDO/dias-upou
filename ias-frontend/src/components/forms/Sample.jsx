import { useFormik, FormikProvider, Form } from 'formik';
import * as Yup from 'yup';

// Components
import InputField from './InputField';
import Dropdown from './DropdownSelect1';


/* Sample component how to use the different types of input fields */
export default function Sample() {
    // delay/timeout
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    
    // options for dropdown select
    const options = [
        {label:'React',value:'react'},
        {label:'ReactNative',value:'react-native'},
        {label:'JavaScript',value:'javascript'},
        {label:'CSS',value:'css'},
    ]

    // formik setup for single select dropdown
    const singleDropdown = useFormik({
        initialValues: {
            library: 'Select a library...',
        },
        // submit handler
        onSubmit: async (values) => {
            await sleep(500);
            console.log(JSON.stringify(values, null, 2));    // print selected value/s to console
        }
    })
    
    // formik setup for multi-select dropdown
    const multiDropdown = useFormik({
        initialValues: {
            checked:[]
        },
        // submit handler
        onSubmit: async (values) => {
            await sleep(500);
            console.log(JSON.stringify(values, null, 2));
        }
        
    }) 

    // formik setup for input fields
    const inputSetup = useFormik({
        // Setup initial values for the fields
        initialValues: {
            username: '',
            firstName: '',
            lastName: '',
            email: ''
        },
        // submit handler
        onSubmit: async (values) => {
            await sleep(500);
            console.log(JSON.stringify(values, null, 2));
        },
        // for form validation and errors
        validationSchema: Yup.object({
            username: Yup.string()
                .min(8, 'Must be at least 8 characters')
                .max(20, 'Must be less  than 20 characters')
                .required('Username is required')
                .matches(
                    /^[a-zA-Z0-9]+$/,
                    'Cannot contain special characters or spaces'
                ),
            firstName: Yup.string().required('First Name is required'),
            lastName: Yup.string().required('Last Name is required'),
            email: Yup.string()
                .required('Email is required')
                .matches(
                    /^.+@.+$/,
                    'Please enter a valid email'
                )
        }),
    });

    return (
        <div className='w-[25vw] p-10'>
            {/* Input Fields */}
            <FormikProvider value={inputSetup}>
                <Form>
                    <InputField
                        inputStyle="shadow rounded font-inter leading-tight py-[0.75vh] px-[0.75vw] w-full"
                        labelStyle="text-base font-montserrat font-semibold mt-2 block mb-[1vh]"
                        label="Username"
                        id="username"
                        name="username"
                        helpText="Must be 8-20 characters and cannot contain special characters."
                        type="text"
                    />
                    <InputField
                        inputStyle="shadow rounded font-inter leading-tight py-[0.75vh] px-[0.75vw] w-full"
                        labelStyle="font-montserrat font-semibold mt-2 block mb-[1vh]"
                        label="First Name"
                        id="firstName"
                        name="firstName"
                        type="text"
                    />
                    <InputField
                        inputStyle="shadow rounded font-inter leading-tight py-[0.75vh] px-[0.75vw] w-full"
                        labelStyle="font-montserrat font-semibold mt-2 block mb-[1vh]"
                        label="Last Name"
                        id="lastName"
                        name="lastName"
                        type="text"
                    />
                    <InputField
                        inputStyle="shadow rounded font-inter leading-tight py-[0.75vh] px-[0.75vw] w-full"
                        labelStyle="font-montserrat font-semibold mt-2 block mb-[1vh]"
                        label="Email"
                        id="email"
                        name="email"
                        type="text"
                    />
                    
                    {/* Buttons */}
                    <div className="mt-12 font-poppins">
                        <button className="px-5 py-2 rounded-lg cursor-pointer font-medium text-base text-white bg-green-700 disabled:bg-green-300 duration-300" type="submit" disabled={!inputSetup.isValid || !inputSetup.dirty}>Submit</button>
                        <button className="ml-2 px-5 py-2 rounded-lg cursor-pointer font-medium text-base text-white bg-slate-500" type="reset">Reset</button>
                    </div>
                </Form>
            </FormikProvider>

            {/* Dropdown Single Select */}
            <form onSubmit={singleDropdown.handleSubmit}>
                <Dropdown
                    options={options}
                    label="Dropdown Single Select"
                    onChange={value => singleDropdown.setFieldValue('library', value.value)}
                    value={singleDropdown.values.library}
                />
                <button className="px-5 py-2 rounded-lg cursor-pointer font-medium text-base text-white bg-green-700 disabled:bg-green-300 duration-300" type="submit">Submit</button>
            </form>

            {/* Dropdown Multi-select */}
            <form>
                <Dropdown
                    isMulti={true}
                    options={options}
                    closeMenuOnSelect={false}
                    label="Dropdown Multi-select"
                    onChange={value => multiDropdown.setFieldValue('checked', value.value)}
                />
                <button className="px-5 py-2 rounded-lg cursor-pointer font-medium text-base text-white bg-green-700 disabled:bg-green-300 duration-300" type="submit">Submit</button>
            </form>
        </div>
    );
};