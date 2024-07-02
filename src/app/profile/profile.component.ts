import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { RegisterRequest } from '../model/register-request';
import { UserProfile } from '../model/user-profile';
import { Utilisateur } from '../model/utilisateur';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  utilisateur: Utilisateur | undefined;
  errorMessage: string = '';
  editMode: boolean = false; // Initialiser le mode d'édition à false

  constructor(private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Récupérer l'email à partir des paramètres de l'URL
    const email = this.route.snapshot.paramMap.get('email');
    console.log('Email from route parameters:', email);
  
    // Appel au service pour récupérer le profil de l'utilisateur
    if (email) {
      this.getUserProfile(email);
    } else {
      this.errorMessage = 'Email not found in route parameters.';
    }
  }
  

  getUserProfile(email: string) {
    this.authService.getUserProfile(email).subscribe(
      (response: Utilisateur) => {
        this.utilisateur = response;
        console.log('User profile: ', this.utilisateur);
      },
      error => {
        console.error('Error fetching user profile: ', error);
        this.errorMessage = 'Error fetching user profile.';
      }
    );
  }


  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  saveProfileChanges() {
   
  }
 
  onSubmit() {
    this.editMode = !this.editMode;

    if (this.utilisateur) {
      this.authService.updateProfile(this.utilisateur.email, this.utilisateur)
        .subscribe(
          updatedUser => {
            console.log('Profil utilisateur mis à jour avec succès :', updatedUser);
            // Traitez la réponse ici si nécessaire
          },
          error => {
            console.error('Erreur lors de la mise à jour du profil :', error);
            // Gérez l'erreur ici
          }
        );
    } else {
      console.error('Utilisateur non défini lors de la soumission du formulaire.');
      // Handle this case appropriately, perhaps show an error message to the user
    }
  }
  
}
