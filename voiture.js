class Voiture{
    constructor(x,y,largeur,longueur,controle,vitesseMax=3){
        this.x=x
        this.y=y
        this.largeur=largeur
        this.longueur=longueur

        this.vitesse=0
        this.acceleration=0.2 
        this.vitesseMax=vitesseMax
        this.friction=0.05
        this.angle=0
        this.degats=false
        
        // pas obligatoire de le référencer dans le constructeur ! 
        this.polygone=[]

        if(controle!="AUTRES"){
            this.capteur=new Capteur(this)
        }
        
        this.controleur = new Controleur(controle)
    }

    maj(bordsRoute){ // maj = mise à jour
        if(!this.degats){
            this.#deplacement()
            this.polygone=this.#creaPolygone()
            this.degats=this.#evalDegats(bordsRoute)
        }
        if(this.capteur){
            this.capteur.maj(bordsRoute)
        }
        
        
    }

    #evalDegats(bordsRoute){
        for(let i=0;i<bordsRoute.length;i++){
            if(polysIntersect(this.polygone,bordsRoute[i])){
                return true
            }
        }
        return false
    }

    #creaPolygone(){
        const points = []
        const rad = Math.hypot(this.largeur,this.longueur)/2
        const alpha = Math.atan2(this.largeur,this.longueur)
        points.push({
            x:this.x-Math.sin(this.angle-alpha)*rad,
            y:this.y-Math.cos(this.angle-alpha)*rad
        })
        points.push({
            x:this.x-Math.sin(this.angle+alpha)*rad,
            y:this.y-Math.cos(this.angle+alpha)*rad
        })
        points.push({
            x:this.x-Math.sin(Math.PI+this.angle-alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle-alpha)*rad
        })
        points.push({
            x:this.x-Math.sin(Math.PI+this.angle+alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle+alpha)*rad
        })
        return points
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
        ctx.beginPath()
        if(this.degats){
            ctx.fillStyle="orange"
        }else{
            ctx.fillStyle=getCouleurAleat()
        }
        
        ctx.moveTo(this.polygone[0].x,this.polygone[0].y)
        for(let i=1;i<this.polygone.length;i++){
            ctx.lineTo(this.polygone[i].x,this.polygone[i].y)
        }
        ctx.fill()
        if(this.capteur){
            this.capteur.draw(ctx)
        }
        
    }
}