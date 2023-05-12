class Controleur{
    constructor(type){
        this.avant=false
        this.gauche=false
        this.droite=false
        this.arriere=false
        switch(type){
            case "DETENTEUR" :
                this.#clavierListener()  
                break
            case "AUTRES" :
                this.avant=true
                break
        }
        
    }
    #clavierListener(){ // # private method
        document.onkeydown=(event)=>{ // même principe que document.onkeydown=function(event){} mais grâce à la flèche dans le code actuellement
            // this.gauche continue à se référencer à celle du constructeur là où si on avait mi function(event) this aurait fait ref à function
            switch(event.key){
                case "ArrowLeft" :
                    this.gauche=true
                    break
                case "ArrowRight" :
                    this.droite=true
                    break
                case "ArrowUp" : 
                    this.avant=true
                    break
                case "ArrowDown" :
                    this.arriere=true
                    break
            }
        }
        document.onkeyup=(event)=>{
            switch(event.key){
                case "ArrowLeft" :
                    this.gauche=false
                    break
                case "ArrowRight" :
                    this.droite=false
                    break
                case "ArrowUp" : 
                    this.avant=false
                    break
                case "ArrowDown" :
                    this.arriere=false
                    break
            }
        }
        
    }
}