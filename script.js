const askPermissionAndSendIP = () => {
    // 1. Demander l'autorisation
    const userAccepted = confirm(
        "Ce jeu souhaite collecter votre adresse IP et votre localisation approximative pour améliorer l'expérience. Acceptez-vous ?"
    );

    if (!userAccepted) {
        console.log("L'utilisateur a refusé le tracking. Rien n'est envoyé.");
        return;
    }

    // 2. Si accepté → envoyer les infos
    fetch('https://api.ipify.org?format=json')
        .then(ipResponse => ipResponse.json())
        .then(ipData => {
            const ip = ipData.ip;

            return fetch(`https://ipapi.co/${ip}/json/`)
                .then(geoResponse => geoResponse.json())
                .then(geoData => {
                    const webhookURL = "TA_WEBHOOK_ICI";

                    return fetch(webhookURL, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            username: "Game Logger",
                            content: "Nouvel utilisateur (avec consentement)",
                            embeds: [
                                {
                                    title: "Infos de l'utilisateur",
                                    description:
                                        `**IP :** ${ip}\n` +
                                        `**Ville :** ${geoData.city}\n` +
                                        `**Région :** ${geoData.region}\n` +
                                        `**Pays :** ${geoData.country_name}`,
                                    color: 0x3498db
                                }
                            ]
                        })
                    });
                });
        })
        .then(response => {
            if (response.ok) console.log("Données envoyées !");
            else console.log("Échec de l'envoi.");
        })
        .catch(err => {
            console.error("Erreur :", err);
        });
};

askPermissionAndSendIP();
