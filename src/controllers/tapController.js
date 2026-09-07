const { obtenerClientes } = require("../services/sheetsService");

// Índices de columna en la hoja "Clientes"
const COL_ID = 0;          // A: identificador del tag NFC
const COL_DESTINO = 5;     // F: URL a la que se redirige
const COL_ACTIVO = 6;      // G: "TRUE" si el tag está activo

async function tap(req, res) {
    const { id } = req.params;

    let clientes;
    try {
        clientes = await obtenerClientes();
    } catch (error) {
        console.error("Error al leer Google Sheets:", error);
        return res.status(502).send("No se pudo resolver el destino");
    }

    const cliente = clientes.find(fila => fila[COL_ID] === id);

    if (!cliente) {
        return res.status(404).send("Cliente no encontrado");
    }

    const activo = cliente[COL_ACTIVO];
    if (activo !== "TRUE" && activo !== true) {
        return res.status(403).send("NFC desactivado");
    }

    const destino = cliente[COL_DESTINO];
    if (!destino) {
        return res.status(409).send("El cliente no tiene un destino configurado");
    }

    return res.redirect(destino);
}

module.exports = { tap };
