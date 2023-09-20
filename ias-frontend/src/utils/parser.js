
// Referenced from https://sebhastian.com/javascript-csv-to-array/.
/**
 * This utility function converts a given long string into an array of objects.
 * @param {string} str String of text you want to convert to an array
 * @param {string} delimiter
 * @returns {Promise<Array<Object>>} A promise that resolves an array of grade records, terms, gwa, and recommended units
*/

/*
    TODO: Gawing dynamic if may time pa, para pwede kahit anong arrangement ng columns

    What are the columns of a CSV File? (in order)
                    deviceName,
                    status,
                    category,
                    MACAddress *,
                    purchaseDate,
                    repletionDate,
                    serialNumber *,
                    vendor *,
                    building,
                    exactLocation,
                    currentUser,
                    office,
                    notes *
        Legend:
        * Not required
*/
export function csvToArray(str, delimiter = ",") {
  
    // slice from \n index + 1 to the end of the text
    // use split to create an array of each csv value row
    return new Promise((resolve, reject) => {
        try {
            let rows = str
                .trim()
                .slice(str.indexOf("\n") + 1)
                .split("\n");
        
            let arr = rows.map(function (row) {
                const values = row.split(delimiter);
                let [
                    deviceName,
                    status,
                    category,
                    MACAddress,
                    purchaseDate,
                    repletionDate,
                    serialNumber,
                    vendor,
                    building,
                    exactLocation,
                    currentUser,
                    office,
                    notes
                ] = values;
    
                return {
                    deviceName,
                    status,
                    category,
                    MACAddress,
                    purchaseDate,
                    repletionDate,
                    serialNumber,
                    vendor,
                    building,
                    exactLocation,
                    currentUser,
                    office,
                    notes
                };
            });
            resolve(arr);

        } catch (error) {
            reject(error);
        }
    });
}
  
/**
 * This utility function is used to extract a csv file's content.
 * @param {File} file
 * @returns {string | ArrayBuffer} Content of the file passed
*/
export function fileReader(file) {
    const reader = new FileReader();
    
    return new Promise((resolve, reject) => {
        reader.onerror = function () {
            reader.abort();
            reject(new DOMException("Problem parsing file"));
        };
  
        reader.onload = function (e) {
            resolve(reader.result);
        };
  
        reader.readAsText(file);
    });
}