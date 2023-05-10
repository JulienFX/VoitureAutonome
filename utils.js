// CSTE jeu de couleur 
const couleurs =['blue','black','purple','grey','green','cyan']
const indCouleur = getNbIntAleat(couleurs.length)

function lerp(A,B,t){ // nom de fonction souvent utilisée dans les jeux vidéos pour créer un mvt le long d'une trajectoire droite et pour dessiner des lignes pointillées
    return A+(B-A)*t
}


function getIntersection(A,B,C,D){ 
    const tTop=(D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x);
    const uTop=(C.y-A.y)*(A.x-B.x)-(C.x-A.x)*(A.y-B.y);
    const bottom=(D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y);
    
    if(bottom!=0){
        const t=tTop/bottom;
        const u=uTop/bottom;
        if(t>=0 && t<=1 && u>=0 && u<=1){
            return {
                x:lerp(A.x,B.x,t),
                y:lerp(A.y,B.y,t),
                offset:t
            }
        }
    }

    return null;
}

function getNbIntAleat(max){
    let val=0
    while(val==0){
        val= Math.floor(Math.random() * max) 
    }
    return val
}

function getCouleurAleat(){
    return couleurs[indCouleur]
}

function polysIntersect(poly1,poly2){
    for(let i=0;i<poly1.length;i++){
        for(let j=0;j<poly2.length;j++){
            const touch = getIntersection(poly1[i],poly1[(i+1)%poly1.length],poly2[j],poly2[(j+1)%poly2.length]) // modulo règle pb dépassement case mémoire
            if(touch){
                return true
            }
        }
    }
    return false
}