/**
 * This component is to be used as a primary button.
 */
const PrimaryButton = ({
    type,               // {string} indicates button type
    isDisabled,         // {boolean} indicates if the button is disabled or not
    handleClick,        // {function} handles onClick event for the button
    textSize,           // {string} tailwind class that styles the text size
    ...props            // will catch any other props
}) => {
    return (
        <button
            className={`px-3 sm:px-5 py-1 fhd:py-[0.25vw] rounded-lg cursor-pointer transition-all ${textSize} text-center block
                bg-primary-btn hover:bg-primary-btn-hover disabled:bg-green-300 disabled:cursor-default
                font-medium font-poppins text-btn-text focus:ring-2 focus:outline-none focus:ring-green-400`}
            type={type}
            disabled={isDisabled}
            onClick={handleClick}
        >
            {props.children}
        </button>
    )
};


export default PrimaryButton;