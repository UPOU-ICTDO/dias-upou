import { ExclamationCircleIcon } from '@heroicons/react/outline';


/* This component is used for displaying necessary data/details for the notifications component. */
const NotifDetails = ({ notifs, icon, data, index }) => {

    // console.log(data)
    const str = `${data.deviceName} with serial number ${data.serialNumber} is set for repletion on ${data.repletionDate}.`

    return (
        <div className="inline-flex space-x-4 w-full">
            {/* Icon to be displayed */}
            {icon === true ? (
                <ExclamationCircleIcon className="w-[6vw] sm:w-8 lg:w-[4.5vh] text-[#dda25a]"/>
            ) : (
                <></>
            )}
            {/* Detail */}
            <span className="lg:pt-1 text-[3.75vw] sm:text-xl fhd:text-[1.1vw] font-inter font-normal">
                <b><u>{data.deviceName}</u></b> with serial number <b><u>{data.serialNumber}</u></b> is set for repletion on <b><u>{new Date(data.repletionDate*1000).toLocaleDateString("en-US")}.</u></b>
            </span>
        </div>
    );
};


export default NotifDetails;