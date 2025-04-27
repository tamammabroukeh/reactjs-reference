import type { Ticket, Message, TicketStatus } from "@/types";

const API_BASE_URL = "https://openapi.pythonanywhere.com/api";

// Fetch all tickets
export async function fetchAllTickets(): Promise<Ticket[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/tickets`);

    if (!response.ok) {
      throw new Error(`Failed to fetch tickets: ${response.status}`);
    }

    const data = await response.json();
    return data.tickets;
  } catch (error) {
    console.error("Error fetching tickets:", error);
    throw error;
  }
}

// Fetch ticket messages
export async function fetchTicketMessages(
  ticketId: string
): Promise<Message[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/tickets/${ticketId}/messages`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch messages: ${response.status}`);
    }

    const data = await response.json();
    return data.messages;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
}

// Send a reply to a ticket
export async function sendTicketReply(
  ticketId: string,
  content: string
): Promise<Message> {
  try {
    const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}/reply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error(`Failed to send reply: ${response.status}`);
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error("Error sending reply:", error);
    throw error;
  }
}

// Update ticket status
export async function updateTicketStatus(
  ticketId: string,
  status: TicketStatus
): Promise<Ticket> {
  try {
    const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update status: ${response.status}`);
    }

    const data = await response.json();
    return data.ticket;
  } catch (error) {
    console.error("Error updating status:", error);
    throw error;
  }
}
