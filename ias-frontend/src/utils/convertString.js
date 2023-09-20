
/**
 * This utility function converts strings styled with pascal case and separated by underscores into title case.
 * @param {string} str String of text you want to convert.
*/
export function convertString(str) {

    const exceptions = ["Of ", "And ", "The ", "Ng "]

    // replace underscores with comma
    str = str.replace(/(_)/g, ",");
    
    str = str
        // make sure the first letter is capitalized
        .charAt(0).toUpperCase() + str.slice(1)

        // inject space before the upper case letters
        .replace(/([A-Z])/g, function (match) {
            return " " + match;
        })

        // make exceptions for certain articles
        .replace(/(Of|And|The|Ng)\s/g, function (match) {
            if (exceptions.includes(match)) {
                return match.charAt(0).toLowerCase() + match.slice(1)
            }
        })
    
        // trim any whitespace
        .trim();
    
    return str;
};