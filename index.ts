#! /usr/bin/env node

import inquirer from 'inquirer';

//--------------------------- games variable -----------------------------

let enemies = ['Skeleton', 'Zombie', 'Warrior', 'Assassin']
let maxEnemyHealth = 75
let enemyAttackDamageToHero = 25

//-------------------------- player variable -----------------------------

let heroHealth = 100
let attackDamageToEnemy = 50
let numHealthPotion = 3
let healthPotionHealAmount = 30
let healthPotionDropChance = 50

//-------------------------- While loop condition -----------------------------

let gameRunning = true

console.log("Welcome to DeadZone!");

Game:
while (gameRunning) {
    let enemyHealth = Math.floor(Math.random() * maxEnemyHealth + 1)
    let enamyIndex = Math.floor(Math.random() * enemies.length)
    let enemy = enemies[enamyIndex]

    console.log(`# ${enemy} has appeard #\n`);
    
    while (enemyHealth > 0){
        console.log(`Your Health: ${heroHealth}`);
        console.log(`${enemy} Health: ${enemyHealth}`);
        
        let options = await inquirer.prompt({
            name: 'ans',
            type: 'list',
            message: 'What would you like to do?',
            choices: ["1. Attack", "2. Take Health potion", "3. Run"]
        })

        if(options.ans === "1. Attack"){
            let attackDamageToEnemy = 50
            let damageToEnemy = Math.floor(Math.random() * attackDamageToEnemy + 1)
            let damageToHero = Math.floor(Math.random() * enemyAttackDamageToHero + 1)

            enemyHealth -= damageToEnemy
            heroHealth -= damageToHero

            console.log(`you strick the ${enemy} for ${damageToEnemy}`);
            console.log(`${enemy} strick you for ${damageToHero} damage`);
            
            if(heroHealth < 1){
                console.log("You have taken too much damage. you are too weak to continue.");
                break;
            }

        }

        else if(options.ans === "2. Take Health potion"){
            if(numHealthPotion > 0){
                heroHealth += healthPotionHealAmount
                numHealthPotion--

                console.log(`you use health potion for ${healthPotionHealAmount}`);
                console.log(`you now have ${heroHealth} health`);
                console.log(`you have ${numHealthPotion} health potion left.`);
            }else{
                console.log(`you have no health potion left. defeat enemy for a chacne get health potion`);
            }
        }
        else if(options.ans === "3. Run"){
            console.log(`you run away from ${enemy}`);
            continue Game;
        }
    }
    if (heroHealth < 1){
        console.log(`you are out from battle. you are too weak.`);
        break;
    }

    console.log(`${enemy} was defeated!`);
    console.log(`you have ${heroHealth} health.`);
    
    let randomNumber = Math.floor(Math.random() * 100 + 1)
    if(randomNumber < healthPotionDropChance){
        numHealthPotion++

        console.log(`enemy give you health potion`);
        console.log(`your health is ${heroHealth}`);
        console.log(`your health potion is ${numHealthPotion}`);
    }

    let userOption = await inquirer.prompt({
        name: "ans",
        type: "list",
        message: "What do you like to do now?",
        choices: ["1. Continue", "2. Exit"]
    })

    if(userOption.ans === "1. Continue"){
        console.log("You are continue on your adventure");
        
    }else{
        console.log("you successfuly Exit from DeadZone");
        break;
    }

    console.log("Thank you for playing.\n");
    
}
