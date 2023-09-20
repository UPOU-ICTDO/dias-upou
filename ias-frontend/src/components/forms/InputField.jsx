import { useState } from 'react';
import { useField } from 'formik';


/**
 * This component contains an input field with form validation and live feedback
 * Code from: https://formik.org/docs/examples/instant-feedback
 */
const InputField = ({
    width,                  // {string} indicates the width of the input field
    feedback = true,        // {boolean} indicates whether feedback for input field should be displayed
    inputStyle,             // {string} className for the input tag
    labelStyle,             // {string} className for the label of input
    label,                  // {string} actual label for the input
    helpText,               // {string} small string displayed beneath the input field to help user
    ...props                // will catch any other props
}) => {
    // Used to be able to use this component with Formik
    const [field, meta] = useField(props);
    // State handler for input field onFocus event
    const [didFocus, setDidFocus] = useState(false);
    
    // handles onFocus event
    const handleFocus = () => setDidFocus(true);

    // Conditions whethere the feedback should be displayed or not
    const showFeedback = (!!didFocus && feedback) && meta.touched;

    return (
        <div className={width}>

            {/* Checking if there is a label passed as prop */}
            {label ? (
                <div className="flex text-xs sm:text-base items-center justify-between">
                    {/* Label */}
                    <label className={labelStyle} htmlFor={props.id}>{label}</label>{' '}
                    
                    {/* Checking if the user wants the feedback to be shown */}
                    {feedback && showFeedback ? (
                        // Error/Feedback container
                        <div
                            id={`${props.id}-feedback`}
                            aria-live="polite"
                            className={`${meta.error ? "text-red-500": "text-green-600" }`}
                            aria-describedby={`${props.id}-feedback ${props.id}-help`}
                        >
                            {meta.error ? meta.error : '✓'}
                        </div>
                    ) : null}
                </div>

                ):null
            }
            
            {/* Input Field */}
            <input
                {...props}
                {...field}
                // setting input field border color if the user has entered a value
                className={`${meta.value != "" ?
                    meta.error ?
                        "border-2 focus:border-red-500 outline-none focus:outline-none"                     // if there is an input and an error
                        : "border-2 focus:border-green-600 outline-none focus:outline-none"                 // if there is an input and no error
                    : "border-2 focus:border-orange-200 outline-none focus:outline-none"}${inputStyle}`}    // if there is no input
                aria-describedby={`${props.id}-feedback ${props.id}-help`}
                onFocus={handleFocus}
            />

            {/* Help Text -- will be displayed as small description for the kind of value
                expected to be entered to inform the user before he.she types anything, */}
            <div className="font-inter text-xs" id={`${props.id}-help`} tabIndex="-1">
                {helpText}
            </div>
        </div>
    );
};


export default InputField;