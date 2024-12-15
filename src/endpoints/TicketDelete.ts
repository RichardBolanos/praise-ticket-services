import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
  Path,
} from "@cloudflare/itty-router-openapi";
import { Result, Ticket } from "../types";
import { TicketService } from "services/ticket.database.service";

export class TicketDelete extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Tickets"],
    summary: "Delete a Ticket",
    parameters: {
      ticketId: Path(String, {
        description: "Ticket ID",
      }),
    },
    responses: {
      "200": {
        description: "Returns if the Ticket was deleted successfully",
        schema: {
          success: Boolean,
          result: {
            data: Ticket, // Cambié 'ticket' a 'data' para seguir la estructura de 'Result'
          },
        },
      },
    },
  };

  async handle(
    request: Request,
    env: any,
    context: any,
    data: Record<string, any>
  ): Promise<Result> {
    // Retrieve the validated ticket ID
    const { ticketId } = data.params;

    const ticketService = new TicketService();

    // Implement your own object deletion here
    const deletedTicket = await ticketService.deleteTicket(env, ticketId);

    // Return the result structure
    return deletedTicket;
  }
}
