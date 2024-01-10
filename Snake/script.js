let lastPaintTime = 0;
let speed = 50;
let inputDir = { x: 0, y: 0 };
let box = document.getElementById("box");
let snake = [{ x: 8, y: 8 }];
let food = { x: 10, y: 3 };
let score=document.getElementById("score");
let s=0;

function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    game();
}
function game() {
    if (collide()) {
        inputDir={x:0,y:0};
        snake=[{x:8,y:8}];
        window.alert("Game Over,Press any key to continue");
        s=0;
        score.innerHTML="Score is:"+s;
    }
    //moving snake
    box.innerHTML = "";
    
    if (snake[0].x == food.x && snake[0].y == food.y) {
        console.log("Eating Food");
        snake.unshift({ x: snake[0].x + inputDir.x, y: snake[0].y + inputDir.y });
        food =createFood();
        s+=1;
        score.innerHTML="Score is:"+s;
    }
    for( i=snake.length-1;i>0;i--){
        snake[i].x=snake[i-1].x;
        snake[i].y=snake[i-1].y;
    }
    snake[0].x+=inputDir.x;
    snake[0].y+=inputDir.y;
    // displaying food and snake
    let food_pos=document.createElement('div');
    food_pos.style.gridRowStart=food.y;
    food_pos.style.gridColumnStart=food.x;
    food_pos.classList.add("food");
    box.appendChild(food_pos)

    snake.forEach((e,i)=>{
        let snake_pos=document.createElement("div");
        snake_pos.style.gridRowStart=e.y;
        snake_pos.style.gridColumnStart=e.x;
        if(i==0){
            snake_pos.classList.add("head");
        }
        else{
            snake_pos.classList.add("body");
        }
        box.appendChild(snake_pos);
    })
}
function createFood(){
    let food= { x: Math.round(2 + 16 * Math.random()), y: Math.round(2 + 16 * Math.random()) };
    for(i=0;i<snake.length;i++){
        if(food.x==snake[0].x &&food.y==snake[0].y){
            createFood();
        }
    }
    return food;
}
function collide() {
    if(snake[0].x<0 ||snake[0].x>18 || snake[0].y<0 ||snake[0].y>18){
        return true;
    }
    for(i=1;i<snake.length;i++){
        if(snake[i].x==snake[0].x &&snake[i].y==snake[0].y ){
            return true;
        }
    }
    return false;
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
    inputDir = { x: 0, y: 1 };
    switch (e.key) {
        case "ArrowUp":
            console.log("up");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("down");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("left");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("right");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})