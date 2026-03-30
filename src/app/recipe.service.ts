import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  // Úmyselne vráti všetky recepty - "Baseline"
  constructor(private http: HttpClient) { }

  getRecipes(): Observable<any[]> {
    return this.http.get<any[]>('https://bakalarka-backend-8dw8.onrender.com/api/recepty');
  }

  // OPTIMALIZÁCIA FÁZA 4: Sťahujeme iba konkrétny recept z optimalizovaného API.
  // Výrazne to šetrí šírku pásma a CPU výkon klientského zariadenia.
  getRecipeById(id: string): Observable<any> {
    return this.http.get<any>(`https://bakalarka-backend-8dw8.onrender.com/api/recepty/${id}`);
  }
}
