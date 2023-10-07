export interface ApiResponse {
  status: string;
  message: string;
}

export interface templateModel{
  id: string,
  title: string,
  description: string,
  category: string,
  prompt: string,
  locale: string,
}

export interface templateListModal {
  id: string,
  title: string,
  description: string,
  created: string,
  status: string,
}

export interface templateCreate {
  title: string,
  description: string,
  category: string,
  prompt: string,
  locale: string,
}

