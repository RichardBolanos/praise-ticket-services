import { fromHono } from "chanfana";
import { Hono } from "hono";
import { TicketCreate } from "./endpoints/TicketCreate";
import { TicketDelete } from "./endpoints/TicketDelete";
import { TicketFetch } from "./endpoints/TicketFetch";
import { TicketList } from "./endpoints/TicketList";

// Start a Hono app
const app = new Hono();

app.use("*", async (c, next) => {
  // Permitir CORS para todas las solicitudes
  c.header("Access-Control-Allow-Origin", "*"); // Cambiar a un dominio específico en producción
  c.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  c.header("Access-Control-Allow-Headers", "Content-Type, Accept, Accept-Language, Origin, Referer, User-Agent, X-Requested-With, Priority, Sec-CH-UA, Sec-CH-UA-Mobile, Sec-CH-UA-Platform, Sec-Fetch-Dest, Sec-Fetch-Mode, Sec-Fetch-Site");

  // Manejar preflight requests (OPTIONS)
  if (c.req.method === "OPTIONS") {
    return c.text("", 204);
  }

  await next();
});

// Configuración de OpenAPI
const openapi = fromHono(app, {
  docs_url: "/",
});

// Definición de rutas
openapi.get("/api/Tickets", TicketList);
openapi.post("/api/Tickets", TicketCreate);
openapi.get("/api/Tickets/:ticketId", TicketFetch);
openapi.delete("/api/Tickets/:ticketId", TicketDelete);

// Exportar la app
export default app;
