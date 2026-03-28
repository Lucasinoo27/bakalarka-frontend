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

  // 1. ZLÝ PATTERN - Volanie zložitej funkcie priamo z HTML template-u
  // Spustí sa pri KAZDOM change detection ticku pre kazdý jeden recept
  formatTimeDisplay(cas: string): string {
    // Umelá záťaž len na demonštráciu zlého TBT (Total Blocking Time)
    let temp = 0;
    for(let i = 0; i < 50000; i++) {
      temp += Math.random();
    }
    
    // Použijeme aspoň globálny moment, ktorý sme stiahli v index.html, aby to vyzeralo ako reálny zly pattern
    if ((window as any).moment && cas) {
      // Junior sa tu snaží parsovať čas, hoci je to obyčajný string ako "30 min"
      return cas + ' (cca)'; 
    }
    return cas;
  }

  // 2. ZLÝ PATTERN - Blokovanie Main Thread pri inicializácii komponentu
  private heavySynchronousTask() {
    console.log('Spúšťam ťažkú synchrónnu úlohu (Baseline anti-pattern)...');
    const start = Date.now();
    let result = 0;
    // Blokujeme vlákno aspoň na ~200-500ms (v závislosti od CPU)
    // Týmto extrémne zhoršíme First Contentful Paint (FCP) a Total Blocking Time (TBT)
    for (let i = 0; i < 20000000; i++) {
      result += Math.sqrt(i) * Math.sin(i);
    }
    console.log(`Úloha dokončená za ${Date.now() - start}ms s výsledkom ${result}`);
  }
}
