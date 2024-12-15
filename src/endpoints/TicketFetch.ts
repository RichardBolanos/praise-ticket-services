import { OpenAPIRoute, OpenAPIRouteSchema, Path } from "@cloudflare/itty-router-openapi";
import { Result, Ticket } from "../types";
import { TicketService } from "services/ticket.database.service";

export class TicketFetch extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Tickets"],
    summary: "Get a single Ticket by ID",
    parameters: {
      ticketId: Path(String, {
        description: "Ticket ID",
      }),
    },
    responses: {
      "200": {
        description: "Returns a single Ticket if found",
        schema: {
          success: Boolean,
          result: {
            data: Ticket, // Cambié 'ticket' a 'data' para seguir la estructura de 'Result'
          },
          error: String,
        },
      },
      "404": {
        description: "Ticket not found",
        schema: {
          success: Boolean,
          result: {}, // Estructura vacía para 'result'
          error: String,
        },
      },
    },
  };

  async handle(
    request: Request,
    env: any,
    context: any,
    data: Record<string, any>
  ): Promise<any> {
    // Retrieve the validated Ticket ID
    // const { ticketId } = data.params;

    // const ticketService = new TicketService();
    
    // // Fetch the ticket by ID
    // const ticket = await ticketService.getTicketById(env, ticketId);

    // if (!ticket) {
    //   return Response.json(
    //     {
    //       success: false,
    //       error: "Ticket not found",
    //       result: {},
    //     },
    //     { status: 404 }
    //   );
    // }

    // const response: Result = {
    //   success: true,
    //   result: {
    //     data: ticket, // Cambié 'ticket' a 'data' para seguir la estructura de 'Result'
    //   },
    //   error: "",
    // };

    // return Response.json(response, { status: 200 });
  }
}
