class Foodc{
    constructor(){
        this.foodstock=0
        this.lastfed=0
        this.image=loadImage("Milk.png")
    }

    diaplay(){
        var x=80, y=100;

        imageMode(CENTER);
        image(this.image,720,220,70,70);

        if(this.foodstock!==0){
            for(var i=0; i<this.foodstock; i++){
                if(i%10===0){
                    x=80;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
            }
        }
    }

    getfoodstock(){
        var foodstockref=database.ref('Food');
        foodstockref.on("value",(data)=>{
            foodstock=data.val();
        })
    }

    updatefoodstock(count){
        database.ref('/').update({
            Food:count
        })
    }
    
    deductfood(x){
        if(x<=0){
            x=0;
        } else{
            x=x-1;
            database.ref('/').update({
              Food:x
            })
        }
    }
}