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
    return this.http.get<any[]>('https://recepty-backend-api.onrender.com/api/recepty');
  }

  // Aj tu schválne stiahneme VŠETKY dáta, hoci hľadáme len jeden recept!
  // Backend navyše momentálne neobsahuje /api/recepty/:id, takže toto bude fungovať.
  // Toto je jedna z najväčších "začiatočníckych" chýb (anti-pattern).
  getRecipeById(id: string): Observable<any> {
    return new Observable((observer) => {
      this.http.get<any[]>('https://recepty-backend-api.onrender.com/api/recepty').subscribe({
        next: (data) => {
          // Nájdeme recept priamo na klientovi
          const found = data.find(r => r._id === id);
          observer.next(found);
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }
}
