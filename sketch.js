var dog,happydog,dogimg,database,foods,foodstock,foodcount,foodobj,lastfed,fedtime;
var feedb,addfoodb;

function preload(){
  happydog=loadImage("dogimg2.png");
  dogimg=loadImage("dogimg1.png")
}

function setup(){
  createCanvas(1200, 570);
  
  foodobj = new Foodc();
  foodobj.foodstock=20;
  
  
  dog = createSprite(600,285,30,70);
  dog.addImage(dogimg);
  dog.scale = 0.3;

  database=firebase.database();

  foodstock=database.ref('Food');
  foodstock.on("value",readstock);
  fedtime=database.ref('Feedtime');
  fedtime.on("value",function(data){
    lastfed=data.val();
  })

  feedb = createButton('Feed the dog');
  feedb.position(1000,30);
  feedb.mousePressed(feeddog);
  

  addfoodb = createButton('Add food');
  addfoodb.position(1100,30);
  addfoodb.mousePressed(addfood);
}

function draw(){
  background(46,139,87);  

  textSize(20);
  fill(255,255,254);
  if(lastfed>=12){
    text("Last Feed: "+ lastfed%12 + "PM",350,30);
  }else if(lastfed===0){
    text("Last Feed: 12AM",350,30);
  }else{
    text("Last Feed: " + lastfed + "AM",350,30);
  }

  foodobj.diaplay();
  console.log(foodobj.foodstock);

  drawSprites();
}

function readstock(data){
  foods=data.val();
}

function feeddog(){
  dog.addImage(happydog);
  foodobj.updatefoodstock(foodobj.getfoodstock()-1);
  database.ref('/').update({
    Food:foodobj.getfoodstock(),
    Feedtime:hour()
  })
}

function addfood(){
  foods++;
  database.ref('/').update({
    Food:foods
  })
}
