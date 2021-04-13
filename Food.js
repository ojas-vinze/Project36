class Foodc{
    constructor(){
        this.foodstock=0
        this.lastfed=0
        this.image=loadImage("Milk.png")
    }

    diaplay(){
        var x=80, y=100;

        imageMode(CENTER);

        if(foods!==0){
            for(var i=0; i<foods; i++){
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
            foods=data.val();
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

    getfeedtime(){
        var foodtimeref = database.ref('Feedtime');
        console.log(foodtimeref);
        foodtimeref.on("value",(data)=>{
            lastfed=data.val();
            console.log("in db" + lastfed);
        })
    }
}
