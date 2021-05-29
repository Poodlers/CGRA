import { CGFobject } from './lib/CGF.js';
import {MyRock} from "./MyRock.js";

/**
 * MySeaFloor
 * @constructor
 * @param scene - Reference to MySeaFloor object
 */
export class MyRockSet extends CGFobject {
	constructor(scene, numOfRocks, nest, seaFloorY, seaFloorSize) {
		super(scene);
        this.rocks = [];
        this.rockSize = 3;
        this.nest = nest;
        this.seaFloorY = seaFloorY;
        this.seaFloorSize = seaFloorSize;
        var randomX;
        var randomZ;
        
        for(var i = 0; i < numOfRocks; i++){
            randomX = Math.random() * (this.seaFloorSize - 15) - (this.seaFloorSize/ 2);
            randomZ = Math.random() * (this.seaFloorSize - 15) - (this.seaFloorSize/ 2);
            var positionRock = [randomX, this.seaFloorY - 0.8, randomZ];
        
            var rock = new MyRock(this.scene,16,8, positionRock);
            this.rocks.push(rock);

                /*
                
                this piece of code here is checking to see if the new rock is colliding
                with one of the rocks that are already in the scene, if so, it must recalculate its position

                
                //check if this rock is not overlapping with the nest
                if(randomX > this.nest.position[0] - this.nest.size && randomX < this.nest.position[0] + this.nest.size  ){
                    //their X's overlap, if their y's overlap as well, this position is invalid
                    if(randomZ > this.nest.position[2] - this.nest.size || randomZ < this.nest.position[2] + this.nest.size  ){
                        //their Y's also overlap, so its invalid
                        validPos = false;
                    }
                }

                if(!validPos) continue;
                for(var c = 0; c < i; c++){
                    if(randomX > this.rocks[c].position[0] - this.rockSize && randomX < this.rocks[c].position[0] + this.rockSize  ){
                        //their X's overlap, if their y's overlap as well, this position is invalid
                        if(randomZ > this.rocks[c].position[2] - this.rockSize || randomZ < this.rocks[c].position[2] + this.rockSize  ){
                            //their Y's also overlap, so its invalid
                            validPos = false;
                        }
                    }
                }
                
                */

            }

    }

        

    addRock(rock){
        this.rocks.push(rock);
      
    }
	
    display(){
        for(var i = 0; i < this.rocks.length; i++){
            this.rocks[i].display();
    
        }
        
    }
}