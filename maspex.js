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
var timer = 60;
var classes = ["egg1","egg2","egg3","egg4","egg5","rock1","rock2","egg3","rock3","heart","time","egg1"];

function countdown(){	
		var startDate = Date.now();
		var endDate = startDate  + 10000 //60000;
		var timer1 = parseInt(( endDate - startDate ) /  1000);
		timer = 20; //60;
		let counter = setInterval(function(){
				                if(timer > 0) { timer --;
												document.getElementById("time").innerHTML = timer;
												}	             
											else   { document.getElementById("time").innerHTML = 0;
													 clearInterval(runGame); 
													 endGame();
												     clearInterval(counter);
												}	
        } , 1000 );	
    
};

function keyDownHandler(e) {   // event handler 1  // check event listener call times;
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
        basketX += 10; // moving problem
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
        return true;
    }
    else {      return false;}
}

function spawn(){
	let x = Math.floor(Math.random() * 12)   //  x will be the random index in the array holding the falling elements type - eggs, rocks and life 
	let type = classes[x];
    let newElement = document.createElement("div");
    let newElementX;
    newElement.className = "fallingElement"; 
	newElement.style.backgroundImage = "url(" + type + ".png)";
    newElement.style.left = Math.floor(Math.random()* container.offsetWidth - newElement.offsetWidth + 1) + "px";
    newElement.style.transition = "transform " + 3500 + "ms linear"; // 3500 -> transition time -> variable
    container.appendChild(newElement);
    setTimeout(function(){  newElement.classList.add ( "move" ) ;  // add transform to the transition -> perform falling
                            setTimeout(function(){  if( intersection(newElement, basket ) ) { // check which element is intersecting with the basket
																				           if( /egg/.test(type) ) {
																					                              		scorePoints++; 
																								                        document.getElementById("score").innerHTML = scorePoints;
																								                        $(newElement).remove();   
																								                  }                                     
                                                                                           else if ( /rock/.test(type) ){
                                                                                                                          lifePoints--;
                                                                                                                          document.getElementById("lifes").innerHTML = lifePoints;
                                                                                                                          $(newElement).remove();  
                                                                                                                }
                                                                                           else if ( /heart/.test(type) ){
                                                                                                                             lifePoints++;
                                                                                                                             document.getElementById("lifes").innerHTML = lifePoints;
                                                                                                                             $(newElement).remove(); 
                                                                                                                }
                                                                                           else if ( /time/.test(type) ){
                                                                                                                             timer += 5;
                                                                                                                             document.getElementById("time").innerHTML = timer;
                                                                                                                             $(newElement).remove(); 
                                                                                                                }

															                        	};
                                                if( lifePoints == 0 ) {
                                                                        clearInterval(runGame); 
                                                                        endGame();
                                                                        clearInterval(counter);
														                      }                
                                         },3220); // the moment of the evaluation of the falling element's coord;
                     }, 1000 );      
    // considering full distance 650 px, and 600px meeting point with basket -> time elapsed till the meeting point would be 92,59% of the full time of the transition ( or 100/(d1/d2) if we change distances ) ; 
   $(newElement).one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function(event) { 
                    $(this).remove();
                    }); // function removing falling element after transition end;   


}


function endGame(){
	 document.getElementById("finalScore").innerHTML = scorePoints;
	 $('#gameContainer').addClass("start");
	 $('#ending').removeClass("start"); 
}

$('#initialize').click(function() {
    $('#instructions').addClass("start");
    $('#gameContainer').removeClass("start"); 
    document.addEventListener("keydown",keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);  
    $('#score').html(scorePoints);
    $('#lifes').html(lifePoints);
    countdown(); 
    runGame = setInterval( function(){   // set the eggs falling at 1 second
                                      for (i = 0; i < 1; i++) { 
                                      spawn();
                                    }
                        }, 1000);
 });   // check why loop is needed;


 $('#restart').click( function(){
			window.location.reload();
});
 