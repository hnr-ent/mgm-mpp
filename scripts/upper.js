function toCapitalCase(text) {
    return text
        .toLowerCase()
        .split(" ")
        .filter(word => word.length)
        .map(word =>
            word.charAt(0).toUpperCase() +
            word.slice(1)
        )
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
