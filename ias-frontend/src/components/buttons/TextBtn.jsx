
/**
 * This component is for texts that act like buttons.
 * Props:
 *   handleClick  --- {function} handles click event for button
 *   textSize     --- {string} tailwind class that styles the text size
 *   ...props     --- will catch any other props
 */
const TextBtn = ({ handleClick, textSize, ...props }) => {

    return (
        <button
            className={`${textSize} inline-flex font-inter items-center cursor-pointer transition-all`}
            onClick={handleClick}
        >
            {props.children}
        </button>
    );
};


export default TextBtn;