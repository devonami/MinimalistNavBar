/**
 * Fetches JSON data from a specified file path.
 *
 * @param {string} filePath - The relative path to the file from which to fetch data.
 * @return {Promise<object>} The parsed JSON object from the file.
 *
 * @throws string WIll throw an error if the fetch operation fails or if the response is not ok.
 */
async function fetchDataFromFile(filePath) {
    try {
        const currentDir = getCurrentDirectory();
        const response = await fetch(currentDir + filePath);
        if (!response.ok) throw response.statusText;
        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}

/**
 * Retrieves the current directory from the browser's URL.
 *
 * @return {string} The current directory path ending with a slash.
 */
function getCurrentDirectory() {
    const url = window.location.href;
    return url.substring(0, url.lastIndexOf('/')) + '/';
}

export { fetchDataFromFile };