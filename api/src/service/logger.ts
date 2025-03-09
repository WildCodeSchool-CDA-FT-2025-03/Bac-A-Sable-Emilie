import { createLogger, format, transports } from "winston";
//configuration d'un système de logging en utilisant la bibliothèque Winston dans un projet Node.js.
// Ici, il définit un logger qui, selon l'environnement (NODE_ENV), enregistre les logs soit dans la console soit dans un fichier.
//createLogger : pour créer un logger personnalisé.
//format : pour formater les logs.
//transports : pour définir où les logs seront envoyés (console, fichier, base de données, etc.).

// ********** 1. DEFINITION DU FORMAT CSV POUR LES LOGS
const toSCV = format.printf(
	({ timestamp, message, level }) =>
		`${timestamp}, ${level}, ${JSON.stringify(message)}`,
);
//Cette fonction toSCV définit un format personnalisé pour les logs :
//Il affiche la date/heure (timestamp).
//Il affiche le niveau de log (level, comme "error", "info", etc.).
//Il convertit le message en chaîne JSON (JSON.stringify(message)).
//Les informations sont séparées par des virgules, ce qui rappelle un format CSV.

// ********** 2. CONFIGURATION DES TRANSPORTS  (destination des logs)
const loggerTransporter = [];
//  On initialise un tableau qui contiendra les différents moyens (transports) d'enregistrer les logs.

if (process.env.NODE_ENV !== "production") {
	// 🔥 Si l'environnement (NODE_ENV) n'est pas "production", alors les logs seront affichés dans la console en format JSON.
	loggerTransporter.push(
		new transports.Console({
			format: format.json(),
		}),
	);
} else {
	// 🔥 Si l'application EST en production les logs seront enregistrés dans un fichier log/error.log.
	loggerTransporter.push(
		new transports.File({
			filename: "log/error.log",
			level: "error", // Seuls les logs de niveau "error" seront stockés.
			format: format.combine(format.timestamp(), toSCV), // Le format des logs inclut un timestamp et suit le format défini par toSCV (timestamp, niveau, message).
		}),
	);
}

// ********* 3. CREATION DU LOGGER
const logger = createLogger({
	level: "error", // Le logger est créé avec un niveau minimum de log "error" (il ne prendra en compte que les logs de niveau error et supérieur).
	format: format.combine(format.timestamp(), format.json()), // Il utilise un format JSON par défaut.
	transports: loggerTransporter, // Il applique les transports définis dans loggerTransporter.
});

// ********** 4. EXPORTATION DU LOGGER
export default logger;
