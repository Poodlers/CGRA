import {CGFobject, CGFappearance, CGFshader, CGFtexture} from '../lib/CGF.js';
import { MySphere } from './MySphere.js';
import {MyTriangle} from "./MyTriangle.js";

/**
 * MyFish
 * @constructor
 * @param scene - Reference to MyFish object
 */
export class MyFish extends CGFobject {
	constructor(scene, position, fishColor, ratio) {
		super(scene);
        this.sphere = new MySphere(this.scene, 16, 8);
        this.triangle = new MyTriangle(this.scene);
        this.position = position;
        this.fishColor = fishColor;
        this.barbatanaLeftAngle = 0;
        this.barbatanaRightAngle = 0;
        this.caudaAngle = 0;
        this.ratio = ratio;
    
        this.initMaterials();
        this.initShaders();
	}
    initShaders(){
        this.bodyShader = new CGFshader(this.scene.gl, "shaders/fishBody.vert", "shaders/fishBody.frag");
        this.bodyShader.setUniformsValues({color: this.fishColor, ratio: this.ratio});
        this.finShader = new CGFshader(this.scene.gl, "shaders/fishFin.vert", "shaders/fishFin.frag");
        this.finShader.setUniformsValues({color: this.fishColor});
    
    }

    animate(t, fishSpeed, rotateLeft, rotateRight){
        if(rotateLeft) this.barbatanaLeftAngle = Math.sin( (t/ 150) ) * 0.4;
        
        if(rotateRight) this.barbatanaRightAngle = Math.sin( (t/ 150) ) * 0.4;
        
        this.caudaAngle = Math.sin( (t/ (250 - fishSpeed * 2)) ) * 0.4;

    }

    initMaterials(){
        this.color = new CGFappearance(this.scene);
        this.color.setAmbient(this.fishColor[0] * 0.3, this.fishColor[1] * 0.3, this.fishColor[2] * 0.3, this.fishColor[3]);
        this.color.setDiffuse(this.fishColor[0] * 0.7, this.fishColor[1] * 0.7, this.fishColor[2] * 0.7, this.fishColor[3]);
        this.color.setSpecular(0.0, 0.0, 0.0, 1.0);

        this.eyesTex = new CGFappearance(this.scene);
        this.eyesTex.setEmission(0.5,0.5,0.5,1.0);
        var eyesTex1 = new CGFtexture(this.scene, "./images/eyesTexture.png");
		this.eyesTex.setTexture(eyesTex1);
        
        this.appearance = new CGFappearance(this.scene);
		this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
        var texture = new CGFtexture(this.scene, "./images/fish_scales.jpg");
		this.appearance.setTexture(texture);
		
    }
   
    getPosition(){
        return this.position;
    }

    display(){
        
        //olhos

        this.eyesTex.apply();
        this.scene.pushMatrix();
        //this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.scene.pushMatrix();
        this.scene.translate(0.08,0.04,0.16);
        this.scene.scale(0.05,0.05,0.05);
        this.scene.rotate(Math.PI / 3, 0, 1, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.08,0.04,0.16);
        this.scene.scale(0.05,0.05,0.05);
        this.scene.rotate(- Math.PI / 3, 0, 1, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
       
        this.sphere.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();

    

        this.color.apply();

        //cauda
        this.appearance.apply();
        this.scene.setActiveShader(this.finShader);
        this.scene.translate(0, 0, -0.25)
        this.scene.scale(0.15, 0.15, 0.15);
        this.scene.rotate(this.caudaAngle, 0, 1, 0);
        this.scene.translate(0, 0, -1.4);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.rotate(-Math.PI/4, 0, 0, 1);
    
        this.triangle.display();
        this.scene.popMatrix();

        //barbatana direita
        
        this.scene.pushMatrix();
        this.scene.translate(-0.13, -0.07, 0.09);
        this.scene.rotate(-Math.PI / 8 + this.barbatanaRightAngle, 0, 0, 1);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(0.05, 0.05, 0.05);
        this.scene.translate(1, -1, 0);
        this.triangle.display();
        this.scene.popMatrix();


        //barbatana esquerda
        this.scene.pushMatrix();
        this.scene.translate(0.13, -0.07, 0.09);
        this.scene.rotate(Math.PI / 8 - this.barbatanaLeftAngle, 0, 0, 1);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(0.05, 0.05, 0.05);
        this.scene.translate(1, -1, 0);
        this.triangle.display();
        this.scene.popMatrix();

        //barbatana em cima da cabeça do homem
        this.scene.pushMatrix();
        this.scene.translate(0, 0.27, 0.015);
        this.scene.scale(0.1, 0.1, 0.1);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.triangle.display();
        this.scene.popMatrix();
        
        //corpo principal
        
        this.scene.pushMatrix();
        this.scene.scale(0.15,0.2,0.25);
        this.scene.rotate(- Math.PI / 2, 1, 0, 0);
        this.appearance.apply();
        this.scene.setActiveShader(this.bodyShader);
        this.sphere.display();
        this.scene.popMatrix();
        this.scene.popMatrix();
         
        //voltar ao shader default
        this.scene.setActiveShader(this.scene.defaultShader);
        
    }
}