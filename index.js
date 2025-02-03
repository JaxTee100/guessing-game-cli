#!/usr/bin/env node

const readline = require('readline');

// Create a readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


let totalAttempts;
let attempts = 0;
let MAX_NUM=100
let MIN_NUM=1
let TARGET_NUMBER;


const DIFFICULTY_LEVELS = {
    easy: {maxAttempts: 10, message: "You selected easy mode and you have 10 trials"},
    medium: {maxAttempts: 7, message: "You selected medium mode and you have 7 trials"},
    hard: {maxAttempts: 5, message: "You selected hard mode and you have 5 trials"},

}
//welcome note and instructions
const welcomeInstruction = () =>{
    console.log(`Welcome to my Number guessing game!`)
    console.log(`I'm thinking of a number between 1 and 100`)
    console.log(`\nChoose your difficulty level`);

    for(const [key, value] of Object.entries(DIFFICULTY_LEVELS)){
        console.log(`${key}: You have ${value.maxAttempts} attempts`)
    }


}
//selectt a level
const chooseLevel = () => {
    rl.question("Enter your choice (easy, medium, hard): ", (choice) => {
        const difficulty = choice.toLocaleLowerCase();
        if(DIFFICULTY_LEVELS[difficulty]){
            totalAttempts = DIFFICULTY_LEVELS[difficulty].maxAttempts;
            TARGET_NUMBER = Math.floor(Math.random() * (MAX_NUM - MIN_NUM + 1)) + MIN_NUM;
            console.log(`${DIFFICULTY_LEVELS[difficulty].message} `);
            playGame();
            
        }else{
            console.log(`Invalid level indicated`);
            chooseLevel()
        }
    })
}
//the logic for the quessing game
const playGame = () =>{
    rl.question("Enter your guess: ", (input) =>{
        const guess = parseInt(input)
        if(isNaN(guess) || guess > MAX_NUM || guess < MIN_NUM){
            console.log(`enter a valid number between 1 and 100`);
            return playGame();
        }
        attempts++
        if(TARGET_NUMBER === guess){
            console.log(`Congratulations, you won!`);
            rl.close()
        }else if(attempts >= totalAttempts){
            console.log(`max number of attempts reached, you lose`);
            rl.close()
        }else if(guess > TARGET_NUMBER){
            console.log(`The number is too high, You have ${totalAttempts - attempts} attempts remaining.\n`);
            playGame();
        }else if(guess < TARGET_NUMBER){
            console.log(`it's too low, You have ${totalAttempts - attempts} attempts remaining.\n`);
            playGame()
        }
    })
}
welcomeInstruction();
chooseLevel()
// Handle the game exit
rl.on('close', () => {
  console.log('Thanks for playing! Goodbye! 👋');
  process.exit(0);
});