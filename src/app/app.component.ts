import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  recepty: any[] =[];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Ťaháme dáta z nášho Node.js backendu
    this.http.get<any[]>('http://localhost:3000/api/recepty').subscribe({
      next: (data) => {
        this.recepty = data;
        console.log('Stiahnuté recepty:', this.recepty);
      },
      error: (err) => console.error('Chyba pri sťahovaní:', err)
    });
  }
}