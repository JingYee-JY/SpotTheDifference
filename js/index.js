const canvas = document.getElementById("play_area");

const ctx = canvas.getContext('2d');

window.onload = init;

  function init(){
    // the code to be called when the dom has loaded
    // #document has its nodes
    const startButton = document.getElementById("start_button");
    const startScreen = document.getElementById("main_screen");
    const againButton = document.getElementById("again_button");
    const resultScreen = document.getElementById("result_screen");
    const homeButton = document.getElementById("home_button");
    
    startButton.addEventListener("click", function (){
        startScreen.classList.add("hide");
    })
    againButton.addEventListener("click", function (){
        resultScreen.classList.add("hide")
        questionCount = 1;
        console.log(questionCount)
        reset();
    })
    homeButton.addEventListener("click", function(){
        location.assign('https://gimme.sg/activations/dementia/');
    })
  }

  var tempo = [];
const differences = [

    // WATCH
    {image1: {x: 220, y: 140, radius: 50},
        image2: {x: 220, y: 445, radius: 50},
        width: 220, height: 750, imageURL: "css/images/Objects/Image2.png"},
    
    // PLANT
    {image1: {x: 220, y: 250, radius: 50},
        image2: {x: 220, y: 550, radius: 50},
        width: 220, height: 600, imageURL: "css/images/Objects/Image1.png"},

    // BOOK
    {image1: {x: 230, y: 80, radius: 50},
        image2: {x: 230, y: 380, radius: 50},
        width: 220, height: 650, imageURL: "css/images/Objects/Image3.png"},

    // TEA
    {image1: {x: 170, y: 120, radius: 50},
        image2: {x: 170, y: 420, radius: 50},
        width: 250, height: 600, imageURL: "css/images/Objects/Image4.png"},

    // Dress
    {image1: {x: 220, y: 125, radius: 50},
        image2: {x: 220, y: 425, radius: 50},
        width: 200, height: 600, imageURL: "css/images/Objects/Image5.png"},
    
    // WATCH
    {image1: {x: 220, y: 215, radius: 50},
        image2: {x: 220, y: 515, radius: 50},
        width: 220, height: 600, imageURL: "css/images/Objects/Image7.png"},
    
    // PLANT
    {image1: {x: 245, y: 205, radius: 50},
        image2: {x: 245, y: 505, radius: 50},
        width: 220, height: 600, imageURL: "css/images/Objects/Image6.png"},

    // BOOK
    {image1: {x: 300, y: 100, radius: 50},
        image2: {x: 300, y: 400, radius: 50},
        width: 220, height: 650, imageURL: "css/images/Objects/Image8.png"},

    // TEA
    {image1: {x: 250, y: 165, radius: 50},
        image2: {x: 250, y: 465, radius: 50},
        width: 250, height: 600, imageURL: "css/images/Objects/Image9.png"},

    // Dress
    {image1: {x: 300, y: 50, radius: 50},
        image2: {x: 300, y: 350, radius: 50},
        width: 200, height: 600, imageURL: "css/images/Objects/Image10.png"}
];

let differencesCount = 0;


randomizeObjects();
loadImage();

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
    var tempoQuestion  = differencesCount + 1;
    document.getElementById("question").textContent = tempoQuestion + "/5";
    var image = new Image();
    image.src = tempo[differencesCount].imageURL;
    
    image.onload = function ()
    {

        ctx.clearRect( 0, 0, window.innerWidth,
            window.innerHeight);

        ctx.drawImage(image, 120, 0, tempo[differencesCount].width,
            tempo[differencesCount].height);

        canvas.onclick = function (e)
        {

            const mousePos = getMousePos(canvas, e);




            /*ctx.beginPath();
            ctx.arc(differences[differencesCount].image1.x, differences[differencesCount].image1.y,
                differences[differencesCount].image1.radius, 0, 2 * Math.PI, false);
            ctx.strokeStyle = "black";
            ctx.lineWidth = 5;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(differences[differencesCount].image2.x, differences[differencesCount].image2.y,
                differences[differencesCount].image2.radius, 0, 2 * Math.PI, false);
            ctx.strokeStyle = "black";
            ctx.lineWidth = 5;
            ctx.stroke();*/


            if(isIntersect(mousePos, tempo[differencesCount].image1) ||
                isIntersect(mousePos, tempo[differencesCount].image2))
            {
                console.log("correct!")

                ctx.beginPath();
                ctx.arc(tempo[differencesCount].image1.x, tempo[differencesCount].image1.y,
                    tempo[differencesCount].image1.radius, 0, 2 * Math.PI, false);
                ctx.strokeStyle = "black";
                ctx.lineWidth = 5;
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(tempo[differencesCount].image2.x, tempo[differencesCount].image2.y,
                    tempo[differencesCount].image2.radius, 0, 2 * Math.PI, false);
                ctx.strokeStyle = "black";
                ctx.lineWidth = 5;
                ctx.stroke();

                onCorrect();

            }

    
        };
    }



    
    
    
 
}


function onCorrect()
{
    
    if(differencesCount < tempo.length - 1)
    {
        differencesCount++;
        console.log(differencesCount + " COUNT")
        console.log(differences.length  + " LEN")

        var delayInMilliseconds = 1000; //1 second

        setTimeout(function() {
            if(differencesCount > 4){
                console.log("win");
                document.getElementById("result_screen").classList.remove("hide");
            }
            else{
                loadImage();
            }

        }, delayInMilliseconds);
    }
    else
    {
        console.log("end")
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
    
function randomizeObjects()
{
    tempo = [];
    for(let i=0; i < differences.length; i++){
        tempo.push(differences[i]);
    }

    for(let i = tempo.length - 1; i > 0; i--)
    {
        var randomIndex = Math.floor(Math.random() * i);
        
        var lastIndex = tempo[i];


        tempo[i] = tempo[randomIndex];
        tempo[randomIndex] = lastIndex;
        
    }
    
    console.log(tempo);


    

}

function reset(){
    differencesCount = 0;
    randomizeObjects();
    loadImage();
}