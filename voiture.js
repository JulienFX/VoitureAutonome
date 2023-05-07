class Voiture{
    constructor(x,y,width,height){
        this.x=x
        this.y=y
        this.width=width
        this.height=height

        this.controls = new Controls()
    }

    maj(){ // maj = mise à jour
        if(this.controls.avant){
            this.y-=2
        }
        if(this.controls.arriere){
            this.y+=2
        }

    }

    draw(ctx){
        ctx.beginPath()
        ctx.rect(this.x-this.width/2,this.y-this.height/2,this.width,this.height)
        ctx.fill()
    }
}