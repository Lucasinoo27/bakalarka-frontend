import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Tento komponent slúži už len ako root layout (prázdna obálka pre routing)
  
  ngOnInit() {
    // Junior Anti-pattern (Best Practices violation):
    // Pýtame sa na polohu (Geolocation) používateľa ihneď pri prvom načítaní aplikácie, bez jeho vyžiadania
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Poloha získaná (Junior dev chcel zbierať dáta pre analytiku): ', position);
        },
        (error) => {
          console.log('Používateľ zamietol polohu alebo nastala chyba: ', error);
        }
      );
    }
  }
}
