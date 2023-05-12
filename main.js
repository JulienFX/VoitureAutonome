const canvas=document.getElementById("myCanvas")
canvas.width=200 // en général on fait modification dans js quand l'objet va être en intéraction avec l'utilisateur

const ctx = canvas.getContext("2d") // le contexte permet de savoir comment sera le rendu des dessins : 2D/3D 
let nbVoies=0
do{ nbVoies = getNbIntAleat(6)}while(nbVoies<=1)
const route = new Route(canvas.width/2,canvas.width*0.9,nbVoies) // avant => 2 params
const voiture = new Voiture(route.getCentreVoie(getNbIntAleat(6-1)),100,30,50,"DETENTEUR") // choix de la voie avec le x de la voiture 
// avant => route.getCentreVoie(2)
const traffic =[new Voiture(route.getCentreVoie(getNbIntAleat(6-1)),-100,30,50,"AUTRES",2)]

animer()
function animer(){
    for(let i=0;i<traffic.length;i++){
        traffic[i].maj(route.bords,[])
    }
    voiture.maj(route.bords,traffic)
    canvas.height= window.innerHeight // refresh coordonnées voiture 
    ctx.save()
    ctx.translate(0,-voiture.y+canvas.height*0.7)
    route.draw(ctx)
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(ctx)
    }
    voiture.draw(ctx)
    requestAnimationFrame(animer)
}