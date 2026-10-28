export default function weatherCode(code) {
    const codes = {
        0  : 'Clear sky',
        1  : 'Mainly clear',
        2  : 'Partly cloudy',
        3  : 'Overcast'
    }
    const currentCode = codes[code];
    return currentCode;
}