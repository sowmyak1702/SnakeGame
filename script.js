let d={x:0,y:0};
const fsound=new Audio("food.mp3");
const msound=new Audio("move.mp3");
const gover=new Audio("gameover.mp3");
let speed=8
let score=0;
let lastpainttime=0;
// the array which stores the snake position
let snakearray=[
    {x:15,y:6},
]
// the food particles postion which snake eatsss
let food={x:4,y:9};

// main function
function main(currenttime){
    window.requestAnimationFrame(main); 
    if((currenttime-lastpainttime)/1000<1/speed){
        return;
    }
    lastpainttime=currenttime;
    game();
}
function isend(snakearray){
    // if the head gets collide with the body of snake which means the head x nd y are same to any x or y point then return true as game end
    for(let i=1;i<snakearray.length;i++){
        if(snakearray[0].x===snakearray[i].x && snakearray[0].y===snakearray[i].y){
            return true;
        }
        
    }
    if(snakearray[0].x>= 18 || snakearray[0].x<0 || snakearray[0].y>=18 || snakearray[0].y<0){
        return true;
    }
    return false;
    
}
// game logic wgich shows the movement of snake and food
function game(){
    // updation of the array 
    // if the snake collides
    if(isend(snakearray)){
        gover.play();
        d={x:0,y:0};
        alert("Game Over! Press any key to Start playing");
        snakearray=[{x:15,y:6}];
        score=0;
    }
    // if eaten the food then increment the snakearray by the food val
    if(snakearray[0].x===food.x && snakearray[0].y===food.y){
        snakearray.unshift({x:snakearray[0].x+d.x,y:snakearray[0].y+d.y});
        score=score+1;
        scoree.innerHTML="Score : "+score;
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
    }


    // Move of the snakee
    for(let i=snakearray.length-2;i>=0 ;i--){
        // const value=snakearray[i];
        snakearray[i+1]={...snakearray[i]};
    }
    snakearray[0].x+=d.x;
    snakearray[0].y+=d.y;
    //display the snake 
    document.getElementById("board").innerHTML="";
    snakearray.forEach((x1,y1)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=x1.y;
        snakeElement.style.gridColumnStart=x1.x;
        if(y1===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);


    });

    // display of food which snake gets attached
    // document.getElementById("board").innerHTML="";
    
        foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);


    }
    

//logic of game after setting positions of food and snake
window.requestAnimationFrame(main);
window.addEventListener("keydown",l=>{
    switch(l.key){
        case "ArrowUp":
            // console.log("ArrowUp");
            d.x=0;
            d.y=-1;
            break;
        case "ArrowLeft":
            d.x=-1;
            d.y=0;
            // console.log("al");
           
            break;
         case "ArrowRight":
            // console.log("ar");
            d.x=1;
            d.y=0;            
            break;
        case "ArrowDown":
            // console.log("Arrowdown");
            d.x=0;
            d.y=1;
            break;
        default:
            break;
            
    }
})
