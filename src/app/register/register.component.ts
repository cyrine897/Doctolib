import { Component } from '@angular/core';
import { RegisterRequest } from '../model/register-request';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { ERole } from '../model/erole';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  registerRequest: RegisterRequest = {
    username: '',
    email: '',
    password: '',
    nom: '',
    prenom: '',
    adresse: '',
    date_naissance: new Date(), // Initialisez avec une date par défaut
    numero: 0,
    rolee: ''
  };
  roles: string[] = Object.values(ERole);

  message: string = '';
  confirmPassword = '';


  constructor(private authService: AuthService, private router: Router , private http : HttpClient) {

  }

  register() {
    console.log('Données d\'enregistrement :', this.registerRequest); // Afficher les données d'enregistrement dans la console

 
    this.authService.register(this.registerRequest).subscribe(
      response => {
        console.log(response); // Affichez la réponse du backend si nécessaire
        this.message = 'Utilisateur enregistré avec succès!';
        this.router.navigate(['login']); // Redirection vers la page de connexion après un enregistrement réussi
        console.log(this.registerRequest);

      },
      error => {
        console.error('Erreur lors de l\'enregistrement :', error);
        if (error.error && error.error.message) {
          console.error('Message d\'erreur détaillé :', error.error.message);
        }
        this.message = 'Erreur lors de l\'enregistrement';
      }
      
      
    );
  }

 
  
  

  passwordsMatch(): boolean {
    return this.registerRequest.password === this.confirmPassword;
  }
}
