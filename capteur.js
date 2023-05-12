class Capteur{
    constructor(voiture){
        this.voiture = voiture
        this.nbRayon = getNbIntAleat(10) // phare, AVANT => 3
        this.tailleRayon = 100
        this.diffusionRayon = Math.PI/4

        this.rayons=[]
        this.bordsDetecte=[]

    }

    maj(bordsRoute,traffic){
        this.#projRayons()
        this.bordsDetecte=[]
        for(let i=0;i<this.rayons.length;i++){
            this.bordsDetecte.push(this.#getBordsDetecte(this.rayons[i],bordsRoute,traffic))
        }
    }

    #getBordsDetecte(rayon,bordsRoute,traffic){
        let touches=[]
        for (let i=0;i<bordsRoute.length;i++){
            const touch=getIntersection(rayon[0],rayon[1],bordsRoute[i][0],bordsRoute[i][1])
            if(touch){
                touches.push(touch)
            }
        }
        for(let i=0;i<traffic.length;i++){
            const poly=traffic[i].polygone
            for(let j=0;j<poly.length;j++){
                const val = getIntersection(rayon[0],rayon[1],poly[j],poly[(j+1)%poly.length])
                if(val){
                    touches.push(val)
                }
            }
            
        }
        if(touches.length==0){
            return null
        }else{
            const offsets = touches.map(e=>e.offset) // revue code 
            const minOffset = Math.min(...offsets)
            return touches.find(e=>e.offset==minOffset)
        }
    }

    #projRayons(){
        this.rayons=[]
        for(let i=0;i<this.nbRayon;i++){
            const angleRayon = lerp(this.diffusionRayon/2,-this.diffusionRayon/2,this.nbRayon==1?0.5:i/(this.nbRayon-1))+this.voiture.angle 
            const depart = {x:this.voiture.x, y:this.voiture.y}
            const fin = { x:this.voiture.x-Math.sin(angleRayon)*this.tailleRayon,y:this.voiture.y-Math.cos(angleRayon)*this.tailleRayon}
            this.rayons.push([depart,fin])
        }
    }
    draw(ctx){
        for(let i=0;i<this.nbRayon;i++){
            let fin = this.rayons[i][1]
            if(this.bordsDetecte[i]){
                fin=this.bordsDetecte[i]
            }
            ctx.beginPath()
            ctx.lineWidth=2
            ctx.strokeStyle="yellow"
            ctx.moveTo(this.rayons[i][0].x,this.rayons[i][0].y)
            ctx.lineTo(fin.x,fin.y)
            ctx.stroke()

            ctx.beginPath()
            ctx.lineWidth=2
            ctx.strokeStyle="black"
            ctx.moveTo(this.rayons[i][1].x,this.rayons[i][1].y)
            ctx.lineTo(fin.x,fin.y)
            ctx.stroke()
        }
    }
}