class Niveau{
    constructor(entreeCpt,sortieCpt){
        this.entree = new Array(entreeCpt)
        this.sortie = new Array(sortieCpt)
        this.biais = new Array(sortieCpt)

        this.poids=[]
        for(let i=0;i<entreeCpt;i++){
            this.poids[i]=new Array(sortieCpt) // pour chaque entrée on associe les connexions aux différentes sorties
        }

        Level.#aleat(this)
    }

    static #aleat(niveau){ // serialisation
        for(let i=0; i<niveau.entree.length;i++){
            for (let j=0; j<niveau.sortie.length;j++){
                niveau.poids[i][j]=Math.random()*2-1 // entre -1 et 1
            }
        }
        for(let i=0;i<niveau.biais.length;i++){
            niveau.biais[i]=Math.random()*2-1
        }
    }

    static feedForward(donnéesEntree,niveau){
        for(let i=0;i<niveau.inputs.length;i++){
            niveau.entree[i]=donnéesEntree[i]
        }

        for(let i=0;i<niveau.sortie.length;i++){
            let somme=0
            for(let j=0;j<niveau.entree.length;j++){
                somme+=niveau.entree[j]*niveau.poids[j][i]
            }
            if(somme>niveau.biais[i]){
                niveau.sortie
            }else{
                niveau.sortie[i]=0
            }
        }
        return niveau.sortie
    }
}