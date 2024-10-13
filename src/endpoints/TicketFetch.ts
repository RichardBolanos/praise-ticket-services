import { Bool, OpenAPIRoute, Str } from "chanfana";
import { z } from "zod";
import { Ticket } from "../types";

export class TicketFetch extends OpenAPIRoute {
	schema = {
		tags: ["Tickets"],
		summary: "Get a single Ticket by slug",
		request: {
			params: z.object({
				TicketId: Str({ description: "Ticket id" }),
			}),
		},
		responses: {
			"200": {
				description: "Returns a single Ticket if found",
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
			"404": {
				description: "Ticket not found",
				content: {
					"application/json": {
						schema: z.object({
							series: z.object({
								success: Bool(),
								error: Str(),
							}),
						}),
					},
				},
			},
		},
	};

	async handle(c) {
		// Get validated data
		const data = await this.getValidatedData<typeof this.schema>();

		// Retrieve the validated slug
		const { TicketId } = data.params;

		// Implement your own object fetch here

		const exists = true;

		// @ts-ignore: check if the object exists
		if (exists === false) {
			return Response.json(
				{
					success: false,
					error: "Object not found",
				},
				{
					status: 404,
				},
			);
		}

		return {
			success: true,
			Ticket: {
				name: "my Ticket",
				slug: data,
				description: "this needs to be done",
				completed: false,
				due_date: new Date().toISOString().slice(0, 10),
			},
		};
	}
}
