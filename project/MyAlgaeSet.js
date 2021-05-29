import { CGFobject } from '../lib/CGF.js';
import {MyAlgae} from "./MyAlgae.js";

export class MyAlgaeSet extends CGFobject {
	constructor(scene, numOfAlgaeSets, nest) {
		super(scene);
        this.algae = [];
        this.nest = nest;
        var randomX;
        var randomZ;
        for(var i = 0; i < numOfAlgaeSets; i++){
            randomX = Math.random() * 40 - 20;
            randomZ = Math.random() * 40 - 20;
            this.algae.push(new MyAlgae(this.scene, Math.random() * 5 + 3 ,[randomX, 1, randomZ] ));
        }
        
	}
	
    display(){
        
        for(var i = 0; i < this.algae.length; i++){
            this.algae[i].display();
        }
        
    }
}