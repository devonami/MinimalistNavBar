/**
 * Retrieves the current time for the specified city.
 *
 * @param {string} cityName - The name of the city for which to retrieve the time.
 * @return {Promise<string>} The current time in the specified city in ISO 8601 format, or an empty string if the city is not found or an error occurs.
 */
async function getTimeForCity(cityName) {
    try {
        let area = '';
        let location = '';
        switch (cityName.toLowerCase().replace(/\s/g, '-')) {
            case 'cupertino':
            case 'new-york-city':
                area = 'America';
                break;
            case 'london':
            case 'amsterdam':
                area = 'Europe';
                break;
            case 'tokyo':
            case 'hong-kong':
                area = 'Asia';
                break;
            case 'sydney':
                area = 'Australia';
                break;
        }

        if (!area) {
            console.log(`could not find area for city: ${cityName}`);
            return '';
        }

        switch (cityName.toLowerCase().replace(/\s/g, '-')) {
            case 'cupertino':
                location = 'Los_Angeles';
                break;
            case 'new-york-city':
                location = 'New_York';
                break;
            case 'hong-kong':
                location = 'Hong_Kong';
                break
            default:
                location = cityName;
                break;
        }

        const response = await fetch(`https://worldtimeapi.org/api/timezone/${area}/${location}`);
        if (!response.ok) {
            console.log(`could not fetch time for city: ${cityName}`, response.status);
            return '';
        }
        const tzData = await response.json();
        return formatDateString(tzData['datetime']);
    } catch (error) {
        console.error('Error fetching time:', error);
        return '';
    }
}

/**
 * Formats a date-time string from 'YYYY-MM-DDTHH:MM:SS' format to 'Mon DD, YYYY HH:MM' format.
 * Javascript datetime handling is literally the worst thing ever.
 *
 * @param {string} dateString - The date-time string in 'YYYY-MM-DDTHH:MM:SS' format.
 * @return {string} The formatted date-time string in 'Mon DD, YYYY HH:MM' format.
 */
function formatDateString(dateString) {
    const dateTimeArray = dateString.split('T');
    const date = dateTimeArray[0].split('-');
    const time = dateTimeArray[1].split(':');

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formattedDate = `${months[parseInt(date[1]) - 1]} ${date[2]}, ${date[0]}`;
    const formattedTime = `${time[0]}:${time[1]}`;

    return `${formattedDate} ${formattedTime}`;
}

export { getTimeForCity };