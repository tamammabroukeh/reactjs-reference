import axios from "axios";
import { Tag, Color, CreateTagRequest } from "@/types/tag";

// Mock API endpoints - replace with your actual API URLs
const API_BASE_URL = "https://api.example.com";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Mock data for development
const mockTags: Tag[] = [
  { id: "1", name: "React" },
  { id: "2", name: "TypeScript" },
  { id: "3", name: "JavaScript" },
  { id: "4", name: "CSS" },
  { id: "5", name: "HTML" },
  { id: "6", name: "Node.js" },
  { id: "7", name: "Express" },
  { id: "8", name: "MongoDB" },
  { id: "9", name: "PostgreSQL" },
  { id: "10", name: "Docker" },
  { id: "11", name: "Kubernetes" },
  { id: "12", name: "AWS" },
  { id: "13", name: "Git" },
  { id: "14", name: "Figma" },
  { id: "15", name: "Tailwind CSS" },
];

const mockColors: Color[] = [
  { hex: "#EF4444", name: "Red" },
  { hex: "#F97316", name: "Orange" },
  { hex: "#EAB308", name: "Yellow" },
  { hex: "#22C55E", name: "Green" },
  { hex: "#06B6D4", name: "Cyan" },
  { hex: "#3B82F6", name: "Blue" },
  { hex: "#8B5CF6", name: "Purple" },
  { hex: "#EC4899", name: "Pink" },
  { hex: "#6B7280", name: "Gray" },
  { hex: "#1F2937", name: "Dark" },
  { hex: "#F59E0B", name: "Amber" },
  { hex: "#10B981", name: "Emerald" },
  { hex: "#8B5A2B", name: "Brown" },
  { hex: "#DC2626", name: "Rose" },
  { hex: "#7C3AED", name: "Violet" },
  { hex: "#059669", name: "Teal" },
];

export const fetchTags = async (): Promise<Tag[]> => {
  try {
    // Replace with actual API call
    // const response = await api.get('/tags');
    // return response.data;

    // Using mock data for now
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockTags), 500);
    });
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw error;
  }
};

export const fetchColors = async (): Promise<Color[]> => {
  try {
    // Replace with actual API call
    // const response = await api.get('/colors');
    // return response.data;

    // Using mock data for now
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockColors), 300);
    });
  } catch (error) {
    console.error("Error fetching colors:", error);
    throw error;
  }
};

export const createTag = async (tagData: CreateTagRequest): Promise<Tag> => {
  try {
    // Replace with actual API call
    // const response = await api.post('/tags', tagData);
    // return response.data;

    // Using mock implementation for now
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTag: Tag = {
          id: Date.now().toString(),
          name: tagData.name,
        };
        mockTags.push(newTag);
        resolve(newTag);
      }, 800);
    });
  } catch (error) {
    console.error("Error creating tag:", error);
    throw error;
  }
};
