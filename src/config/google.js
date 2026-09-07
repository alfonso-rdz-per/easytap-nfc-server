const { google } = require("googleapis");

// Credenciales de una cuenta de servicio de Google Cloud con la API de Sheets
// habilitada. Se pasan como JSON en una sola variable de entorno para no tener
// que versionar el archivo credentials.json.
if (!process.env.GOOGLE_CREDENTIALS) {
    throw new Error("Falta la variable de entorno GOOGLE_CREDENTIALS");
}

const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);

const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"]
});

async function getSheets() {
    const client = await auth.getClient();
    return google.sheets({ version: "v4", auth: client });
}

module.exports = { getSheets };
