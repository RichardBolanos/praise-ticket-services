import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { Result, Ticket } from "../types";
import { TicketService } from "services/ticket.database.service";

export class TicketCreate extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Tickets"],
    summary: "Create a new Ticket",
    requestBody: Ticket,
    responses: {
      "200": {
        description: "Returns the created Ticket",
        schema: {
          success: Boolean,
          result: {
            data: Ticket,
            message: String,
          },
        },
      },
      "400": {
        description: "Invalid request body",
        schema: {
          success: Boolean,
          result: {
            data: {},
            message: String,
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
    // Retrieve the validated request body
    const ticketToCreate: Ticket = data.body;
    const ticketService = new TicketService();

    try {
      const createdTicket = await ticketService.addTicket(env, ticketToCreate);
      return createdTicket;
    } catch (error) {
      return {
        success: false,
        result: {
          data: [],
          message: error.message || "Failed to create the ticket",
        },
      };
    }
  }
}
