export interface Question {
  id: number;
  text: string;
  type: 'short-answer' | 'paragraph'|'multiChoice' | 'checkbox' | 'date' |'time';
  options?: string[];
  required?: boolean;
  answer?: string | string[]; 
}

export interface FormData {
  formTitle: string;
  title: string;
  description: string;
  questions: Question[]
}