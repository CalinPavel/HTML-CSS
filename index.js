const valueForOneLiter = 20;
var stopped = 0;

const motorcycleKmps = 1.5;
const carKmps = 2;
const truckKmps = 0.9;


class Vehicle {
    constructor(maxSpeed, tankCapacity, litersPerSecond, kmPerSecond, money) {
        this.currentSpeed = 0;
        this.maxSpeed = maxSpeed;
        this.tank = tankCapacity;
        this.lps = litersPerSecond;
        this.kmps = kmPerSecond;
        this.gasConsumed = 0;
        this.kmDrove = 0;
        this.expenses = 0;
        this.money = money;
        this.done = false;
    }

    drive() {
        if (((this.gasConsumed % this.tank) + this.lps) < this.tank) {
            this.gasConsumed += this.lps;
            this.kmDrove += this.kmps;
        }
        else {
            if (this.done == false)
                this.putGas();
            else
                return;
        }

        if (this.currentSpeed < this.maxSpeed)
            this.currentSpeed++;

        console.log(this.constructor.name + JSON.stringify(this));

    }

    putGas() {
        if (this.money >= (valueForOneLiter * this.tank)) {
            console.log("--- fill full gas tank ---")
            this.pay();
            this.gasConsumed += this.lps;
        }
        else {
            if (this.money > 0) {
                console.log("--- fill gas tank partially ---")
                this.expenses += this.money;
                this.gasConsumed += this.lps;
                this.money = 0;
            }
            else {
                if (this.money == 0) {
                    this.done = true;
                    alert(this.constructor.name + " has stopped!")
                    return;
                }
            }
        }

    }

    pay() {
        this.expenses += valueForOneLiter * this.tank;
        this.money -= valueForOneLiter * this.tank;
    }
}

class Motorcycle extends Vehicle {
    constructor() {
        super(120, 30, 0.3, motorcycleKmps, 900);
    }
}

class Car extends Vehicle {
    constructor() {
        super(200, 50, 0.5, carKmps, 30);
    }
}

class Truck extends Vehicle {
    constructor() {
        super(100, 100, 1, truckKmps, 200);
    }
}

const motorcycle = new Motorcycle();
const car = new Car();
const truck = new Truck();

var refresh = setInterval(() => {

    motorcycle.drive();
    car.drive();
    truck.drive();


    if (motorcycle.isDone && car.isDone && truck.isDone)
        clearInterval(refresh);

}, 10);
