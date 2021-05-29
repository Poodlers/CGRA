import {MyMovingObject} from './MyMovingObject.js';
import { MyRock } from './MyRock.js';

export class MyMovingFish extends MyMovingObject{
    constructor(scene, fish, rotationAngle, speed, speedFactor, position, nest, seaFloorY) {
        super(scene,fish, rotationAngle, speed,speedFactor,position);
        this.verticalspeed = 0;
        this.hasRock = false;
        this.seaFloorY = seaFloorY;
        this.nest = nest;
        this.rockPosition = [0,0,0];
        this.rock = null;
        this.initBuffers();
    }

    moveVertically(val){
        this.verticalspeed += val;
        if(this.verticalspeed > 0.05) this.verticalspeed = 0.05;
        else if(this.verticalspeed < -0.05) this.verticalspeed = -0.05;
    }

    update(){
        if(this.position[1] >= 10 && this.verticalspeed > 0){
            this.position[1] = 10;
            this.verticalspeed = 0;
        }
        if(this.position[1] <= this.seaFloorY && this.verticalspeed < 0){
            this.position[1] = this.seaFloorY;
            this.verticalspeed = 0;
        }
        this.position[1] += this.verticalspeed;
    
        super.update();
    }

    getDistanceBetweenPoints(point1, point2){
        return Math.sqrt(Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2) + Math.pow(point1[2] - point2[2], 2));
    }

    pickUpInteraction(myRockSet){
        if(!this.hasRock){
            if(this.position[1] > this.seaFloorY){
                return;
            }
            //check if he is close to a rock
            for(var i = 0; i < myRockSet.rocks.length; i++ ){
                if(this.getDistanceBetweenPoints(this.position, myRockSet.rocks[i].position) < 2 && this.position[1] <= this.seaFloorY){
                    this.rock = myRockSet.rocks[i];
                    this.rockPosition = myRockSet.rocks[i].position;
                    myRockSet.rocks.splice(i,1);
                    this.hasRock = true;
                    this.rock.position = this.position;
                
                    break;
                }
            }
        }else{
            if(this.position[1] > this.seaFloorY){
                return;
            }
            //he has a rock lets check if hes close enough to the nest
            if(this.getDistanceBetweenPoints(this.position, this.nest.position) < this.nest.size + 2){
                this.hasRock = false;
                this.nest.addRock(this.rock);
                this.rock = null;
            }
        }
    }

    reset(myRockSet){
        this.verticalspeed = 0;
        super.reset();
        if(this.hasRock){
            this.hasRock = false;  
            this.rock.position = this.rockPosition;
            myRockSet.addRock(this.rock);
            this.rock = null;
        }
    }

    display(){
        super.display();
        if(this.rock != null){
            this.scene.pushMatrix();
            this.scene.translate(this.position[0] + Math.cos(this.rotationAngle - Math.PI / 2) * 0.5, this.position[1], this.position[2] - Math.sin(this.rotationAngle - Math.PI / 2) * 0.5);
            this.scene.rotate(this.rotationAngle, 0, 1, 0);
            this.scene.translate(-this.position[0], -this.position[1], -this.position[2]);
            this.rock.display();
            this.scene.popMatrix();
        }
        
    }
}