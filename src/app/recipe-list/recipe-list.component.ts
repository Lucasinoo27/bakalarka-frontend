import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Pre [(ngModel)]
import { RouterModule } from '@angular/router'; // Pre routerLink
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recepty: any[] = [];
  searchTerm: string = '';

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    // Ťažké spracovanie blokujúce Main Thread (simulácia anti-patternu / legacy appky)
    this.heavySynchronousTask();
    
    // Stiahneme všetky dáta naraz
    this.recipeService.getRecipes().subscribe({
      next: (data) => {
        this.recepty = data;
        console.log('Stiahnuté recepty:', this.recepty);
      },
      error: (err) => console.error('Chyba pri sťahovaní:', err)
    });
  }

  // Neoptimalizované filtrovanie volané pri každom renderi a stlačení klávesy
  get filteredRecepty() {
    if (!this.searchTerm) {
      return this.recepty;
    }
    return this.recepty.filter(r => 
      r.nazov.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // OPTIMALIZÁCIA FÁZA 4: Odstránený blokujúci kód (loop) a nepoužívanie externého window.moment
  formatTimeDisplay(cas: string): string {
    return cas ? cas + ' (cca)' : 'Neznámy čas';
  }

  // OPTIMALIZÁCIA FÁZA 4: Odstránená "ťažká synchrónna úloha"
  private heavySynchronousTask() {
    // V optimalizovanej verzii sme tento nezmyselný kód odstránili,
    // čím drasticky znížime Total Blocking Time (TBT).
  }
}
