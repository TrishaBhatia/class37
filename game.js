class Game
{
    constructor()
    {

    }

    getState()
    {
      var gameStateref=database.ref("gameState");
      gameStateref.on("value",(data)=>{
          gameState=data.val();
      })
    }
    updateState(state)
    {
      database.ref('/').update({
          gameState:state
      })
    }
    async start()
    {
        if(gameState===0)
        {

            player=new Player();
            var playerCountref=await database.ref("playerCount").once("value");
            if(playerCountref.exists())
            {
                playerCount=playerCountref.val();
                player.getCount();
            }
           
            form=new Form();
            form.display();
            
        }
        car1=createSprite(100,200);
        car2=createSprite(300,200);
        car3=createSprite(500,200);
        car4=createSprite(700,200);
       cars=[car1,car2,car3,car4] 
    }

    play()
    {
        form.hide();
        textSize(30);
        text("Game Start!",20,camera.position.y);
        Player.getPlayerInfo();
    if(allPlayers !== undefined)
        {  
            var index=0;
            var x=175;
            var y;
            var displayPosition=130;
            
            for(var p in allPlayers)
            {
                index=index+1;
                x=x+200;
                y=displayHeight-allPlayers[p].distance;
                cars[index-1].x=x;
                cars[index-1].y=y;
                if(index ===player.index)
                {
                    cars[index-1].shapeColor="red";
                    camera.position.x=displayWidth/2;
                    camera.position.y=cars[index-1].y
                }
                else{
                    cars[index-1].shapeColor="black";
                }
                displayPosition+=20;
            textSize(15);
        text(allPlayers[p].name+":"+allPlayers[p].distance,20,camera.position.y);
        }
    }
        if(keyIsDown(UP_ARROW)&& player.index !== null)
        {
            player.distance+=50;
            player.update();
        }

        drawSprites();
    }
    
}