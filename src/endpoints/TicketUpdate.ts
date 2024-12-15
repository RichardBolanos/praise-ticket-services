import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
  Path,
} from "@cloudflare/itty-router-openapi";
import { Result, Ticket } from "../types";
import { TicketService } from "services/ticket.database.service";

export class TicketUpdate extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Tickets"],
    summary: "Update an existing Ticket",
    parameters: {
      ticketId: Path(String, {
        description: "Ticket ID",
      }),
    },
    requestBody: Ticket,
    responses: {
      "200": {
        description: "Returns the updated Ticket",
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
      "404": {
        description: "Ticket not found",
        schema: {
          success: Boolean,
          result: {
            data: {},
            message: String,
          },
        },
      },
      "409": {
        description: "Conflict updating ticket (e.g., ticket already paid)",
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
    const { ticketId } = data.params;
    const updates = data.body; // Obtener el ID y las actualizaciones del cuerpo de la solicitud
    const ticketService = new TicketService();

    try {
      const updatedTicket = await ticketService.updateTicket(
        env,
        ticketId,
        updates
      ); // Llama al servicio para actualizar el ticket
      return updatedTicket;
    } catch (error) {
      // Manejar errores específicos basados en el contexto
      if (
        error.message.includes("already entered")
      ) {
        return {
          success: false,
          result: {
            data: [],
            message: "Ticket cannot be updated because it is already entered.",
          },
        };
      }

      if (error.message.includes("element not found")) {
        return {
          success: false,
          result: {
            data: [],
            message: "Ticket not found.",
          },
        };
      }

      return {
        success: false,
        result: {
          data: [],
          message: error.message || "Failed to update the ticket",
        },
      };
    }
  }
}
