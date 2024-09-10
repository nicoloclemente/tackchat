export function extractTime(dateString) {
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
        return '';
    }

    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    return `${hours}:${minutes}`;
}

// Add a leading zero to single-digit numbers
function padZero(number) {
    return number.toString().padStart(2, "0");
}