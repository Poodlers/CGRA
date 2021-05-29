import { CGFobject, CGFtexture,CGFshader } from '../lib/CGF.js';
import { MyPlane } from './MyPlane.js';

export class MyWaterSurface extends CGFobject {
	constructor(scene, nrDivs, side) {
		super(scene);
		this.plane = new MyPlane(scene, nrDivs, 0, 1, 0, 1);
        this.side = side;
        this.initMaterials();
        this.initShader();
	}

    initMaterials(){
        this.texture = new CGFtexture(this.scene, "./images/pier.jpg");

        this.texture2 = new CGFtexture(this.scene, "./images/distortionmap.png");
    }

    initShader(){
        
        this.waterShader = new CGFshader(this.scene.gl, "./shaders/waterShader.vert", "./shaders/waterShader.frag");
        this.waterShader.setUniformsValues({ uSampler: 0 });
        this.waterShader.setUniformsValues({ uSampler2: 1 });
        
    }

    update(t){
        this.waterShader.setUniformsValues({ timeFactor: t / 1000 % 100 });
    }

	
    display(){
        this.scene.pushMatrix();
        this.scene.setActiveShader(this.waterShader);
        this.texture.bind(0);
        this.texture2.bind(1);

        this.scene.translate(0,20,0);
        this.scene.scale(this.side, 1, this.side);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.plane.display();
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();
    }
}