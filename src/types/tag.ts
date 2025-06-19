export interface Tag {
  id: string;
  name: string;
}

export interface Color {
  hex: string;
  name: string;
}

export interface SelectedTag extends Tag {
  color: string;
}

export interface CreateTagRequest {
  name: string;
}
