# EasyTap — NFC redirect server

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express_5-000000?style=flat&logo=express&logoColor=white)
![Google Sheets API](https://img.shields.io/badge/Google_Sheets_API-34A853?style=flat&logo=googlesheets&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

API mínima en **Express** que resuelve las redirecciones de los tags NFC de
[EasyTap](https://easytap.mx). Cada tag apunta a `https://<host>/tap/<id>`; el
servidor busca ese `id` en una hoja de Google Sheets y redirige a la URL que el
negocio tenga configurada (su menú, WhatsApp, reseñas de Google, etc.).

Usar una hoja de cálculo como "base de datos" permite que el negocio actualice
su destino sin tocar código ni volver a programar el tag.

## Cómo funciona

```mermaid
flowchart TD
    T[Tag NFC] -->|GET /tap/:id| S[Express]
    S -->|cuenta de servicio| G[(Google Sheet<br/>pestaña Clientes)]
    G --> F{fila con A == :id}
    F -->|no existe| E404[404 Cliente no encontrado]
    F -->|columna G != TRUE| E403[403 NFC desactivado]
    F -->|sin URL en columna F| E409[409 Sin destino]
    F -->|ok| R[302 redirect<br/>a la URL de la columna F]
```

## Qué demuestra este proyecto

- API REST pequeña y bien separada: `routes → controllers → services → config`.
- Integración con la **Google Sheets API** mediante una **cuenta de servicio**
  (`googleapis`, credenciales por variable de entorno, sin archivos secretos en
  el repo).
- Manejo de errores con códigos HTTP significativos (404 / 403 / 409 / 502).
- Configuración por entorno (`dotenv`), endpoint `/health`.

## Stack

Node.js · Express 5 · googleapis · dotenv

## Primeros pasos

```bash
npm install
cp .env.example .env     # completar SPREADSHEET_ID y GOOGLE_CREDENTIALS
npm run dev
```

Probar: <http://localhost:3000/tap/DEMO123>

## Estructura de la hoja "Clientes"

| Columna | Contenido |
|---|---|
| A | ID del tag NFC (lo que va en la URL) |
| F | URL de destino |
| G | `TRUE` / `FALSE` — si el tag está activo |

(El resto de columnas se usan para datos internos del negocio.)

## Licencia

[MIT](./LICENSE)
