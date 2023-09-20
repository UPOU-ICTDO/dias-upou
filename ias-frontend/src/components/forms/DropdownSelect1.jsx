
import Select from 'react-select';

/**
 * This component can be used either as a single or multi-select dropdown
 */
const Dropdown = ({
    label,              // {string} the label to be displayed for the dropdown select
    dropdownStyle,      // {string} styling for the dropdown select and its label
    onChange,           // {function} handles onChange event for the dropdown select
    ...props            // will catch any other props
}) => {

    const defaultValue = (options, value) => {
        return options ? options.find(option => option.value === value) : "";
    };

    // Overriding some default styles for the dropdown select
    const optionsStyle = {
        control: (styles, state) => ({
            ...styles,
            backgroundColor: state.isDisabled? "#e4e4e4" : "white",
        }),
        option: (styles, { isDisabled }) => {
            return {
                ...styles,
                cursor: "pointer",
            };
        },
        menu: (provided, state) => ({
            ...provided,
            borderRadius: '10px'
        }),
        placeholder: (provided, state) => ({
            ...provided,
            color: "#aeb0af"
        }),
    }

    return (
        <div className={dropdownStyle}>
            <h1 className="lg:text-lg font-montserrat font-semibold mt-2 block mb-[1vh]">{label}</h1>
            <Select
                {...props}
                styles={optionsStyle}
                value={defaultValue(props.options, props.value)}
                onChange={value => { onChange(value) }}
                options={props.options}
            />
        </div>
    )
}

export default Dropdown;