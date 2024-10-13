import { createClient } from "@supabase/supabase-js";
import { Result, Ticket } from "types";

export interface Env {
  SUPABASE_URL: string;
  SUPABASE_KEY: string;
}

export class TicketService {
  // Método para obtener tickets, retorna un Promise<Result>
  async fetchTickets(env: Env): Promise<Result> {
    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);
    const { data, error } = await supabase.from("tickets").select();

    if (error) {
      return {
        result: {
          data: [],
          message: `Error fetching tickets: ${error.message}`,
        },
        success: false,
      };
    }

    return {
      result: {
        data: data.map((ticket) =>
          this.convertObjectKeysToCamelCase(ticket)
        ) as Ticket[],
        message: "Tickets fetched successfully",
      },
      success: true,
    };
  }

  // Método para añadir tickets, retorna un Promise<Result>
  async addTicket(env: Env, ticket: Ticket): Promise<Result> {
    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);
    const { data, error } = await supabase
      .from("tickets")
      .insert(this.toSnakeCase(ticket))
      .select();

    if (error) {
      return {
        result: { data: [], message: `Error adding ticket: ${error.message}` },
        success: false,
      };
    }

    return {
      result: {
        data: this.convertObjectKeysToCamelCase(data[0]) as Ticket,
        message: "Ticket added successfully",
      },
      success: true,
    };
  }

  // Método para eliminar tickets, retorna un Promise<Result>
  async deleteTicket(env: Env, ticketId: number | string): Promise<Result> {
    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);

    const { data, error } = await supabase
      .from("tickets")
      .delete()
      .eq("id", ticketId)
      .select();

    if (data.length == 0) {
      return {
        result: {
          data: [],
          message: `Error deleting ticket with ID ${ticketId}: element not found`,
        },
        success: false,
      };
    }

    return {
      result: {
        data: this.convertObjectKeysToCamelCase(data[0]),
        message: `Ticket with ID ${ticketId} deleted successfully`,
      },
      success: true,
    };
  }

  // Funciones de utilidad para convertir los keys entre snake_case y camelCase
  toSnakeCase(obj: any): any {
    if (typeof obj !== "object" || obj === null) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.toSnakeCase(item));
    }

    return Object.keys(obj).reduce((acc: any, key) => {
      const snakeKey = key.replace(
        /[A-Z]/g,
        (letter) => `_${letter.toLowerCase()}`
      );
      acc[snakeKey] = this.toSnakeCase(obj[key]);
      return acc;
    }, {});
  }

  toCamelCase(snakeCaseStr: string): string {
    return snakeCaseStr
      .toLowerCase()
      .split("_")
      .map((word, index) =>
        index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join("");
  }

  convertObjectKeysToCamelCase(obj: any): any {
    if (typeof obj !== "object" || obj === null) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.convertObjectKeysToCamelCase(item));
    }

    return Object.keys(obj).reduce((acc: any, key) => {
      const camelCaseKey = this.toCamelCase(key);
      acc[camelCaseKey] = obj[key];
      return acc;
    }, {});
  }
}
