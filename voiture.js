class Voiture{
    constructor(x,y,width,height){
        this.x=x
        this.y=y
        this.width=width
        this.height=height

        this.vitesse=0
        this.acceleration=0.2 
        this.vitesseMax=3 
        this.friction=0.05
        this.angle=0

        this.controls = new Controls()
    }

    maj(){ // maj = mise à jour
        if(this.controls.avant){
            this.vitesse+=this.acceleration
        }
        if(this.controls.arriere){
            this.vitesse-=this.acceleration
        }
        if(this.vitesse>this.vitesseMax){
            this.vitesse=this.vitesseMax
        }
        if(this.vitesse<-this.vitesseMax/2){ // marche arrière
            this.vitesse =-this.vitesseMax/2
        }
        if(this.vitesse>0){
            this.vitesse-=this.friction
        }
        if(this.vitesse<0){
            this.vitesse+=this.friction
        }
        if(Math.abs(this.vitesse)<this.friction){
            this.speed=0
        }
        if(this.vitesse!=0){
            const flip = this.vitesse>0?1:-1
            if(this.controls.gauche){
                this.angle-=0.03*flip
            }
            if(this.controls.droite){
                this.angle+=0.03*flip
            }
        }
        
        this.x-=Math.sin(this.angle)*this.vitesse
        this.y-=Math.cos(this.angle)*this.vitesse
        
    }

    draw(ctx){
        ctx.save()
        ctx.translate(this.x,this.y)
        ctx.rotate(-this.angle)
        ctx.beginPath()
        ctx.rect(-this.width/2,-this.height/2,this.width,this.height)
        ctx.fill()
        ctx.restore()
    }
}