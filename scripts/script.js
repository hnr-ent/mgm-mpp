const PRESERVE_WORDS = new Set([
    "NBA",
    "NHL",
    "MLB",
    "NFL",
    "VIP",
    "WNBA",
    "NCAA",
    "MMA",
    "UFC",
    "US",
    "NJ",
    "PA",
    "MI",
    "ON"
]);

// ================================
// Normalize Text
// ================================

function normalizeText(text) {
    return text
        .replace(/\r/g, "")
        .replace(/[ \t]+/g, " ")
        .trim();
}

// ================================
// Find Section Start
// ================================

function findSectionStart(lines, sections) {
    return lines.findIndex(line =>
        sections.some(section =>
            line
                .toUpperCase()
                .includes(section.toUpperCase())
        )
    );
}

// ================================
// Get Lines Within a Section
// ================================

function getSectionLines(lines, config) {

    const start = findSectionStart(
        lines,
        config.sections
    );

    if (start === -1) {
        return [];
    }

    const nextSection = Object.values(FIELD_CONFIG)
        .flatMap(field => field.sections)
        .filter(section =>
            !config.sections.includes(section)
        )
        .find(section =>
            lines
                .slice(start + 1)
                .some(line =>
                    line
                        .toUpperCase()
                        .includes(section.toUpperCase())
                )
        );

    let end = lines.length;

    if (nextSection) {

        const foundIndex = lines.findIndex(
            (line, index) =>
                index > start &&
                line
                    .toUpperCase()
                    .includes(nextSection.toUpperCase())
        );

        if (foundIndex !== -1) {
            end = foundIndex;
        }
    }

    return lines.slice(start, end);
}

// ================================
// Extract Field
// ================================

function extractField(lines, config) {

    const sectionLines = getSectionLines(
        lines,
        config
    );

    if (!sectionLines.length) {
        return "";
    }

    for (let i = 0; i < sectionLines.length; i++) {

        const line = sectionLines[i];

        const matchedLabel = config.labels.some(label => {

            if (label instanceof RegExp) {
                return label.test(line);
            }

            return line
                .toUpperCase()
                .includes(label.toUpperCase());

        });

        if (!matchedLabel) continue;

        // Example:
        // H1: My Promo
        // Promotional Name: My Promo

        const sameLineMatch = line.match(/:\s*(.+)$/);

        if (
            sameLineMatch &&
            sameLineMatch[1].trim()
        ) {
            return sameLineMatch[1].trim();
        }

        // Example:
        // H1:
        // My Promo

        for (let j = i + 1; j < sectionLines.length; j++) {

            const value = sectionLines[j].trim();

            if (!value) continue;

            // Skip helper/meta lines

            if (
                value.startsWith("[") ||
                value.startsWith("(") ||
                value.toUpperCase().includes("HERO IMAGE") ||
                value.includes(":")
            ) {
                continue;
            }

            return value;
        }
    }

    return "";
}

// ================================
// Extract All Fields
// ================================

function extractAll() {

    const text = normalizeText(
        document.querySelector("#finalcopy").value
    );

    const lines = text
        .split("\n")
        .map(line => line.trim());

    Object.values(FIELD_CONFIG).forEach(config => {

        let value = "";

if (config.pattern) {
    value = extractPattern(text, config);
} else {
    value = extractField(lines, config);
}

        const output = document.querySelector(
            config.output
        );

        if (output) {

    let finalValue = value;

    if (
        config.capitalize &&
        finalValue
    ) {
        finalValue = toCapitalCase(finalValue);
    }

    output.value = finalValue;
}

    });

}

function extractPattern(text, config) {

    const match = text.match(config.pattern);

    if (!match) {
        return "";
    }

    let value = match[0].trim();

    if (
        config.appendText &&
        !value.endsWith(config.appendText)
    ) {
        value += config.appendText;
    }

    return value;
}

// ================================
// Event Listeners
// ================================

document
    .querySelector("#extractBtn")
    .addEventListener("click", extractAll);