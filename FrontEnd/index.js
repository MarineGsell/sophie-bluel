import { getWorks } from "./script.js"

const works = await getWorks()

// Création de la galerie de la page d'accueil
export function galerieIndex() {
    for (let i = 0; i < works.length; i++) {
        // Création de mon DOM
        let projets = document.querySelector(".gallery")
        let projet = document.createElement("figure")
        projets.appendChild(projet)
        let photoProjet = document.createElement("img")
        let legendeProjet = document.createElement("figcaption")
        projet.appendChild(photoProjet)
        projet.appendChild(legendeProjet)
    
        // Récupération de mes données 
        photoProjet.src = works[i].imageUrl
        photoProjet.alt = works[i].title
        legendeProjet.innerHTML = works[i].title
    }
}

// Création des filtres de la galerie
export function filtreObjets() {
    const btnObjets = document.getElementById("objets")
    btnObjets.addEventListener("click", () => {
        let projets = document.querySelector(".gallery")
        let worksObjets = works.filter(function(works) {
            return works.category.name === "Objets"
        })
        // Vider le HTML pour éviter les doublons
        projets.innerHTML = ""
        for (let i = 0; i < worksObjets.length; i++) {
            // Création de mon DOM
            let projets = document.querySelector(".gallery")
            let projet = document.createElement("figure")
            projets.appendChild(projet)
            let photoProjet = document.createElement("img")
            let legendeProjet = document.createElement("figcaption")
            projet.appendChild(photoProjet)
            projet.appendChild(legendeProjet)
        
            // Récupération de mes données 
            photoProjet.src = worksObjets[i].imageUrl
            legendeProjet.innerHTML = worksObjets[i].title
        }
    })
}
export function filtreAppartements() {
    const btnAppartements = document.getElementById("appartements")
    btnAppartements.addEventListener("click", () => {
        let projets = document.querySelector(".gallery")
        let worksAppartements = works.filter(function(works) {
            return works.category.name === "Appartements"
        })
        // Vider le HTML pour éviter les doublons
        projets.innerHTML = ""
    
        for (let i = 0; i < worksAppartements.length; i++) {
            // Création de mon DOM
            let projets = document.querySelector(".gallery")
            let projet = document.createElement("figure")
            projets.appendChild(projet)
            let photoProjet = document.createElement("img")
            let legendeProjet = document.createElement("figcaption")
            projet.appendChild(photoProjet)
            projet.appendChild(legendeProjet)
        
            // Récupération de mes données 
            photoProjet.src = worksAppartements[i].imageUrl
            legendeProjet.innerHTML = worksAppartements[i].title
        }
    })    
}
export function filtreHotelsResto() {
    const btnHotelsResto = document.getElementById("hotel-resto")
    btnHotelsResto.addEventListener("click", () => {
        let projets = document.querySelector(".gallery")
        let worksHotelsResto = works.filter(function(works) {
            return works.category.name === "Hotels & restaurants"
        })
        // Vider le HTML pour éviter les doublons
        projets.innerHTML = ""
    
        for (let i = 0; i < worksHotelsResto.length; i++) {
            // Création de mon DOM
            let projets = document.querySelector(".gallery")
            let projet = document.createElement("figure")
            projets.appendChild(projet)
            let photoProjet = document.createElement("img")
            let legendeProjet = document.createElement("figcaption")
            projet.appendChild(photoProjet)
            projet.appendChild(legendeProjet)
        
            // Récupération de mes données 
            photoProjet.src = worksHotelsResto[i].imageUrl
            legendeProjet.innerHTML = worksHotelsResto[i].title
        }
    })    
}
export function filtreTous() {
    const btnTous = document.getElementById("tous")
    btnTous.addEventListener("click", () => {
        // Vider le HTML pour éviter les doublons
        let projets = document.querySelector(".gallery")
        projets.innerHTML = ""

        for (let i = 0; i < works.length; i++) {
            // Création de mon DOM
            let projet = document.createElement("figure")
            projets.appendChild(projet)
            let photoProjet = document.createElement("img")
            let legendeProjet = document.createElement("figcaption")
            projet.appendChild(photoProjet)
            projet.appendChild(legendeProjet)
        
            // Récupération de mes données 
            photoProjet.src = works[i].imageUrl
            legendeProjet.innerHTML = works[i].title  
        }
    })
}



