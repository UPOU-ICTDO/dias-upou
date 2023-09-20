import { useState, useEffect } from 'react';
import { getFetch } from '../../utils/apiRequest';
import uri from './../../uri'

/* Components */
import AddEditorModal from './AddEditor';
import EditorsTable from './EditorsTable';
import Search from '../../components/table/Search';



/**
 * This component is the user control page which is only visible for the admins.
 */
const EditorControlPage = () => {

    // State handler for editors stored in the database
    const [currentData, setCurrentData] = useState([]);
    // Holds default arrangement of rows
    const [unsortedRows, setUnsortedRows] = useState([]);
    // State handler for search value
    const [searchTerm, setSearchTerm] = useState('');


    // Function used to fetch data from database and set display
    async function getEditors() {

        // Fetch data from database
        const body = await getFetch(uri.backend + '/editors/');

        let editors = [];

        // Map out the entries returned by fetch
        body.data.forEach((item) => {
            editors.unshift({
                _id: item._id,
                email: item.email,
                office: item.office,
                privileges: item.privileges
            });
        });

        // Set rows
        setCurrentData([...editors]);
        setUnsortedRows([...editors]);
    };

    // Run HTTP request on component mount
    useEffect(() => {
        getEditors()
    }, []);

    // Function used to prevent page from refreshing upon search input submission
    const preventDefault = event => {
        event.preventDefault();
    }


    /**
     * Function that will be used to display the table rows.
     * This function will also handle the search (which will be shouldered only by the client) since the dataset for this table is small enough.
     * -- If there is no searchKey, all rows will be displayed.
     * -- If there is a searchKey, only the rows containing any string that matches the searchKey will be displayed.
     */
    function getFilteredRows(rows, searchKey) {
        let temp = [];          // will hold the filtered rows

        // Filter out rows
        rows.filter((row) => {
            // Check if search key is found as substring in any of the values of any object
            Object.values(row).some((str) => {
                // Checking if a match is found
                if (("" + str).toLowerCase().includes(searchKey)) {
                    // If matched row is not yet in temp, push to temp
                    if (!temp.find(obj => obj.email === row.email)) {
                        temp.push(row);
                    };
                }
            })
        });

        // Return all matched/filtered rows
        return temp;
    }

    return (
        <div className="bg-gray-50 h-full lg:w-[87vw] lg:absolute lg:top-0 lg:right-0">
            {/* Page title */}
            <div className="px-[4vw] py-[5vw] sm:py-8 lg:py-[2vw] text-[5.1vw] sm:text-3xl lg:text-[1.85vw] font-montserrat font-bold">
                USER CONTROL PAGE
            </div>
            
            <div className="lg:flex px-[4vw] lg:mt-[2vh] justify-between">
                {/* Search bar */}
                <form onSubmit={preventDefault}>
                    <Search
                        searchValue={searchTerm}
                        changeHandler={(e) => { setSearchTerm(e.target.value) }}
                        placeholder="Search any keyword..."
                    />
                </form>

                {/* Add Editor Button */}
                <AddEditorModal data={currentData} setCurrentData={setCurrentData} />
            </div>

            {/* Table */}
            <div className="mt-[4vh] lg:mt-2 pb-[8vh]">
                <EditorsTable
                    data={getFilteredRows(currentData, searchTerm)}     // Passing the filtered rows
                    setCurrentData={setCurrentData}
                    unsortedRows={unsortedRows}
                    setUnsortedRows={setUnsortedRows}
                />
            </div>
        </div>
    );
};


export default EditorControlPage;