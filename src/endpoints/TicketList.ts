import { Bool, Num, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { Result, Ticket } from "../types";
import { Env, TicketService } from "services/ticket.database.service";

export class TicketList extends OpenAPIRoute {
  schema = {
    tags: ["Tickets"],
    summary: "List Tickets",
    request: {
      query: z.object({
        page: Num({
          description: "Page number",
          default: 0,
        }),
        isCompleted: Bool({
          description: "Filter by completed flag",
          required: false,
        }),
      }),
    },
    responses: {
      "200": {
        description: "Returns a list of Tickets",
        content: {
          "application/json": {
            schema: z.object({
              series: z.object({
                success: Bool(),
                result: z.object({
                  Tickets: Ticket.array(),
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
    const service: TicketService = new TicketService();
    const result = await service.fetchTickets(env);
    return result;
  }
}
