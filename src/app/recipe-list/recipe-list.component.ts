import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Pre [(ngModel)]
import { RouterModule } from '@angular/router'; // Pre routerLink
import { Title, Meta } from '@angular/platform-browser';
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

  constructor(
    private recipeService: RecipeService,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit() {
    // Nastavenie základných SEO meta tagov a titulku pri návrate na zoznam
    this.titleService.setTitle('Zoznam receptov | Recepty App');
    this.metaService.updateTag({ name: 'description', content: 'Prehľadajte našu databázu najlepších receptov na každý deň.' });
    this.metaService.updateTag({ property: 'og:title', content: 'Zoznam receptov | Recepty App' });
    this.metaService.updateTag({ property: 'og:description', content: 'Prehľadajte našu databázu najlepších receptov na každý deň.' });
    this.metaService.removeTag('property="og:image"');

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

  // OPTIMALIZÁCIA FÁZA 4: Vloženie transformačných parametrov pre Cloudinary (f_auto, q_auto, w_X)
  // Takto zabezpečíme radikálne zmenšenie veľkosti obrázka a prevod do WebP/AVIF
  getOptimizedImageUrl(url: string, width: number): string {
    if (!url || !url.includes('cloudinary.com')) return url;
    
    // Cloudinary URL štandardne obsahuje '/upload/', za ktorý pridáme naše parametre
    // Príklad transformácie: /upload/f_auto,q_auto,w_500/v12345...
    const uploadIndex = url.indexOf('/upload/');
    if (uploadIndex === -1) return url;
    
    const prefix = url.substring(0, uploadIndex + 8); // vrátane '/upload/'
    const suffix = url.substring(uploadIndex + 8);
    
    return `${prefix}f_auto,q_auto,c_fill,w_${width}/${suffix}`;
  }

  // OPTIMALIZÁCIA FÁZA 4: Odstránená "ťažká synchrónna úloha"
  private heavySynchronousTask() {
    // V optimalizovanej verzii sme tento nezmyselný kód odstránili,
    // čím drasticky znížime Total Blocking Time (TBT).
  }
}
