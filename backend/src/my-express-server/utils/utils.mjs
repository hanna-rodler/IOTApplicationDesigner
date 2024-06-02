export function getFileName(discover_prefix) {
    if(discover_prefix !== '') {
        console.log('has file name');
        return discover_prefix + '.json';
    } else {
        console.log('get date string');
        const currentDateTime = new Date();
        // Format the date and time as a string
        const formattedDateTime = currentDateTime.toISOString().slice(0, 19).replace('T', '_').replaceAll(':', '-');

        console.log("Current date and time:", formattedDateTime);
        return formattedDateTime + '.json';
    }
}