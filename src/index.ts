import { OpenAPIRouter } from "@cloudflare/itty-router-openapi";
import { TicketCreate } from "./endpoints/TicketCreate";
import { TicketDelete } from "./endpoints/TicketDelete";
import { TicketFetch } from "./endpoints/TicketFetch";
import { TicketList } from "./endpoints/TicketList";
import { createCors } from 'itty-router';
import { TicketUpdate } from "endpoints/TicketUpdate";

// Crear el router y configurar la URL de la documentación
export const router = OpenAPIRouter({
  docs_url: "/",
});

// Configuración de CORS
const { preflight, corsify } = createCors({
  origins: ['*'], // Cambiar a un dominio específico en producción
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'PUT'],
  headers: ['*'],
});

// Definición de rutas
router.get("/api/Tickets", TicketList);
router.post("/api/Tickets", TicketCreate);
router.get("/api/Tickets/:ticketId", TicketFetch);
router.delete("/api/Tickets/:ticketId", TicketDelete);
router.put("/api/Tickets/:ticketId", TicketUpdate);

// Manejar solicitudes preflight (OPTIONS) para CORS
router.all('*', preflight);

// Exportar la función de manejo de solicitudes
export default {
  fetch: async (request: any, env: any, ctx: any) => {
    return router.handle(request, env, ctx).then(corsify);
  },
};
