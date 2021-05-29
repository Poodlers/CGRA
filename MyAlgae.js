import { CGFobject, CGFappearance } from './lib/CGF.js';
import { MyPyramid } from "./MyPyramid.js";

export class MyAlgae extends CGFobject {
	constructor(scene, numOfAlgae, centerPos) {
		super(scene);
        this.pyramid = new MyPyramid(this.scene, 3, 1);
        this.algae =[];
        this.centerPos = centerPos;

        for(var i = 0; i < numOfAlgae; i++){
            var individualAlgae = [];
            individualAlgae.push(Math.random() * 0.8 + 0.2);
            individualAlgae.push(Math.random() * 0.8 + 0.5 + this.centerPos[0]);
            individualAlgae.push(this.centerPos[1]);
            individualAlgae.push(Math.random() * 0.8 + 0.5 + this.centerPos[2]);
            this.algaeRComponent = 0.1 + Math.random() * 0.4;
            this.algaeGComponent = 0.6 + Math.random() * 0.2;
            this.algaeBComponent = Math.random() * 0.1;
            individualAlgae.push(this.algaeRComponent);
            individualAlgae.push(this.algaeGComponent);
            individualAlgae.push(this.algaeBComponent);
            this.algae.push(individualAlgae);
        }
        
        this.initMaterials();
        
	}

    initMaterials(){
        this.algaeAppearance = new CGFappearance(this.scene);
    }
	
    display(){
        
        for(var i = 0; i < this.algae.length; i++){
            this.scene.pushMatrix();
            
            this.algaeAppearance.setAmbient(this.algae[i][4], this.algae[i][5], this.algae[i][6], 1);
            this.algaeAppearance.setDiffuse(this.algae[i][4], this.algae[i][5], this.algae[i][6], 1);
            this.algaeAppearance.setSpecular(0.0, 0.0, 0.0, 1);
            this.algaeAppearance.apply();
            this.scene.translate(this.algae[i][1], this.algae[i][2], this.algae[i][3]);
            this.scene.translate(0,  this.algae[i][0] / 4 - 0.9, 0);
            this.scene.scale(0.15, this.algae[i][0] + 0.5, 0.15);
            this.scene.rotate(- Math.PI/ 2, 1,0,0);
            this.pyramid.display();
            this.scene.popMatrix();
    
        }
    }
}