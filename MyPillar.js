import { CGFobject, CGFappearance, CGFtexture } from './lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';

/**
 * MySeaFloor
 * @constructor
 * @param scene - Reference to MySeaFloor object
 */
export class MyPillar extends CGFobject {
	constructor(scene, position) {
		super(scene);
		this.cylinder = new MyCylinder(this.scene,30,1,20,new CGFtexture(this.scene, "./images/trunk_tex.jpg"), [0.9,0.9,0.9]);
        this.position = position;
        
	}
	
    display(){
        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.cylinder.display();
        this.scene.popMatrix();
    }
}