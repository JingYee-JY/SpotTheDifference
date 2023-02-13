const play = document.getElementById("play");
const start = document.getElementById("start");
const again = document.getElementById("again");
const home = document.getElementById("home");

const startPage = document.getElementById("startPage");
const instructionPage = document.getElementById("instructionPage");
const gamePage = document.getElementById("gamePage");
const popUp = document.getElementById("popUp");
const finalPage = document.getElementById("finalPage");

const clickSound = document.getElementById("click")
const clap = document.getElementById("clap")
const completed = document.getElementById("correct")
const wrong = document.getElementById("wrong")
const lose = document.getElementById("lose")

const scoreCount = document.getElementById("score-count")
const questionCount = document.getElementById("question-count")
const canvas = document.getElementById("play_area");
const ctx = canvas.getContext('2d');
const canvas2 = document.getElementById("answer_area");
const ctx2 = canvas2.getContext('2d');
const mark = document.getElementById("mark")
const checkAnswer = document.getElementById("checkAnswer")
const showAnswer = document.getElementById("showAnswer")
const correctAnswer = document.getElementById("correctAnswer")
const medal = document.getElementById("medal")
const words1 = document.getElementById("words1")
const words2 = document.getElementById("words2")
const scoreText = document.getElementById("scoreText")

let current;
let addscore = 1
let differencesCount = 0;
let score = 0;
let total = 2;

var differencePlayerFound = [];
var tempo = [];
var time;
var timer;

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

//here is finalV2
const group1 = document.querySelector(".group1");

play.addEventListener("click", () => {
    playClickSound()
    setTimeout(() => {
        startPage.classList.add("hide")
        
        instructionPage.classList.remove("hide")
    }, 200);
})

start.addEventListener("click", () => {
    playClickSound()
    setTimeout(() => {
        instructionPage.classList.add("hide")
        gamePage.classList.remove("hide")
        ready()
        loadImage()
    }, 200);
})

again.addEventListener("click", () => {
  playClickSound()
  //controls amd buttons visibility
  let delay = setTimeout(() => {
    startPage.classList.remove("hide");
    finalPage.classList.add("hide")
  }, 200);
});

home.addEventListener("click", () => {
  playClickSound()
  let delay = setTimeout(() => {
    location.assign('https://gimme.sg/activations/minigames/main.html');
  }, 200);
})


function ready(){
    //code here to get UI ready 
    //like number of point to zero and others
    current = 0;
    questionCount.textContent = current + "/" + total

    score = 0;
    scoreCount.textContent = score
}

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

    questionCount.innerHTML = score + "/" + total;

    differencesFound = 0;
    differencePlayerFound = ["", ""]
    
    var image = new Image();
    image.src = tempo[differencesCount].imageURL;

    var originalImage = new Image();
    originalImage.src = tempo[differencesCount].original;

    //correct image
    var image2 = new Image();
    image2.src = './img/correct.png';

    originalImage.onload = function ()
    {

        ctx2.clearRect( 0, 0, window.innerWidth,
            window.innerHeight);

        ctx2.drawImage(originalImage, 0, 0, tempo[differencesCount].width,
            tempo[differencesCount].height);

        canvas2.onclick = function (e)
        {

            const mousePos = getMousePos(canvas2, e);

            for(let i = 0; i < tempo[differencesCount].images.length; i++)
            {
                console.log(i);


                //To see all differenet
                /*ctx2.drawImage(image2, differences[differencesCount].images[i].image1.x, differences[differencesCount].images[i].image1.y,
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

                    ctx2.drawImage(image2, tempo[differencesCount].images[i].image1.x, tempo[differencesCount].images[i].image1.y,
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
                    
                    ctx2.drawImage(image2, tempo[differencesCount].images[i].image1.x, tempo[differencesCount].images[i].image1.y,
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
        endGame();
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

function playClickSound(){
    console.log(clickSound)
    clickSound.currentTime = 0
    clickSound.play()
}

function endGame(){
    finalPage.classList.remove("hide")

    let pass = total / 2

    //this is for first version
    if(score < pass){
        lose.currentTime = 0
        lose.play()
        medal.classList.add("hidden")
        scoreText.textContent = "You tried!"
        words1.innerHTML = "Good try!"
        words2.textContent = "do better next time"
    }
    else{
        clap.currentTime = 0
        clap.play() 
        medal.classList.remove("hidden")
        scoreText.textContent = "You win!"
        words1.innerHTML = `Good job!`
        words2.textContent = "you did it!"
        setTimeout(function(){
            confetti.start()
            setTimeout(function(){
                confetti.stop()
            }, 2000)
        }, 500)
    }

}

/*prevent double tag zoom*/
document.addEventListener('dblclick', function(event) {
    event.preventDefault();
    }, { passive: false });