// utils/formatDate.js

/**
 * Formatta una data in formato esteso.
 * @param {string | Date} dateString - La stringa della data o l'oggetto Date da formattare.
 * @returns {string} - La data formattata in formato esteso.
 */
export const formatFullDate = (dateString) => {
    const date = new Date(dateString);

    // Verifica se la data è valida
    if (isNaN(date.getTime())) {
        return "Invalid date";
    }


    const getMonthName = (monthIndex) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return months[monthIndex];
    };

    const monthName = getMonthName(date.getMonth());
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${monthName} ${day}, ${year} at ${formattedHours}:${formattedMinutes}`;
};