var database ,dog,dog1,dog2;;
var position;
//var form
var feed,add;
var foodobject;
var Feedtime;
var Lastfeed;
//Create variables here

function preload()

{
  dogimg1 = loadImage("../images/dogImg.png");
  dogimg2 = loadImage("../images/dogImg1.png");
  dogimg3 = loadImage("../images/bath.png");
  dogimg4 = loadImage("../images/walk.png");
  dogimg5 = loadImage("../images/play.png");
  dogimg6 = loadImage("../images/sleep.png");
  bg = loadImage("../images/bg.png");

}

function setup() {

	createCanvas(1000, 500);

  database = firebase.database();

  console.log(database);
 

  foodobject=new Food();


  dog = createSprite(550,250,10,10);
  dog.addImage(dogimg1);
  dog.scale=0.2;
  
 

  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);


  fill("red")
  feed = createButton("Feed Your dog!");
  feed.position(500,15);
  feed.mousePressed(FeedDog);


  add = createButton("Add Food!");
  add.position(400,15);
  add.mousePressed(AddFood);


} 



function draw(){
 { 
     background(255, 212, 82);
     foodobject.display()
 
 }


 // bath
 if(keyWentUp(DOWN_ARROW)){
    
  dog.addImage(dogimg3);
  dog.scale = 0.3;
  
  
}



// sleep 
if(keyWentUp(LEFT_ARROW)){
 
  dog.addImage(dogimg6);
  dog.scale = 0.3;
  
  
}


// play 
if(keyWentUp(RIGHT_ARROW)){
 
  dog.addImage(dogimg5);
  dog.scale = 0.4;
  
  
}


// if space key is pressed then walk  img appear 
if(keyCode === 32){
  
  dog.addImage(dogimg4);
  dog.scale = 0.5;

}

 drawSprites();
    
}
  
 
  


function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position);
  console.log(position.x);
  
}

function showError(){
  console.log("Error in writing to the database");
}

function AddFood(){
position++
database.ref('/').update({
  Food:position
}

)
}
function FeedDog(){

dog.addImage(dogimg2);
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime:hour ()
 });
}
