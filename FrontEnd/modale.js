import { getWorks } from "./script.js"
// import { majGalerieIndex } from "./index.js"

let works = await getWorks()
const token = window.localStorage.getItem("token")

// Ouverture de la modale
export function openModale() {
    const btnModifier = document.getElementById("btn-modifier")
    const modale = document.querySelector(".modale")
    btnModifier.addEventListener("click", () => {
        modale.classList.remove("cache")
        galerieModale()
    })
}

// Fermeture de la modale
export function closeModale() {
    const modale = document.querySelector(".modale")
    const modaleBg = document.querySelector(".background-modale")
    const btnEchap = document.getElementById("btn-echap")
    modaleBg.addEventListener("click", () => {
        modale.classList.add("cache")
    })
    btnEchap.addEventListener("click", () => {
        modale.classList.add("cache")
    })
}

// Changements de page de la modale
export function switchModaleGalerie() {
    const btnRetour = document.getElementById("btn-retour")
    btnRetour.addEventListener("click", () => {
        retourGalerie()
        galerieModale()
        // resetForm()
    })
}
export function switchModaleFormulaire() {
    const btnAjoutPhoto = document.getElementById("btn-ajout-photo")
    
    // Page Formulaire
    btnAjoutPhoto.addEventListener("click", () => {
        formulaireModale ()
    })
}

// Galerie de la modale
// Apparition de la galerie dans la modale
function galerieModale () {
    let galerie = document.querySelector(".galerie-photo-modale")
    galerie.innerHTML=""
    for (let i = 0; i < works.length; i++) {
        // Création de mon DOM
        let item = document.createElement("div")
        item.classList.add("item")
        galerie.appendChild(item)
        let itemPhoto = document.createElement("img")
        let itemBtn = document.createElement("button")
        itemBtn.classList.add("btn-supprimer")
        let itemBtnImg = document.createElement("img")
        itemBtnImg.src = "/assets/icons/supprimer.png"
        item.appendChild(itemPhoto)
        item.appendChild(itemBtn)
        itemBtn.appendChild(itemBtnImg)
    
        // Récupération de mes données 
        itemPhoto.src = works[i].imageUrl
        itemPhoto.alt = works[i].title

        // Suppression d'un projet
        itemBtn.addEventListener("click", async () => {
            if (window.confirm("Souhaitez-vous vraiment supprimer le projet ?")) {
                let reponse = await fetch(`http://localhost:5678/api/works/${works[i].id}`, {
                    method: 'DELETE',
                    headers: { "Authorization": `Bearer ${token}`,},
                })
                if (reponse.ok) {
                    reponse = await fetch("http://localhost:5678/api/works")
                    works = await reponse.json()
                    galerieModale()
                    majGalerieIndex()
                }
            }
        })
    }
}
function retourGalerie () {
    let galerie = document.getElementById("modale-galerie")
    galerie.classList.remove("cache")
    const formModale = document.getElementById("modale-form")
    formModale.classList.add("cache")
    const btnRetour = document.getElementById("btn-retour")
    btnRetour.classList.add("cache")
}

// Formulaire de la modale
// Apparition du formulaire dans la modale
function formulaireModale () {
    let galerie = document.getElementById("modale-galerie")
    galerie.classList.add("cache")
    const formModale = document.getElementById("modale-form")
    formModale.classList.remove("cache")
    const btnRetour = document.getElementById("btn-retour")
    btnRetour.classList.remove("cache")
}

// Complétion formulaire
export function completeForm() {
        //Charger une photo dans l'input
        photoInput()
    
        // Changement d'apparence du bouton de validation
        btnValidationOk()
    
        //Ajout d'un projet à la galerie 
        try { 
            const formModale = document.querySelector(".form-modale")
            formModale.addEventListener("submit", (Event) => {
                Event.preventDefault()
    
                // Récupération des infos du formulaire
                const titre = document.getElementById("titre").value
                const categorie = document.getElementById("categorie").value
                let photo = document.getElementById("ajout-photo").value
                    
                // Règles de validation du formulaire
                if (titre !== "" && categorie !== "" && photo !== "") {
                    ajoutPhotoGalerie()
                    SupErreurPhotoForm()
                } else {
                    if (photo === "") { erreurPhotoForm() }
                    if (titre === "") { erreurTitreForm() }
                    if (categorie === "") { erreurCategorieForm() }
                }
            })
        } catch (error) {
                console.log("Erreur : " + error)
        }
}

// Charger une photo dans l'input
function photoInput() {
    let photoAjoutee = document.querySelector(".photo-ajoutee")
    let inputPhoto = document.getElementById("ajout-photo")
    inputPhoto.onchange = function() {
        photoAjoutee.innerHTML =""
        let photoProjetAjoutee = document.createElement("img")
        photoAjoutee.appendChild(photoProjetAjoutee)
        photoProjetAjoutee.classList.add("photo-projet-ajoutee") 
        photoProjetAjoutee.src = URL.createObjectURL(inputPhoto.files[0])    
    } 
}
  
// Ajout de projets à la galerie via le formulaire
async function ajoutPhotoGalerie() {      
    let titre = document.getElementById("titre").value
    let categorie = document.getElementById("categorie").value
    let photo = document.getElementById("ajout-photo").files[0]     
    
    // Requête post
    const formData = new FormData()
    formData.append("title", titre)
    formData.append("category", categorie)
    formData.append("image", photo)
    const token = window.localStorage.getItem("token")              
    const reponse = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: { 
            "Authorization": `Bearer ${token}`,
        },
        body: formData
    })
    if (reponse.ok) {
        // Message de validation
        validationMessageForm()

        // Remise à zéro du formulaire
       	resetForm()		
        suppressionMessageValidation()
        btnValidationInactif()
    } 

    // Actualisation de la galerie
    works = await getWorks()
    majGalerieIndex()
}

// Bouton du formulaire
// Fonction pour vérifier si tous les champs sont remplis
function formValide() {
    // Récupération du DOM
    const form = document.querySelector(".form-modale")
    const formInputs = form.querySelectorAll('input, select')
    let btnForm = document.getElementById("btn-validation-form")
    let inputRemplis = true;

    // Si un des champs est vide
    formInputs.forEach(input => {
        if (!input.value.trim()) {
        inputRemplis = false
        }
    })
  
    // Changer l'apparence du bouton selon l'état du formulaire
    if (inputRemplis) {
        btnForm.classList.remove("btn-modale-inactif")
        btnForm.classList.add("btn-modale")
    }
}

// Changement d'apparence du bouton du formulaire
// Bouton Actif
function btnValidationOk() {
    const form = document.querySelector(".form-modale")
    const formInputs = form.querySelectorAll("input, select")

    // Écouter les changements sur tous les champs
    formInputs.forEach(input => {
        input.addEventListener("input", formValide)
        input.addEventListener("input", SupErreurPhotoForm)
        input.addEventListener("input", SupErreurTitreForm)
        input.addEventListener("input", SupErreurCategorieForm)
    })
}

// Bouton inactif
function btnValidationInactif() {
    let btnForm = document.getElementById("btn-validation-form")
    btnForm.classList.remove("btn-modale")
    btnForm.classList.add("btn-modale-inactif")
}

// Messages d'erreurs formulaire
// Afichage des messages d'erreur
function erreurPhotoForm () {
    let messageErreur = document.getElementById("message-erreur-photo")
    messageErreur.classList.remove("cache")
}
function erreurTitreForm () {
    let messageErreur = document.getElementById("message-erreur-titre")
    messageErreur.classList.remove("cache")
}
function erreurCategorieForm() {
    let messageErreur = document.getElementById("message-erreur-categorie")
    messageErreur.classList.remove("cache")
}

// Suppression des messages d'erreur
function SupErreurTitreForm () {
    let messageErreur = document.getElementById("message-erreur-titre")
    messageErreur.classList.add("cache")
}
function SupErreurPhotoForm () {
    let messageErreur = document.getElementById("message-erreur-photo")
    messageErreur.classList.add("cache")
}
function SupErreurCategorieForm() {
    let messageErreur = document.getElementById("message-erreur-categorie")
    messageErreur.classList.add("cache")
}

// Message de validation du formulaire
function validationMessageForm() {
    let messageValidation = document.querySelector(".message-succes")
    messageValidation.classList.remove("cache")
}
function suppressionMessageValidation() {
    let form = document.querySelector(".form-modale")
    form.addEventListener("input", () => {
        let messageValidation = document.querySelector(".message-succes")
        messageValidation.classList.add("cache")
    })
}

// Remise à zéro du formulaire
function resetForm() {
    let form = document.querySelector(".form-modale")
    form.reset()
    let photoAjoutee = document.querySelector(".photo-ajoutee")
    photoAjoutee.innerHTML = ""
    let iconeImage = document.createElement("img")
    photoAjoutee.appendChild(iconeImage)
    iconeImage.src = "./assets/icons/image.png"
}

// Mise à jour de la galerie de la page d'accueil
function majGalerieIndex() {
    let galerieInd = document.querySelector(".gallery")
    galerieInd.innerHTML = ""
    for (let i = 0; i < works.length; i++) {
        // Création de mon DOM
        let projet = document.createElement("figure")
        galerieInd.appendChild(projet)
        let photoProjet = document.createElement("img")
        let legendeProjet = document.createElement("figcaption")
        projet.appendChild(photoProjet)
        projet.appendChild(legendeProjet)
        
        // Récupération de mes données 
        photoProjet.src = works[i].imageUrl
        legendeProjet.innerHTML = works[i].title
    }
}








    