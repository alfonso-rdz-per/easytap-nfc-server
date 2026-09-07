const { getSheets } = require("../config/google");

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const CLIENTS_RANGE = process.env.CLIENTS_RANGE || "Clientes!A:J";

if (!SPREADSHEET_ID) {
    throw new Error("Falta la variable de entorno SPREADSHEET_ID");
}

async function obtenerClientes() {
    const sheets = await getSheets();

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: CLIENTS_RANGE
    });

    return response.data.values || [];
}

module.exports = {
    obtenerClientes
};
