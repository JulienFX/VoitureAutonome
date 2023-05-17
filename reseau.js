class reseauNeuronne{
    constructor(cptNeuronne){
        this.niveaux=[]
        for(let i=0;i<cptNeuronne.length-1;i++){
            this.niveaux.push(new Niveau(cptNeuronne[i],cptNeuronne[i+1]))
        }
    }

    static feedForward(dataEntree,reseau){
        let sorties=Niveau.feedForward(dataEntree,reseau.niveaux[0])
        for(let i=1;i<reseau.niveaux.length;i++){
            sorties=Niveau.feedForward(sorties,reseau.niveaux[i])
        }
        return sorties
    }

    static mutation(reseau,qte=1){
        reseau.niveaux.forEach(niveau => {
            for(let i=0;i<niveau.biais.length;i++){
                niveau.biais[i]=lerp(niveau.biais[i],Math.random()*2-1,qte)
            }
            for(let i=0;i<niveau.poids.length;i++){
                for(let j=0;j<niveau.poids[i].length;j++){
                    niveau.poids[i][j]=lerp(niveau.poids[i][j],Math.random()*2-1,qte)
                }
            }
        });
    }
}

class Niveau{
    constructor(entreeCpt,sortieCpt){
        this.entree = new Array(entreeCpt) // valeurs d'entrées données par les calpteurs
        this.sortie = new Array(sortieCpt) // def en fonction du bias et du poids 
        this.biais = new Array(sortieCpt)
        // le biais permet d'évaluer si les prédictions sont précises ou non et si le modèle a tendance à sur/sous-estimer les valeurs de la variable d'intérêt
        this.poids=[]
        for(let i=0;i<entreeCpt;i++){
            this.poids[i]=new Array(sortieCpt) // pour chaque entrée on associe les connexions aux différentes sorties
        }

        Niveau.#aleat(this)
    }

    static #aleat(niveau){ // serialisation
        for(let i=0; i<niveau.entree.length;i++){
            for (let j=0; j<niveau.sortie.length;j++){ // pour chaque niveau de notre réseau de neuronne on parcours chaque noeud 
                niveau.poids[i][j]=Math.random()*2-1 // entre -1 et 1
            }
        }
        for(let i=0;i<niveau.biais.length;i++){
            niveau.biais[i]=Math.random()*2-1
        }
    }

    static feedForward(dataEntree,niveau){
        for(let i=0;i<niveau.entree.length;i++){
            niveau.entree[i]=dataEntree[i]
        }

        for(let i=0;i<niveau.sortie.length;i++){
            let somme=0
            for(let j=0;j<niveau.entree.length;j++){
                somme+=niveau.entree[j]*niveau.poids[j][i] 
            }
            // plus le biais est proche de 0, plus la prédiction est bonne / par défaut le biais est défini aléatoirement
            if(somme>niveau.biais[i]){
                niveau.sortie[i]=1 // activation
            }else{
                niveau.sortie[i]=0 // non activation
            }
        }
        return niveau.sortie
    }
}