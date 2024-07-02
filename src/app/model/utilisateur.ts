import { ERole } from "./erole";

export interface Utilisateur {
    idUser: number;
    nom: string;
    username: string;
    prenom: string;
    adresse: string;
    email: string;
    password: string;
    date_naissance: Date, // Initialisation selon vos besoins
    numero: number;
    roles: ERole[]; //
}
