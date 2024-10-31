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

function getCurrentDirectory() {
    const url = window.location.href;
    return url.substring(0, url.lastIndexOf('/')) + '/';
}

export { fetchDataFromFile };