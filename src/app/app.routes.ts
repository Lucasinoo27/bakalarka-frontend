import { Routes } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

// ŽIADNY lazy loading - importujeme komponenty priamo
export const routes: Routes = [
  { path: '', component: RecipeListComponent },
  { path: 'recept/:id', component: RecipeDetailComponent }
];
