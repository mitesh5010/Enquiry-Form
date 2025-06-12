export interface QuestionAnswer {
  qId: string;
  answer?: string;
  selectedOpt?: string|string[];
}

export interface FormResponse {
  rId:number;
  questionAnswer: QuestionAnswer[]
}

export interface ApiResponse {
  formId: number;
  response: FormResponse[];
}