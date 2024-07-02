import { ERole } from "./erole";

export interface RegisterRequest {
    username: string;
  email: string;
  password: string;
  nom: string;
  prenom: string;
  adresse: string;
  date_naissance: Date;
  rolee: string;

  numero: number;

  
}
