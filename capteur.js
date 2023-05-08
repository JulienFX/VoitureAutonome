class Capteur{
    constructor(voiture){
        this.voiture = voiture
        this.nbRayon = 3 // phare
        this.tailleRayon = 100
        this.diffusionRayon = Math.PI/4

        this.rayons=[]

    }

    maj(){
        this.rayons=[]
        for(let i=0;i<this.nbRayon;i++){
            const angleRayon = lerp(this.diffusionRayon/2,-this.diffusionRayon/2,i/(this.nbRayon-1))+this.voiture.angle 
            const depart = {x:this.voiture.x, y:this.voiture.y}
            const fin = { x:this.voiture.x-Math.sin(angleRayon)*this.tailleRayon,y:this.voiture.y-Math.cos(angleRayon)*this.tailleRayon}
            this.rayons.push([depart,fin])
        }
    }
    draw(ctx){
        for(let i=0;i<this.nbRayon;i++){
            ctx.beginPath()
            ctx.lineWidth=2
            ctx.strokeStyle="green"
            ctx.moveTo(this.rayons[i][0].x,this.rayons[i][0].y)
            ctx.lineTo(this.rayons[i][1].x,this.rayons[i][1].y)
            ctx.stroke()
        }
    }
}