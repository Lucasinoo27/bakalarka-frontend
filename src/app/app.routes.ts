import { Routes } from '@angular/router';

// OPTIMALIZÁCIA FÁZA 4: Použijeme LoadComponent na asynchrónne načítanie 
// Tento postup stiahne Detail a List bundly len vtedy, keď sa na ne prejde
export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./recipe-list/recipe-list.component').then(c => c.RecipeListComponent) 
  },
  { 
    path: 'recept/:id', 
    loadComponent: () => import('./recipe-detail/recipe-detail.component').then(c => c.RecipeDetailComponent) 
  }
];
