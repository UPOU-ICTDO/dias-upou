import 'tippy.js/dist/tippy.css';
import Tippy from '@tippyjs/react';


/**
 * This component is for the pair of buttons in the actions column of the list component.
 */
const CircleBtns = ({
    style,              // {string} tailwind class that will be added to the base style of button
    textLeft,           // {string} string to be displayed for the left button's tooltip 
    textRight,          // {string} string to be displayed for the right button's tooltip
    typeLeft,           // {string} button type for the left button
    typeRight,          // {string} button type for the right button
    handleLeft,         // {function} handles onClick event for the button on the left
    handleRight,        // {function} handles onClick event for the button on the right
    isDisabled,         // {boolean} whether the buttons should be disabled or not
    ...props            // will catch any other props
}) => {

    const btnStyle = `w-7 sm:w-9 p-1.5 ${style} rounded-full cursor-pointer
        transition hover:transition disabled:bg-blue-50 disabled:text-gray-400 disabled:cursor-default`
    
    return (
        <div className="mx-auto w-auto space-x-3 items-center justify-items-center inline-block">
            {/* Left button */}
            <Tippy content={<span>{textLeft}</span>}>
                <button
                    className={btnStyle}
                    type={typeLeft}
                    onClick={handleLeft}
                    disabled={isDisabled}
                >
                    {props.children[0]}
                </button>
            </Tippy>
            

            {/* Right button */}
            <Tippy content={<span>{textRight}</span>}>
                <button
                    className={btnStyle}
                    type={typeRight}
                    onClick={handleRight}
                    disabled={isDisabled}
                >
                    {props.children[1]}
                </button>
            </Tippy>
        </div>
    );
};


export default CircleBtns;