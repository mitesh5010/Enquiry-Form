import { Question } from "../questions/question/question.model";

export interface Form {
  id?: number,
  description: string,
  formTitle: string,
  title: string,
  questions: Question
}