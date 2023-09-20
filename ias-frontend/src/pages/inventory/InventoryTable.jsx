import { useState, useEffect } from 'react';
import { SelectorIcon } from '@heroicons/react/solid';

/* Components */
import ViewItemModal from './modals/ViewItemModal';
import EditDeleteItemModal from './modals/EditDeleteItemModal';


/**
 * This component is the table that displays the inventory items.
 */
const InventoryTable = ({
    data,
    setData,
    params,
    setParams,
    getInventory
}) => {
    
    // State handler for sorting arrangement
    const [sortState, setSortState] = useState(0);

    // Styling
    const headerStyle = `table-cell py-[1vw] px-[6vw] sm:px-[1vw] cursor-pointer truncate hover:bg-gray-200 transition-all ease-in ease-out`
    const dataStyle = `table-cell py-[1.75vw] sm:py-3 lg:py-[0.5vw] px-[6vw] sm:px-[1vw] cursor-pointer truncate`

    /* Status Elements */
    const statusStyle = `
        .status[data-status="Active"]:after{
            content : "Active";
            background-color: #BBDABB;
            color: #2A7146;
            border-radius: 3vw;
            display: block;
            padding: 0.25vw;
            text-align: center;
        }

        .status[data-status="For Replacement"]:after{
            content : "For Replacement";
            background-color: #F29B9B;
            color: #611111;
            border-radius: 3vw;
            display: block;
            padding: 0.25vw;
            text-align: center;
        }

        .status[data-status="Under Repair"]:after{
            content : "Under Repair";
            background-color: #F2C293;
            color: #FF1111;
            border-radius: 3vw;
            display: block;
            padding: 0.25vw;
            text-align: center;
        }

        .status[data-status="Archived"]:after{
            content : "Archived";
            background-color: #8DD6FF;
            color: #08356D;
            border-radius: 3vw;
            display: block;
            padding: 0.25vw;
            text-align: center;
        }`;
    
    // Function that will handle sorting by column
    function handleSort(field) {
        let temp = (sortState + 1) % 3;     // cycle through values 0-2 (0 for default, 1 for asc, 2 for desc)
        setParams((prevState) => {
            return({
                ...prevState,
                sortby: field,
                order: temp
            });
        });
        setSortState(temp);
    }

    return (
        <div className="px-[2.5vw] overflow-x-auto">
            <style>{statusStyle}</style>
            {/* Table */}
            <div className="table table-fixed overflow-scroll w-full my-[1.5vw] rounded-xl bg-white drop-shadow-lg">
                {/* Table Header Group */}
                <div className="table-header-group border-solid border-b-[0.2vw]">
                    {/* Header Row */}
                    <div className="table-row text-left text-sm sm:text-lg lg:text-[1.1vw] font-montserrat">
                        {/* Header cells */}
                        <div className={`${headerStyle} w-64`} onClick={() => {handleSort("deviceName")}}>
                            <div className="flex justify-between">
                                Device Name
                                <SelectorIcon className="w-6 text-gray-700"/>
                            </div>
                        </div>
                        <div className={`${headerStyle} w-62`} onClick={() => {handleSort("serialNumber")}}>
                            <div className="flex justify-between">
                                Serial Number
                                <SelectorIcon className="w-6 text-gray-700"/>
                            </div>
                        </div>
                        <div className={`${headerStyle} w-52 text-center`} onClick={() => {handleSort("status")}}>
                            <div className="flex justify-between">
                                Status
                                <SelectorIcon className="w-6 text-gray-700"/>
                            </div>
                        </div>
                        <div className={`${headerStyle} w-56`} onClick={() => {handleSort("building")}}>
                            <div className="flex justify-between">
                                Location
                                <SelectorIcon className="w-6 text-gray-700"/>
                            </div>
                        </div>
                        <div className={`${headerStyle} w-56`} onClick={() => {handleSort("office")}}>
                            <div className="flex justify-between">
                                Current Office
                                <SelectorIcon className="w-6 text-gray-700"/>
                            </div>
                        </div>
                        <div className={`${headerStyle} w-56`} onClick={() => {handleSort("currentUser")}}>
                            <div className="flex justify-between">
                                Current User
                                <SelectorIcon className="w-6 text-gray-700"/>
                            </div>
                        </div>
                        <div className="table-cell py-[1vw] px-[6vw] sm:px-[1vw] cursor-default truncate w-32 text-center">
                            Actions
                        </div>
                    </div>
                </div>

                {/* Check if there are data available to display */}
                {data.length > 0 ? (
                    // Table Row Group
                    <div className="table-row-group font-inter text-sm sm:text-lg lg:text-[1vw]">
                        {data.map((item, index) => (
                            // Table Row
                            <div className="table-row table-fixed border-b-[0.1vw] transition ease-out hover:transition hover:ease-in hover:bg-table-hover-color last:border-b-0" key={index}>
                                {/* Table Cells */}
                                <ViewItemModal style={`${dataStyle} w-64 font-bold`} data={item}>{item.deviceName}</ViewItemModal>
                                <ViewItemModal style={`${dataStyle} w-62 font-mono`} data={item}>
                                    {/* Since the serial number is not a required item field, we need to check if it is an empty string to be able to display properly. */}
                                    {
                                        item.serialNumber == "" ? "--" : item.serialNumber
                                    }
                                </ViewItemModal>
                                <ViewItemModal style={`${dataStyle}`} data={item}><div data-status={item.status} className='status'></div></ViewItemModal>
                                <ViewItemModal style={`${dataStyle}`} data={item}>{item.building}</ViewItemModal>
                                <ViewItemModal style={`${dataStyle}`} data={item}>{item.office}</ViewItemModal>
                                <ViewItemModal style={`${dataStyle}`} data={item}>{item.currentUser}</ViewItemModal>
                                <div className="table-cell text-center">
                                    {/* TODO: Separate buttons to modals para later na rin magrerender yung modal */}
                                    <EditDeleteItemModal
                                        data={data}
                                        index={index}
                                        setData={setData}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // If the inventory is still empty
                    <div className="h-[55vh] w-[82vw]">
                        <div className="text-lg pt-[15vh] text-center font-inter font-medium">
                            <i className=''>No data found.</i>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
};


export default InventoryTable;