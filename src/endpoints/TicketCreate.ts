import { Result, Ticket } from "../types";
import { Bool, OpenAPIRoute } from "chanfana";
import { Env, TicketService } from "services/ticket.database.service";
import { z } from "zod";

export class TicketCreate extends OpenAPIRoute {
  schema = {
    tags: ["Tickets"],
    summary: "Create a new Ticket",
    request: {
      body: {
        content: {
          "application/json": {
            schema: Ticket,
          },
        },
      },
    },
    responses: {
      "200": {
        description: "Returns the created Ticket",
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
    const ticketToCreate = data.body as Ticket;

    const service: TicketService = new TicketService();
    const insertedTicket = (await service.addTicket(
      env,
      ticketToCreate
    ));
    return insertedTicket;;
  }
}
