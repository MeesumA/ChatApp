import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // Import RouterLink if needed

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [RouterLink] // Include RouterLink if needed
})
export class LoginComponent { }
