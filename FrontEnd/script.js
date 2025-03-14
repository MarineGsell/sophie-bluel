import { loginAdmin, logoutAdmin } from "./admin.js"
import { galerieIndex, filtreObjets, filtreAppartements, filtreHotelsResto, filtreTous } from "./index.js"
import { openModale, closeModale, switchModaleGalerie, switchModaleFormulaire, completeForm } from "./modale.js"

// Récupération des travaux depuis le fichier JSON
export async function getWorks() {
    const reponse = await fetch("http://localhost:5678/api/works")
    let works = await reponse.json()
    return works
}
let works = await getWorks()

//Récupération du token
const token = window.localStorage.getItem("token")

// Récupération de la galerie les travaux de l’architecte
galerieIndex()

// Réalisation du filtre objet
filtreObjets()

// Réalisation du filtre appartements
filtreAppartements()

// Réalisation du filtre hotels & restaurants
filtreHotelsResto()

// Réalisation du filtre tous
filtreTous()

// Changement de la page d'accueil en page admin
loginAdmin()

// Déconnexion page admin
logoutAdmin()

//Ouverture de la modale
openModale()

//Changements de page de la modale
switchModaleFormulaire()
switchModaleGalerie()

// Complétion du formulaire
completeForm()

//Fermeture de la modale
closeModale()

    































