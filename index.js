let creatures = [];
class Human {
    constructor(name) {
        this.alive = true;
        this.name = name;
        this.location = randomNum(0,1000);
        this.health = randomNum(0,10);
    }
}

class Accountant extends Human {
    constructor(name) {
        super(name);
        this.alive = false;
        this.employees = [];
    }

    interview(applicant) {
        if (applicant.alive) {
            this.employees.push(applicant);
        }
    }
}

class Zombie extends Accountant {
    constructor(name) {
        super(name);
    }

    chase(allCreatures) {
        console.log(`This zombie is located at`, this.location)

        let closest = Infinity;
        let foodToEat;

        for (let creature of allCreatures) {
            
            let distance = Math.abs(this.location - creature.location);
            if (distance < closest && distance !== 0) {
                closest = distance;
                foodToEat = creature;
            }
        }
        console.log(`Zombie ${this.name} located at ${this.location} has eaten ${foodToEat.name} cause they were too close at ${foodToEat.location}`);
        foodToEat.poisoned = true;
        setTimeout(() => {
            if (foodToEat.poisoned) {
                let newZombie = new Zombie(foodToEat.name);
                newZombie = {...newZombie, alive: false};
                creatures.push(newZombie);
            }
        }, 30000);
    
    }

    eat(food) {
        console.log(`${this.name} is eating ${food}`);
    }
}

class ZombieHunter extends Human {
    constructor(name) {
        super(name);
        this.invisible = true;
        this.defenses = ['🛡️','🪖'];
        this.weapons = [new Weapon('⚔️'),new Weapon('🪓'),new Weapon('🔥')]
    }
}

class Werewolf extends Human {
    constructor(name) {
        super(name);
    }

    eat(food) {
        if (food.constructor.name === 'ZombieHunter') {
            food.alive = false;
        } else if (food.constructor.name === 'Zombie') {
            food.doesNotExist = true;
            setTimeout(() => {
                this.poisoned = true;
            }, 25000);
        }
    }
}

class Weapon {
    constructor(emoji) {
        this.strength = randomNum(1,10);
        this.emoji = emoji;
    }

    blowUp() {
        console.log('Self destructing');
    }

    break() {
        this.broken = true;
        this.amountToFix = this.strength;
        this.payToFix = () => {
            this.broken = false;
        }
    }
}

class Poison extends Weapon {
    constructor() {
        super();
    }
}

let a = new Zombie('Andres');
let z = new Zombie('Z');
let d = new Zombie('Dylan');
let al = new ZombieHunter('Alexis');
let v = new Werewolf('Vince');
let da = new Accountant('Darcy');
let b = new Accountant('Beck');
let i = new Werewolf('Ian');
let j = new Accountant('Jonathan');

creatures.push(a,z,d,al,v,da,b,i,j);

//Zombie Hunters

//Wearwolves

//Accountantz








function randomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}