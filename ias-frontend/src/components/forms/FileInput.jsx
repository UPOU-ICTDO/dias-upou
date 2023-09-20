import { csvToArray, fileReader } from '../../utils/parser.js';
import { postFetch } from '../../utils/apiRequest';
import Swal from 'sweetalert2';


/* This component is used to upload a file and process the contents of said file. */
const FileInput = () => {

    // Change handler for file input
    function handleChange(e) {
        const [file] = e.target.files;

        // Converting file content into a promise object and accessing the
        // value of the promise by using the 'then' function.
        fileReader(file).then(result => {
            
            // csvToArray result will convert the long string to an array of objects.
            csvToArray(result).then(arr => {

                postFetch("http://localhost:3001/inventory/bulk_upload", arr)
                    .then((res) => {
                        if (!res) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Server Error',
                                text: 'Action has been aborted.',
                            });
                        } else {
                            Swal.fire(
                                'Success',
                                'File has been uploaded successfully!',
                                'success'
                            );
                        };
                    });
            });
        });
    }

    return (
        // Since input tags cannot be styled, the input is wrapped in a label component which will contain the styling.
        <form className="mt-[1.2vw] sm:mt-2">
            <label className="rounded-lg px-5 py-2 sm:py-2.5 cursor-pointer font-medium font-poppins text-center
                    text-sm sm:text-lg text-btn-text bg-primary-btn hover:bg-primary-btn-hover
                    focus:ring-2 focus:outline-none focus:ring-green-400">
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleChange}
                    hidden
                />
                    Upload File
            </label>
        </form>
    );
};


export default FileInput;