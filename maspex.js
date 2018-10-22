var container = document.getElementById("container");
var basket = document.getElementById("basket");
var game = document.getElementById("gameContainer");
var right = false;
var left = false;
var basketX = (container.offsetWidth-basket.offsetWidth)/2; //basket position
var lifes = document.getElementById("lifes");
var score = document.getElementById("score");
var time = document.getElementById("time");
var lifePoints = 20; // starting lifes value;
var scorePoints = 0 ; //starting score
var runGame;
//var timer ;
var arrayOfClasses = ["greenEgg","redEgg","blueEgg","orangeEgg","purpleEgg","rockOne","rockTwo","rockThree","salatini"]

function countdown(){	
		var startDate = Date.now();
		var endDate = startDate  + 10000 //60000;
		var timer = parseInt(( endDate - startDate ) /  1000);
		setInterval(function(){
				if(timer > 1) { timer --;
								document.getElementById("time").innerHTML = timer;		}
	               else  {     document.getElementById("time").innerHTML = 0;
                                clearInterval(runGame); 
                         
                         }
        } , 1000 );	
    
};

function keyDownHandler(e) {   // event handler 1
        const key = e.key;
        if(e.keyCode == 39) {
            right = true;
        }
        else if(e.keyCode == 37) {
            left = true;
        }
     moveBasket();
};

function keyUpHandler(e) { // event handler 2
        if(e.keyCode == 39) {
            right = false;
        }
        else if(e.keyCode == 37) {
            left = false;
        }  
};

function moveBasket() {
    if(right && basketX <= container.offsetWidth-basket.offsetWidth ) {
        basketX += 10;
        basket.style.left = basketX + "px";
    }
    else if(left && basketX >= 0 ) {
        basketX -= 10;
        basket.style.left = basketX + "px";
    }  
};

function intersection(fallingElement, theBasket){ 
    let fallingElementCoord = fallingElement.getBoundingClientRect();
    let basketCoord = theBasket.getBoundingClientRect();
    if( fallingElementCoord.left  >= basketCoord.left + 20 && 
        fallingElementCoord.right <= basketCoord.right - 20) {
        console.log("da");
        return true;
    }
    else { console.log("nu");         return false;}
}

function spawn(theClass){
    let newElement = document.createElement("div");
    let newElementX;
    newElement.className = "redEgg"; //theClass; // "redEgg";
    newElement.style.left = Math.floor(Math.random()* container.offsetWidth - newElement.offsetWidth + 1 ) + "px";
    newElement.style.transition = "transform " + 3500 + "ms linear"; 
    container.appendChild(newElement);
    setTimeout(function(){  newElement.classList.add ( "move" ) ;  // add transform to the transition -> perform falling
                        //  setTimeout(function(){ newElementX = newElement.getBoundingClientRect().bottom   },3220); // check top coord to see if equal meeting point;
                         
                            setTimeout(function(){  if( intersection(newElement, basket ) ) {
                                                                scorePoints++; 
                                                                document.getElementById("score").innerHTML = scorePoints;
                                                                $(newElement).remove();                                         
                                                                };
                                                },3220);
                         }, 1000 );      
    // considering full distance 650 px, and 600px meeting point with basket -> time elapsed till the meeting point would be 92,59% of the full time of the transition ( or 100/(d1/d2) if we change distances ) ; 
   $(newElement).one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function(event) { 
                    $(this).remove();
                    }); // function removing falling element after transition end;   

};


$('#initialize').click(function() {
    $('#instructions').addClass("start");
    $('#gameContainer').removeClass("start"); 
    document.addEventListener("keydown",keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);  
    $('#score').html(scorePoints);
    $('#lifes').html(lifePoints);
    countdown(); // could use just a int and decresea by 1 every second;
    runGame = setInterval( function(){   // set the eggs falling at 1 second
                                      for (i = 0; i < 1; i++) { 
                                      spawn();
                                    }
                        }, 1000);
 }); 
