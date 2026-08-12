const FIELD_CONFIG = {
    ticketURL: {
    output: "#url-output",
    capitalize: false,
    sections: [
        "TICKET URL",
        "TICKET-URL"
    ],
    labels: [
        /TICKET URL/i,
        /TICKET-URL/i
    ]
},

creativePath: {
    output: "#image-output",
    capitalize: false,
    sections: [
        "CREATIVES PATH",
        "CREATIVE PATH",
        "CREATIVES",
        "CREATIVE",
        "ASSETS PATH",
        "ASSET PATH"
    ],
    labels: [
        /CREATIVES? PATH/i,
        /CREATIVE PATH/i,
        /ASSETS? PATH/i,
        /^CREATIVES?$/i,
        /^ASSETS?$/i
    ],
    appendText: "MPP-1080x486"
},
    promoHubTitle: {
        output: "#promoHubTitle-output",
        capitalize: true,
        sections: [
            "PROMO HUB",
            "PROMO HUB KEY TERMS",
            "PROMOTION HUB"
        ],
        labels: [
            /^\s*H1\b/i
        ]
    },

    landingPageTitle: {
        output: "#landingPageTitle-output",
        capitalize: true,
        sections: [
            "PROMO LANDING PAGE",
            "PROMO LANDING",
            "PROMOTION LANDING PAGE"
        ],
        labels: [
            /PROMOTIONAL NAME/i,
            /PROMOTION NAME/i,
            /PROMO NAME/i
        ]
    },

    promoDate: {
        output: "#date-output",
        capitalize: true,
        sections: [
            "PROMOTIONAL DATES",
            "PROMOTIONAL DATE",
            "PROMOTION DATES",
            "PROMOTION DATE",
            "PROMO DATES",
            "PROMO DATE"
        ],
        labels: [
            /PROMOTIONAL DATES?/i,
            /PROMOTION DATES?/i,
            /PROMO DATES?/i,
            /^DATES?\b/i
        ]
    }
};