// Turns specific text in specific input boxes into Capitalization Case

function toCapitalCase(text) {
    return text
        .toLowerCase()
        .split(" ")
        .filter(word => word.length)
        .map(word => {
            const parts = word.match(/^([^A-Za-z0-9]*)([A-Za-z0-9']+)([^A-Za-z0-9]*)$/);

            if (!parts) return word;

            const [, pre, core, post] = parts;
            const upperCore = core.toUpperCase();

            if (typeof PRESERVE_WORDS !== "undefined") {
                const preserved = Array.from(PRESERVE_WORDS).find(p => p.toUpperCase() === upperCore);
                if (preserved) {
                    return pre + preserved + post;
                }
            }

            return pre + (core.charAt(0).toUpperCase() + core.slice(1)) + post;
        })
        .join(" ");
}

function capitalizeFields() {

    const fields = [
        "#promoHubTitle-output",
        "#landingPageTitle-output"
    ];

    fields.forEach(selector => {

        const input = document.querySelector(selector);

        if (!input || !input.value.trim()) {
            return;
        }

        input.value = toCapitalCase(
            input.value
        );

    });

}

document
    .querySelector("#capCase")
    .addEventListener(
        "click",
        capitalizeFields
    );
