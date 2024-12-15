import { OpenAPIRoute, OpenAPIRouteSchema, Query } from "@cloudflare/itty-router-openapi";
import { Result, Ticket } from "../types";
import { TicketService } from "services/ticket.database.service";

export class TicketList extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Tickets"],
    summary: "List Tickets",
    parameters: {
      page: Query(Number, {
        description: "Page number",
        default: 0,
      }),
      isCompleted: Query(Boolean, {
        description: "Filter by completed flag",
        required: false,
      }),
    },
    responses: {
      "200": {
        description: "Returns a list of Tickets",
        schema: {
          success: Boolean,
          result: {
            tickets: [Ticket], // Aseguramos que esto siga la estructura correcta
          },
        },
      },
    },
  };

  async handle(
    request: Request,
    env: any,
    context: any,
    data: { query: { page: number; isCompleted?: boolean } } // Definimos el tipo de datos
  ): Promise<Result> {
    // Retrieve the validated parameters
    // const { page, isCompleted } = data.query;

    const ticketService = new TicketService();

    
    return await ticketService.fetchTickets(env);
  }
}
