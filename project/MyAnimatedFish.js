import { CGFobject } from "../lib/CGF.js";
import { MyFish } from "./MyFish.js";

export class MyAnimatedFish extends CGFobject{
    constructor(scene, period, center, color, ratio, radius, clockWise) {
        super(scene);
        this.center = center;
        this.period = period;
        this.radius = radius;   
        this.fishPosition = [center[0] + this.radius, center[1], center[2]];
        this.fish = new MyFish(this.scene, this.fishPosition , [color[0], color[1], color[2], color[3]], ratio);
        this.angle = 0;
        this.angularSpeed = (2 * Math.PI) / period;
        this.lastUpdate = 0;
        this.clockWise = clockWise;
    }

    update(t){
        if (this.clockWise)
            this.angle += (t - this.lastUpdate)/1000 * this.angularSpeed;
        else 
            this.angle -= (t - this.lastUpdate)/1000 * this.angularSpeed;

        this.fishPosition[0] = (Math.cos(this.angle) * this.radius) + this.center[0]; // x
        this.fishPosition[2] = (Math.sin(this.angle) * this.radius) + this.center[2]; // z
        
        this.lastUpdate = t;
       
    }

    display(){
        this.scene.pushMatrix();

        this.scene.translate(this.fishPosition[0], this.fishPosition[1], this.fishPosition[2]);
        this.scene.rotate(-this.angle, 0, 1, 0);
        if (!this.clockWise) this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.translate(- this.fishPosition[0], - this.fishPosition[1], - this.fishPosition[2]);

        this.fish.display();
        this.scene.popMatrix();
    }

}