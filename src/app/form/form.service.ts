import { Injectable, signal } from '@angular/core';
import { Question } from '../questions/question/question.model';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  title = signal<string>('Untitle form');
  description = signal<string>('');
  questions = signal<Question[]>([]);
}
