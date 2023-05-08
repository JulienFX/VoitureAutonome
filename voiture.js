class Voiture{
    constructor(x,y,largeur,longueur){
        this.x=x
        this.y=y
        this.largeur=largeur
        this.longueur=longueur

        this.vitesse=0
        this.acceleration=0.2 
        this.vitesseMax=3
        this.friction=0.05
        this.angle=0

        this.capteur=new Capteur(this)
        this.controleur = new Controleur()
    }

    maj(){ // maj = mise à jour
        this.#deplacement()
        this.capteur.maj()
        
        
    }
    #deplacement(){
        if(this.controleur.avant){
            this.vitesse+=this.acceleration
        }
        if(this.controleur.arriere){
            this.vitesse-=this.acceleration
        }
        if(this.vitesse>this.vitesseMax){
            this.vitesse=this.vitesseMax
        }
        if(this.vitesse<-this.vitesseMax/2){ // marche arrière
            this.vitesse =-this.vitesseMax/2
        }
        if(this.vitesse>0){ // TODO : rajout d'une condition avec le boutton pressé 
            this.vitesse-=this.friction
        }
        if(this.vitesse<0){ // TODO : rajout d'une condition avec le boutton pressé 
            this.vitesse+=this.friction
        }
        if(Math.abs(this.vitesse)<this.friction){
            this.speed=0
        }
        if(this.vitesse!=0){
            const flip = this.vitesse>0?1:-1
            if(this.controleur.gauche){
                this.angle-=0.03*flip
            }
            if(this.controleur.droite){
                this.angle+=0.03*flip
            }
        }
        
        this.x-=Math.sin(this.angle)*this.vitesse
        this.y-=Math.cos(this.angle)*this.vitesse
        // x pas lié à cos car positionnement voiture oblige inversement 
    }

    draw(ctx){
        ctx.save()
        ctx.translate(this.x,this.y)
        ctx.rotate(-this.angle)
        ctx.beginPath()
        ctx.rect(-this.largeur/2,-this.longueur/2,this.largeur,this.longueur)
        ctx.fill()
        ctx.restore()

        this.capteur.draw(ctx)
    }
}