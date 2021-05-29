import {CGFobject} from '../lib/CGF.js';
import {MyPyramid} from './MyPyramid.js';
/**
* MyPyramid
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyMovingObject extends CGFobject {
    constructor(scene, object, rotationAngle, speed, speedFactor, position) {
        super(scene);
        this.rotationAngle = rotationAngle;
        this.initialX = position[0];
        this.initialY = position[1];
        this.initialZ = position[2];
        this.speed = speed;
        this.speedFactor = speedFactor;
        this.position = position;
        this.object = object;
        this.initBuffers();
    }
    
    getSpeed(){
        return this.speed;
    }

    update(){
        this.position[0] += Math.sin(this.rotationAngle) * this.speed * this.speedFactor; // x
        this.position[2] += Math.cos(this.rotationAngle) * this.speed * this.speedFactor; // z
    }
    updateSpeedFactor(speedFactor){
        this.speedFactor = speedFactor;
    }
    turn(val){
        this.rotationAngle += 2.5 * val;
    }
    accelerate(val){
        this.speed += val;
    }
    reset(){
        
        this.position[0] = this.initialX;
        this.position[1] = this.initialY;
        this.position[2] = this.initialZ;
        this.speed = 0;
        this.rotationAngle = 0;
    }
    display(){
        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.scene.rotate(this.rotationAngle, 0, 1, 0);
        this.scene.translate(-this.position[0], -this.position[1], -this.position[2]);
        this.object.display();
        this.scene.popMatrix();
    
    }

}


