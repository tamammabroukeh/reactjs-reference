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




import axios from 'axios';
import { User } from '@/types/community-types';

// Mock API base URL - replace with your actual API
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Mock function to search users - replace with your actual API endpoint
export const searchUsers = async (query: string): Promise<User[]> => {
  try {
    // This is a mock implementation using JSONPlaceholder
    // Replace this with your actual user search API
    const response = await api.get('/users');
    const users = response.data;
    
    // Convert the mock data to our User interface and filter by query
    const mockUsers: User[] = users.map((user: any) => ({
      id: user.id.toString(),
      username: user.username.toLowerCase(),
      name: user.name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`,
    }));

    // Filter users based on the search query
    return mockUsers.filter(user => 
      user.username.toLowerCase().includes(query.toLowerCase()) ||
      user.name.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching users:', error);
    return [];
  }
};

// Mock function to get posts - you can replace this with your actual API
export const getPosts = async () => {
  // This would be replaced with your actual posts API
  return [];
};