import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

export class MyCubeMap extends CGFobject {
	constructor(scene,textureBack, textureBottom, textureFront,textureLeft,textureRight, textureTop) {
		super(scene);
        this.quad = new MyQuad(this.scene);
        this.scalefactor = 500;
        this.textureBack = textureBack;
        this.textureBottom = textureBottom;
        this.textureFront = textureFront;
        this.textureLeft = textureLeft;
        this.textureRight = textureRight;
        this.textureTop = textureTop;
        this.initMaterials();
	}

    initMaterials(){
        this.materialTop = new CGFappearance(this.scene);
        this.materialTop.setAmbient(0, 0, 0, 1);
        this.materialTop.setDiffuse(0, 0, 0, 1);
        this.materialTop.setSpecular(0, 0, 0, 1);
        this.materialTop.setEmission(0.9,0.9,0.9,1);
        this.materialTop.setTexture(this.textureTop);
        this.materialTop.setTextureWrap('REPEAT', 'REPEAT');

        this.materialBack = new CGFappearance(this.scene);
        this.materialBack.setAmbient(0, 0, 0, 1);
        this.materialBack.setDiffuse(0, 0, 0, 1);
        this.materialBack.setSpecular(0, 0, 0, 1);
        this.materialBack.setEmission(0.9,0.9,0.9,1);
        this.materialBack.setTexture(this.textureBack);
        this.materialBack.setTextureWrap('REPEAT', 'REPEAT');
        
        this.materialBottom = new CGFappearance(this.scene);
        this.materialBottom.setAmbient(0, 0, 0, 1);
        this.materialBottom.setDiffuse(0, 0, 0, 1);
        this.materialBottom.setSpecular(0, 0, 0, 1);
        this.materialBottom.setEmission(0.9,0.9,0.9,1);
        this.materialBottom.setTexture(this.textureBottom);
        this.materialBottom.setTextureWrap('REPEAT', 'REPEAT');

        this.materialFront = new CGFappearance(this.scene);
        this.materialFront.setAmbient(0, 0, 0, 1);
        this.materialFront.setDiffuse(0, 0, 0, 1);
        this.materialFront.setSpecular(0, 0, 0, 1);
        this.materialFront.setEmission(0.9,0.9,0.9,1);
        this.materialFront.setTexture(this.textureFront);
        this.materialFront.setTextureWrap('REPEAT', 'REPEAT');
        
        this.materialLeft = new CGFappearance(this.scene);
        this.materialLeft.setAmbient(0, 0, 0, 1);
        this.materialLeft.setDiffuse(0, 0, 0, 1);
        this.materialLeft.setSpecular(0, 0, 0, 1);
        this.materialLeft.setEmission(0.9,0.9,0.9,1);
        this.materialLeft.setTexture(this.textureLeft);
        this.materialLeft.setTextureWrap('REPEAT', 'REPEAT');

        this.materialRight = new CGFappearance(this.scene);
        this.materialRight.setAmbient(0, 0, 0, 1);
        this.materialRight.setDiffuse(0, 0, 0, 1);
        this.materialRight.setSpecular(0, 0, 0, 1);
        this.materialRight.setEmission(0.9,0.9,0.9,1);
        this.materialRight.setTexture(this.textureRight);
        this.materialRight.setTextureWrap('REPEAT', 'REPEAT');
    }

    updateTextures(textures){
        this.textureBack = textures[0];
        this.textureBottom = textures[1];
        this.textureFront = textures[2];
        this.textureLeft = textures[3];
        this.textureRight = textures[4];
        this.textureTop = textures[5];
        this.initMaterials();
    }

    display(){

        
        this.scene.pushMatrix();
        this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], -0.5 * this.scalefactor + this.scene.camera.position[2]);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.scale(this.scalefactor, this.scalefactor, this.scalefactor);
        this.materialFront.apply();
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5 * this.scalefactor + this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);
        this.scene.scale(this.scalefactor, this.scalefactor, this.scalefactor);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.materialRight.apply();
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5 * this.scalefactor + this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.scale(this.scalefactor, this.scalefactor, this.scalefactor);
        this.materialLeft.apply();
        this.quad.display();
        this.scene.popMatrix();
        
        
        this.scene.pushMatrix();
        this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], 0.5 * this.scalefactor + this.scene.camera.position[2]);
        this.scene.scale(this.scalefactor, this.scalefactor, this.scalefactor);
        this.materialBack.apply();
        this.quad.display();
        this.scene.popMatrix();
        
        
        this.scene.pushMatrix();
        this.scene.translate(this.scene.camera.position[0], -0.5 * this.scalefactor + this.scene.camera.position[1], this.scene.camera.position[2]);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(this.scalefactor, this.scalefactor, this.scalefactor);
        this.materialBottom.apply();
        this.quad.display();
        this.scene.popMatrix();
        
        
        this.scene.pushMatrix();
        this.scene.translate(this.scene.camera.position[0], 0.5 * this.scalefactor + this.scene.camera.position[1], this.scene.camera.position[2]);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.rotate(- Math.PI / 2, 1, 0, 0);
        this.scene.scale(this.scalefactor, this.scalefactor, this.scalefactor);
        this.materialTop.apply();
        this.quad.display();
        this.scene.popMatrix();
        
    

    }
}
