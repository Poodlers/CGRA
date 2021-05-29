import { CGFobject, CGFtexture,CGFshader } from './lib/CGF.js';
import { MyPlane } from './MyPlane.js';

export class MySeaFloor extends CGFobject {
	constructor(scene, nrDivs, side, maxHeight) {
		super(scene);
		this.plane = new MyPlane(scene, nrDivs, 0, 1, 0, 1);
        this.maxHeight = maxHeight;
        this.side = side;
        this.initMaterials();
        this.initShader();
	}

    initMaterials(){
        this.texture = new CGFtexture(this.scene, "./images/sand.png");

        this.texture2 = new CGFtexture(this.scene, "./images/testBumpSand.png");
    }

    initShader(){
        
        this.sandShader = new CGFshader(this.scene.gl, "./shaders/sandShader.vert", "./shaders/sandShader.frag");
        this.sandShader.setUniformsValues({ uSampler: 0 });
        this.sandShader.setUniformsValues({ uSampler2: 1 });
        this.sandShader.setUniformsValues({ maxHeight: this.maxHeight });
    }
	
    display(){
        this.scene.pushMatrix();
        this.scene.setActiveShader(this.sandShader);
        this.texture.bind(0);
        this.texture2.bind(1);
        
        
        this.scene.scale(this.side, 1, this.side);
        this.scene.rotate(- Math.PI / 2, 1, 0, 0);
        this.plane.display();
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();
    }
}