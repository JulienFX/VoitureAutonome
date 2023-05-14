const voitureCanvas=document.getElementById("voitureCanvas")
voitureCanvas.width=200 // en général on fait modification dans js quand l'objet va être en intéraction avec l'utilisateur
const reseauCanvas=document.getElementById("reseauCanvas")
reseauCanvas.width=300 

const voitureCtx = voitureCanvas.getContext("2d") // le contexte permet de savoir comment sera le rendu des dessins : 2D/3D 
const reseauCtx = reseauCanvas.getContext("2d") 
let nbVoies=0
do{ nbVoies = getNbIntAleat(6)}while(nbVoies<=1)
const route = new Route(voitureCanvas.width/2,voitureCanvas.width*0.9,nbVoies) // avant => 2 params
const voiture = new Voiture(route.getCentreVoie(getNbIntAleat(6-1)),100,30,50,"IA") // choix de la voie avec le x de la voiture 
// avant => route.getCentreVoie(2)
const traffic =[new Voiture(route.getCentreVoie(getNbIntAleat(6-1)),-100,30,50,"AUTRES",2)]

animer()
function animer(){
    for(let i=0;i<traffic.length;i++){
        traffic[i].maj(route.bords,[])
    }
    voiture.maj(route.bords,traffic)
    voitureCanvas.height= window.innerHeight // match taille avec écran
    reseauCanvas.height= window.innerHeight
    voitureCtx.save()
    voitureCtx.translate(0,-voiture.y+voitureCanvas.height*0.7)
    route.draw(voitureCtx)
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(voitureCtx)
    }
    voiture.draw(voitureCtx)
    requestAnimationFrame(animer)
}