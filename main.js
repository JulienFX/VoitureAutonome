const canvas=document.getElementById("myCanvas")
canvas.width=200 // en général on fait modification dans js quand l'objet va être en intéraction avec l'utilisateur

const ctx = canvas.getContext("2d") // le contexte permet de savoir comment sera le rendu des dessins : 2D/3D 
const voiture = new Voiture(100,100,30,50)
voiture.draw(ctx)

animer()
function animer(){
    voiture.maj()
    canvas.height= window.innerHeight // refresh coordonnées voiture 
    voiture.draw(ctx)
    requestAnimationFrame(animer)
}