import { Bool, OpenAPIRoute, Str } from "chanfana";
import { z } from "zod";
import { Result, Ticket } from "../types";
import { Env, TicketService } from "services/ticket.database.service";


export class TicketDelete extends OpenAPIRoute {
  schema = {
    tags: ["Tickets"],
    summary: "Delete a Ticket",
    request: {
      params: z.object({
        ticketId: Str({ description: "Ticket id" }),
      }),
    },
    responses: {
      "200": {
        description: "Returns if the Ticket was deleted successfully",
        content: {
          "application/json": {
            schema: z.object({
              series: z.object({
                success: Bool(),
                result: z.object({
                  Ticket: Ticket,
                }),
              }),
            }),
          },
        },
      },
    },
  };

  async handle(c: { env: Env }): Promise<Result> {
	const { env } = c;
    const data = await this.getValidatedData<typeof this.schema>();
    const { ticketId } = data.params;
    const ticketService = new TicketService();
    const result = await ticketService.deleteTicket(env, ticketId);
    return result;
  }
}
