import { useState, useEffect } from 'react';
// import { CSVLink } from "react-csv";
import { MenuAlt2Icon } from '@heroicons/react/solid';
import exportIcon from '../../assets/export.svg';
import PrimaryButton from '../../components/buttons/PrimaryBtn';

/* Components */
import AddItemModal from './modals/AddItemModal';
import Filter from '../../components/table/Filter';
import InventoryTable from './InventoryTable';
import SearchBar from '../../components/table/Search';
import Pagination from '../../components/table/Pagination';

/* Utility Functions */
import { getFetch } from '../../utils/apiRequest';
import uri from './../../uri';



/**
 * This component is the page for the inventory where users can browse the stored items.
 */
const Inventory = () => {

    // State handler for current inventory items in the database
    // can be replaced with useContext hook para di na need ipasa as props paulit-ulit sa other components
    const [currentData, setCurrentData] = useState([]);

    // State handler for export data
    const [exportData, setExportData] = useState([]);
    // State handler for pagination
    const [currentPage, setCurrentPage] = useState(1);
    // State handler for total pages
    const [totalPages, setTotalPages] = useState(0);
    // State handler for search value
    const [searchTerm, setSearchTerm] = useState('');
    // State handler for parameters for http requests
    const [params, setParams] = useState({
        // sortby: '',          // sort by device name, serial number, status, loc, curr office, curr user
        // order: '',           // -1 if Descending, 1 if Ascending. (0 by default (no sort))
        page: 0,
        sendpages: true,
    })

    //Maps data into csv fields
    const csv_headers = [
        {label: "Device Name", key:"deviceName"},
        {label: "Status", key:"status"},
        {label: "Category", key:"category"},
        {label: "MAC Address", key:"MACAddress"},
        {label: "Purchase Date", key:"purchaseDate"},
        {label: "Repletion Date", key:"repletionDate"},
        {label: "Serial Number", key:"serialNumber"},
        {label: "Building", key:"building"},
        {label: "Exact Location", key:"exactLocation"},
        {label: "Current User", key:"currentUser"},
        {label: "Current Office", key:"office"},
        {label: "Notes", key:"notes"},
    ]

    // Function used to fetch data from database and set display.
    async function getInventory() {
        // 3001/inventory?orderby=deviceName&order=1&page=0&sendpages=true
        var data = await getFetch(uri.backend + '/inventory/', params);
        if(data.pages){
            setTotalPages(data.pages);
        }
        await setDisplay(data.data);
    };

    //Exports 
    async function exportInventory(){
        var exportParams = params;
        exportParams.export = "true";
        var data = await getFetch(uri.backend + '/inventory/', exportParams);
        exportParams.export = "false";


        let inventory = [];

        if (data.data.length > 0) {
            // Map out the entries returned by fetch.
            data.data.forEach((item, index) => {
                inventory.unshift({
                    _id: item._id,
                    deviceName: item.deviceName,
                    status: item.status,
                    category: item.category,
                    MACAddress: item.MACAddress,
                    purchaseDate: new Date(item.purchaseDate*1000).toLocaleDateString("en-US"),
                    repletionDate: new Date(item.purchaseDate*1000).toLocaleDateString("en-US"),
                    serialNumber: item.serialNumber,
                    vendor: item.vendor,
                    building: item.building,
                    exactLocation: item.exactLocation,
                    office: item.office,
                    currentUser: item.currentUser,
                    notes: item.notes,
                });
            });
            // Setting UI table state
            setExportData([...inventory]);
        }        
    }

    // This function is used to update UI state.
    async function setDisplay(data) {
        let inventory = [];

        // Checking if the inventory collections in DB is empty.
        if (data.length > 0) {

            // Map out the entries returned by fetch.
            data.forEach((item, index) => {
                inventory.unshift({
                    _id: item._id,
                    deviceName: item.deviceName,
                    status: item.status,
                    category: item.category,
                    MACAddress: item.MACAddress,
                    purchaseDate: item.purchaseDate,
                    repletionDate: item.repletionDate,
                    serialNumber: item.serialNumber,
                    vendor: item.vendor,
                    building: item.building,
                    exactLocation: item.exactLocation,
                    office: item.office,
                    currentUser: item.currentUser,
                    notes: item.notes,
                });
            });
            // Setting UI table state
            setCurrentData([...inventory]);

        } else {
            setCurrentData([]);
        }
    }

    // Fetch data when you change pages
    const paginate = async (pageNumber) => {
        setCurrentPage(pageNumber);
        // Set query parameters
        setParams({
            page: pageNumber-1,
            sendpages: true
        });
    };

    // Function to handle search
    const handleSearch = event => {
        // Prevent page refresh upon form submission
        event.preventDefault();

        if (searchTerm !== "") {
            // Set query parameters
            setParams((prevState) => {
                return({
                    ...prevState,
                    deviceName: searchTerm
                });
            });
        }
        // TODO: Return none if search result isn't found(typing brack brings a server error)
        // TODO: If search query is an empty string, return all inventory
    };
    

    // Run this function on component mount
    useEffect(() => {
        // Select first page in pagination
        paginate(1);
    }, []);


    // Fetch inventory if 'params' state has been updated
    useEffect(() => {
        getInventory();
        console.log(params)
    }, [params]);


    // Triggers a download when there is data to be downloaded
    useEffect(() => {
        if (exportData.length > 0) document.getElementById("exporter").click();
    }, [exportData]);

    return (
        <>
            {/* Main page content */}
            <div className="bg-gray-50 min-h-screen w-full lg:w-[87vw] lg:absolute lg:top-0 lg:right-0">

                {/* Header */}
                <div className="px-[4vw] lg:px-[2.25vw] pt-[3vw] sm:pt-[1.5vw] flex text-lg sm:text-2.5xl fhd:text-[1.75vw] font-montserrat font-bold">
                    <span>Browse Inventory</span>
                    <MenuAlt2Icon className="hidden lg:block lg:w-7 fhd::w-[1.5vw] ml-3" />
                </div>

                <hr className='mt-3 lg:mt-7 border-1 border-gray-300 lg:border-dark-blue' />
                
                {/* TODO: May something dito na white bg na lumalabas, change bg to gray-600 para mas madaling makita */}
                <div className='px-[4vw] lg:px-[2.25vw] mt-[4vw] sm:mt-[1.5vw] lg:flex lg:w-full lg:justify-between'>
                    <div className='flex w-full'>
                        {/* Filters */}
                        <div className="absolute w-4/5 lg:w-1/3 z-10">
                            <Filter
                                params={params}
                                setParams={setParams}
                            />
                        </div>

                        {/* Search bar */}
                        <div className="ml-14 z-20">
                            <form onSubmit={handleSearch}>
                                <SearchBar
                                    searchValue={searchTerm}
                                    changeHandler={(e) => { setSearchTerm(e.target.value) }}
                                    placeholder="Search by device name..."
                                />
                            </form>
                        </div>
                    </div>
                    
                    <div className="flex mt-[4vw] sm:mt-6 lg:m-0 lg:pl-[1.25vw]">
                        <div className='flex justify-between space-x-4'>
                            {/* Add Item Button */}
                            <AddItemModal
                                data={currentData}
                                setData={setCurrentData}
                            />
                            
                            {/*Export Button */}                       
                            <PrimaryButton handleClick={exportInventory} textSize="text-xs sm:text-base lg:text-[1vw]">
                                <img className="inline-flex w-5 sm:w-5 mr-2 sm:mr-3 px-1 sm:px-0 lg:py-3 sm:py-1 fill" src={exportIcon} alt="Export button icon"/>
                                Export Data
                            </PrimaryButton>
                            {/* <CSVLink id="exporter" data={exportData} headers={csv_headers} filename="Inventory Export" target="_blank"> </CSVLink> */}
                            </div>
                        </div>


                </div>

                {/* Inventory Items Table */}
                <div className='mt-[3vw] lg:mt-0'>
                    <InventoryTable
                        data={currentData}
                        setData={setCurrentData}
                        params={params}
                        setParams={setParams}
                        getInventory={getInventory}
                    />
                </div>

                {/* Pagination */}
                <div className="pr-[2.5vw] float-right">
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        paginate={paginate}
                    />
                </div>
            </div>
        </>
    );
};


export default Inventory;
