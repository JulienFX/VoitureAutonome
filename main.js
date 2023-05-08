const canvas=document.getElementById("myCanvas")
canvas.width=200 // en général on fait modification dans js quand l'objet va être en intéraction avec l'utilisateur

const ctx = canvas.getContext("2d") // le contexte permet de savoir comment sera le rendu des dessins : 2D/3D 
const route = new Route(canvas.width/2,canvas.width*0.9)
const voiture = new Voiture(route.getCentreVoie(2),100,30,50) // choix de la voie avec le x de la voiture 


animer()
voiture.draw(ctx)
function animer(){
    voiture.maj()
    canvas.height= window.innerHeight // refresh coordonnées voiture 
    ctx.save()
    ctx.translate(0,-voiture.y+canvas.height*0.7)
    route.draw(ctx)
    voiture.draw(ctx)
    requestAnimationFrame(animer)
}