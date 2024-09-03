import { Component } from '@angular/core';
import { NavigationComponent } from './navigation/navigation.component'; // Adjust path as needed
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, NavigationComponent] // Ensure this is correct
})
export class AppComponent { }
