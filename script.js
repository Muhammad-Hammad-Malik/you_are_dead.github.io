var gunshot=new Audio("bang.wav");
var shot= new Audio("phew.mp3");
var music=new Audio("bg.mp3");
music.loop=true;
music.volume=0.1;
shot.voulme=0.8;
var dead=new Audio("dead.mp3");
function newgame()
{
	randomEnemyAttacks();
	document.querySelector("button").style.display= "none";
	music.play();
}
var healthPoints = 100;

function updateHealthPoints(points) {

	healthPoints = points;
	var healthBar = document.querySelector("#healthBar");
	healthBar.style.width = points + "%";

	if(healthPoints < 1) {
		alert("Game over!");
		window.location.reload();
	}

}


function livingEnemies() {
	return document.querySelectorAll(".enemy:not(.dead)");
}


function iShoot(enemy) {
	enemy.classList.add("dead");
	dead.play();

	if(!livingEnemies().length) {
		alert("You win!");
		window.location.reload();
	}

}


function enemyAttacksMe(enemy) {

	if(healthPoints > 0) {

		enemy.classList.add("showing");

		setTimeout(()=> {
			enemyShootsMe(enemy);
		}, 1000);

		setTimeout(()=> {
			enemy.classList.remove("showing");
		}, 3000);
		
	}


}


function enemyShootsMe(enemy) {

	if(!enemy.classList.contains("dead")) {
		shot.play();

		enemy.classList.add("shooting");
		updateHealthPoints(healthPoints - 20);

		setTimeout(()=> {
			enemy.classList.remove("shooting");
		}, 200);

	}

}


function randomEnemyAttacks() {

	var randomEnemyNo = Math.random() * livingEnemies().length;
	randomEnemyNo = Math.floor(randomEnemyNo);
	var enemy = livingEnemies()[randomEnemyNo];

	var randomDelay = Math.random() * 2000 + 1000;

	setTimeout( ()=> {
		enemyAttacksMe(enemy);
		randomEnemyAttacks();
	}, randomDelay);

}