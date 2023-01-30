const timerCount = document.querySelector(".score-count");
const canvas = document.getElementById("play_area");
const originalImage = document.querySelector(".original");
const question = document.querySelector(".question-count");

const resultScreen = document.getElementById("result_screen");

const ctx = canvas.getContext('2d');

var differencePlayerFound = [];
var tempo = [];
var time;
var timer;

window.onload = init;

  function init(){
    // the code to be called when the dom has loaded
    // #document has its nodes
    const startButton = document.getElementById("start_button");
    const startGameButton = document.getElementById("start_game_button");
    const againButton = document.getElementById("again_button");
    const homeButton = document.getElementById("home_button");

    const startScreen = document.getElementById("main_screen");
    const instructionScreen = document.getElementById("instruction_screen");
    const resultScreen = document.getElementById("result_screen");
    
    startButton.addEventListener("click", function (){
        startScreen.classList.add("hide");
        instructionScreen.classList.remove("hide")
        score = 0;
        time = 120
        timerCount.innerHTML = `${time}s`;
        timer = setInterval(updateTime, 1000)
        loadImage();
    })

    startGameButton.addEventListener("click", function (){
        instructionScreen.classList.add("hide")
    })

    againButton.addEventListener("click", function (){
        resultScreen.classList.add("hide")
        tempo = [];
        startScreen.classList.remove("hide");
    })

    homeButton.addEventListener("click", function(){
        location.assign('https://gimme.sg/activations/dementia/');
    })
  }

const differences = [
    //BUS FRONT VIEW
    {images: [
            {
                // DIFFERENCES 1
                image1: {x: 80, y: 120, radius: 60}
            },   
            {
                // DIFFERENCES 2
                image1: {x: 110, y: 20, radius: 60}
            }
            
            ],
        width: 300, height: 200, imageURL: "./img/difference1.png", original:"./img/original1.png"},
        
    
    // FLAG
    {images: [
        {
            // DIFFERENCES 1
            image1: {x: 180, y: 100, radius: 60}
        },   
        {
            // DIFFERENCES 2
            image1: {x: 60, y: 50, radius: 60}
        }
        
        ],
    width: 300, height: 200, imageURL: "./img/difference2.png", original:"./img/original2.png"},
    
    // PLAYGROUND
    {images: [
        {
            // DIFFERENCES 1
            image1: {x: 75, y: 130, radius: 60}
        },   
        {
            // DIFFERENCES 2
            image1: {x: 160, y: 60, radius: 60}
        }
        
        ],
    width: 300, height: 200, imageURL: "./img/difference3.png", original:"./img/original3.png"},
    
    // MRT
    {images: [
        {
            // DIFFERENCES 1
            image1: {x: 220, y: 140, radius: 60}
        },   
        {
            // DIFFERENCES 2
            image1: {x: 20, y: 75, radius: 60}
        }
        
        ],
    width: 300, height: 200, imageURL: "./img/difference4.png", original:"./img/original4.png"},
    
    // FOOD
    {images: [
        {
            // DIFFERENCES 1
            image1: {x: 210, y: 110, radius: 60}
        },   
        {
            // DIFFERENCES 2
            image1: {x: 50, y: 80, radius: 60}
        }
        
        ],
    width: 300, height: 200, imageURL: "./img/difference5.png", original:"./img/original5.png"},
      
    // BUS SIDE VIEW
    {images: [
        {
            // DIFFERENCES 1
            image1: {x: 180, y: 120, radius: 60}
        },   
        {
            // DIFFERENCES 2
            image1: {x: 30, y: 30, radius: 60}
        }
        
        ],
    width: 300, height: 200, imageURL: "./img/difference6.png", original:"./img/original6.png"}
];

let differencesCount = 0;
let score = 0;
let total = 2;





function getMousePos(canvas, e) // because canvas and bitmap is diff size
{
    const rect = canvas.getBoundingClientRect(), // abs. size of element
        scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
        scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y

    return {
        x: (e.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
        y: (e.clientY - rect.top) * scaleY     // been adjusted to be relative to element
    }
}



function isIntersect(point, object) 
{
    return Math.sqrt((point.x- object.x) ** 2 + (point.y - object.y) ** 2) < object.radius;
}

function loadImage()
{
    RadmiseImage();

    question.innerHTML = score + "/" + total;

    differencesFound = 0;
    differencePlayerFound = ["", ""]
    var image = new Image();
    image.src = tempo[differencesCount].imageURL;
    originalImage.src = tempo[differencesCount].original;

    //correct image
    var image2 = new Image();
    image2.src = './img/correct.png';

    image.onload = function ()
    {

        ctx.clearRect( 0, 0, window.innerWidth,
            window.innerHeight);

        ctx.drawImage(image, 0, 0, tempo[differencesCount].width,
            tempo[differencesCount].height);

        canvas.onclick = function (e)
        {

            const mousePos = getMousePos(canvas, e);




  
            
        
            
            for(let i = 0; i < tempo[differencesCount].images.length; i++)
            {
                console.log(i);


                //To see all differenet
                /*ctx.drawImage(image2, differences[differencesCount].images[i].image1.x, differences[differencesCount].images[i].image1.y,
                    differences[differencesCount].images[i].image1.radius,
                    differences[differencesCount].images[i].image1.radius);*/


                if(isIntersect(mousePos, tempo[differencesCount].images[i].image1) && differencePlayerFound[i] == "")
                {
                    console.log(mousePos)
                    console.log(tempo[differencesCount].images[i].image1.x, tempo[differencesCount].images[i].image1.y)
                    console.log("correct!")

                    differencePlayerFound[i] = "found"

                    ctx.drawImage(image2, tempo[differencesCount].images[i].image1.x, tempo[differencesCount].images[i].image1.y,
                        tempo[differencesCount].images[i].image1.radius,
                        tempo[differencesCount].images[i].image1.radius)
                    
                    differencesFound++;
                    
                    if(differencesFound === tempo[differencesCount].images.length)
                    {
                        score++;
                        console.log(score)
                        tempo.splice(differencesCount, 1)
                        onCorrect();
                    }
                    
                    break;
                  

                }
            }


            

    
        };
    }



    
    
    
 
}


function onCorrect()
{
    var delayInMilliseconds = 1000; //1 second
    
    if(score < total)
    {
        console.log(differencesCount + " COUNT")
        console.log(tempo.length  + " LEN")

        

        setTimeout(function() {
            loadImage();
        }, delayInMilliseconds);
    }
    else
    {
        clearInterval(timer);
        document.querySelector(".result").src = "./img/youWin.png"

        setTimeout(function() {
            resultScreen.classList.remove("hide")
            setTimeout(function() {
                confetti.start();
                setTimeout(function() {
                    confetti.stop();
                },3000)
            },500)
        }, delayInMilliseconds);
    }
     
    


}

function deleteFromArray(array, name)
{
    let deleteCount = 0;
    for(let x = 0; x < array.length; x++)
    {
        if(array[x].objectName === name)
        {
            deleteCount = x;
            console.log(deleteCount + " DELETE")
            console.log("DELETED " + name);
            break;
        }
    }
    
    array.splice(deleteCount, 1);
}

function RadmiseImage(){
    if(tempo.length == 0){
        for(let i = 0; i < differences.length; i++){
            tempo.push(differences[i])
        }
        console.log(tempo)
    }

    differencesCount = Math.floor(Math.random() * tempo.length);
}

function updateTime(){
    time --;
    timerCount.innerHTML = `${time}s`;
    if(time == 0){
        clearInterval(timer);
        document.querySelector(".result").src = "./img/youTried.png"
        resultScreen.classList.remove("hide")
    }
}