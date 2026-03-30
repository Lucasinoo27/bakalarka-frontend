import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  receptId: string | null = null;
  recept: any = null;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    // 1. Získa sa ID z URL parametra (synchronný odber, bez switchMap a bez RxJS obsluhy)
    this.receptId = this.route.snapshot.paramMap.get('id');

    if (this.receptId) {
      // 2. Ťahanie detailu receptu z backendu
      this.recipeService.getRecipeById(this.receptId).subscribe({
        next: (data) => {
          this.recept = data;
          console.log('Stiahnutý detail receptu:', this.recept);
        },
        error: (err) => console.error('Chyba pri sťahovaní detailu:', err)
      });
    }
  }

  // OPTIMALIZÁCIA FÁZA 4: Vloženie transformačných parametrov pre Cloudinary (f_auto, q_auto, w_X)
  getOptimizedImageUrl(url: string, width: number): string {
    if (!url || !url.includes('cloudinary.com')) return url;
    
    const uploadIndex = url.indexOf('/upload/');
    if (uploadIndex === -1) return url;
    
    const prefix = url.substring(0, uploadIndex + 8); // vrátane '/upload/'
    const suffix = url.substring(uploadIndex + 8);
    
    return `${prefix}f_auto,q_auto,c_fill,w_${width}/${suffix}`;
  }
}
