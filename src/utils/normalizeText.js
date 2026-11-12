export function normalizeText(text) {
    return text
        .trim()
        .replace(/ي/g, "ی")
        .replace(/ك/g, "ک");
}