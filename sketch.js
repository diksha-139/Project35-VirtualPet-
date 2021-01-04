var dog,dogImg1,dogImg2;
var database;
var foodStockRef,foodStock;

function preload(){
   dogImg1=loadImage("Dog.png");
   dogImg2=loadImage("happy dog.png");
  }


function setup() {
  database=firebase.database();
  createCanvas(500,500);

  dog=createSprite(250,300,10,10);
  dog.addImage(dogImg1);
  dog.scale=0.1;

  foodStockRef=database.ref('Food');
  foodStockRef.on("value",readStock);
  
}


function draw() {
  background(46,139,87);
 
  if(keyWentDown(UP_ARROW)){
    writeStock(foodStock);
    dog.addImage(dogImg2);
  }

  drawSprites();
  fill("white");
  stroke("black");
textSize(20);
  text("Food remaining : "+foodStock,170,200);
  textSize(15);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
}


function readStock(data){
  foodStock=data.val();
}


function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}
