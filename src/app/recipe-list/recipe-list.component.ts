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
}
