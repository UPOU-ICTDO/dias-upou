
/**
 * This component is to be used as a secondary button.
 */
const SecondaryButton = ({
    type,               // {string} indicates button type
    isDisabled,         // {boolean} indicates if the button is disabled or not
    handleClick,        // {function} handles onClick event for the button
    textSize,           // {string} tailwind class that styles the text size
    ...props            // will catch any other props
}) => {

    return (
        <button
            className={`px-3 sm:px-5 py-2 fhd:py-[0.25vw] rounded-lg cursor-pointer transition-all ${textSize} text-center block
                bg-secondary-btn hover:bg-secondary-btn-hover disabled:bg-secondary-btn disabled:cursor-default
                font-medium font-poppins text-btn-text focus:ring-2 focus:outline-none focus:ring-gray-400`}
            type={type}
            disabled={isDisabled}
            onClick={handleClick}
        >
            {props.children}
        </button>
    )
};


export default SecondaryButton;