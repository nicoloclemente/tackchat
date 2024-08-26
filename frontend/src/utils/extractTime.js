// utils/extractTime.js
export function extractTime(dateString) {
    const date = new Date(dateString);

    // Controlla se la data è valida
    if (isNaN(date.getTime())) {
        return '';
    }

    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    return `${hours}:${minutes}`;
}

// Aggiungere uno zero iniziale ai numeri a una cifra
function padZero(number) {
    return number.toString().padStart(2, "0");
}