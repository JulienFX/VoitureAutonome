class Route{
    constructor(x,largeur,voieCpt=3){ // on spécifie une valeur par défaut 
        this.x=x
        this.largeur=largeur
        this.voieCpt=voieCpt

        this.gauche=x-largeur/2
        this.droite=x+largeur/2

        const infinie=1000000
        this.haut = -infinie
        this.bas = infinie
        
        // Nord Sud Est Ouest
        const NO ={x:this.gauche,y:this.haut}
        const SO ={x:this.gauche,y:this.bas}
        const NE ={x:this.droite,y:this.haut}
        const SE ={x:this.droite,y:this.bas}
        this.bords=[[NO,SO],[NE,SE]]
    }

    getCentreVoie(indexVoie){
        const largeurVoie = this.largeur/this.voieCpt
        return this.gauche+largeurVoie/2+Math.min(indexVoie,this.voieCpt-1)*largeurVoie
    }

    draw(ctx){
        ctx.lineWidth=5
        ctx.strokeStyle="white"

        for(let i=1; i<=this.voieCpt-1;i++){
            const x=lerp(this.gauche,this.droite,i/this.voieCpt)
            ctx.setLineDash([20,20]) // pointillés route 
            ctx.beginPath()
            ctx.moveTo(x,this.haut)
            ctx.lineTo(x,this.bas)
            ctx.stroke()
        }
        ctx.setLineDash([])
        this.bords.forEach(bords=>{
            ctx.beginPath()
            ctx.moveTo(bords[0].x,bords[0].y)
            ctx.lineTo(bords[1].x,bords[1].y)
            ctx.stroke()
        })
       
    }
    
}
