const voitureCanvas=document.getElementById("voitureCanvas")
voitureCanvas.width=200 // en général on fait modification dans js quand l'objet va être en intéraction avec l'utilisateur


const voitureCtx = voitureCanvas.getContext("2d") // le contexte permet de savoir comment sera le rendu des dessins : 2D/3D 
let nbVoies=0

do{ nbVoies = getNbIntAleat(6)}while(nbVoies<=1)
const route = new Route(voitureCanvas.width/2,voitureCanvas.width*0.9,nbVoies) // avant => 2 params
const voitures = genererVoiture(1000)//new Voiture(route.getCentreVoie(getNbIntAleat(6-1)),100,30,50,"IA") // choix de la voie avec le x de la voiture 
// avant => route.getCentreVoie(2)
const traffic =[
    new Voiture(route.getCentreVoie(getNbIntAleat(6-1)),-100,30,50,"AUTRES",2),
    new Voiture(route.getCentreVoie(getNbIntAleat(6-1)),-300,30,50,"AUTRES",2),
    new Voiture(route.getCentreVoie(getNbIntAleat(6-1)),-200,30,50,"AUTRES",2),
    new Voiture(route.getCentreVoie(getNbIntAleat(6-1)),-600,30,50,"AUTRES",2),
    new Voiture(route.getCentreVoie(getNbIntAleat(6-1)),-400,30,50,"AUTRES",2),
    new Voiture(route.getCentreVoie(getNbIntAleat(6-1)),-500,30,50,"AUTRES",2)

]
let meilleurVoiture=voitures[0]
if(localStorage.getItem("meilleurCerveau")){
    for (let i=0;i<voitures.length;i++){
        meilleurVoiture.cerveau=JSON.parse(localStorage.getItem("meilleurCerveau"))
        if(i!=0){
            reseauNeuronne.mutation(voitures[i].cerveau,0.4)
        }
    }
}
animer()

function sauvegarde(){
    localStorage.setItem("meilleurCerveau",JSON.stringify(meilleurVoiture.cerveau))
}

function supprimer(){
    localStorage.removeItem("meilleurCerveau")
}

function genererVoiture(N){
    const voitures=[]
    for (let i=1;i<=N;i++){
        voitures.push(new Voiture(route.getCentreVoie(getNbIntAleat(6-1)),100,30,50,"IA"))
    }
    return voitures
}
function animer(){
    for(let i=0;i<traffic.length;i++){
        traffic[i].maj(route.bords,[])
    }
    
    for (let i=0;i<voitures.length;i++){
        voitures[i].maj(route.bords,traffic)
    }
    meilleurVoiture = voitures.find(c=>c.y==Math.min(... voitures.map(c=>c.y))) // ... => permet de spread le tableau 
    voitureCanvas.height= window.innerHeight // match taille avec écran
    voitureCtx.save()
    voitureCtx.translate(0,-meilleurVoiture.y+voitureCanvas.height*0.7)
    route.draw(voitureCtx)
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(voitureCtx)
    }
    voitureCtx.globalAlpha=0.2
    for(let i=0;i<voitures.length;i++){
        voitures[i].draw(voitureCtx)
    }
    voitureCtx.globalAlpha=1
    meilleurVoiture.draw(voitureCtx,true)
    voitureCtx.restore()
    requestAnimationFrame(animer)
}