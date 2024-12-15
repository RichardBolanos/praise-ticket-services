import { DateTime, Str } from "chanfana";
import { z } from "zod";

export const Ticket = z.object({
	name: Str({ example: "lorem" }),
	congregation: Str(),
	phone: Str({ required: false }),
	paid: z.boolean().default(false),
	createdAt: DateTime().optional(),
	id: z.number().optional(),
});

export interface Ticket {
	name: string,
	congregation: string,
	phone: string,
	paid: boolean,
	createdAt?: string,
	id?: number,
}
export interface Result {
	result:{
		data: Ticket | Ticket[],
		message: string
	},
	success: boolean;
}
