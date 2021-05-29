import {CGFobject, CGFappearance} from './lib/CGF.js';
import { MyUnitCubeQuad } from './MyUnitCubeQuad.js';
import {MyCylinder} from "./MyCylinder.js";
import {MyCone} from "./MyCone.js";

export class MyNest extends CGFobject {
  
  constructor(scene, position, size) {
    super(scene);
    this.cylinder = new MyCylinder(this.scene,30,1,1,null, [0.5,0.4,0.3]);
    this.cube = new MyUnitCubeQuad(this.scene);
    this.size = size;
    this.cone = new MyCone(this.scene,30,1);
    this.position = position;
    this.rocks = [];
    this.initMaterials();
  }

initMaterials(){
    this.nestAppearance = new CGFappearance(this.scene);
    this.nestAppearance.setEmission(0.5, 0.4, 0.3, 1);
  
}

addRock(rock){
  
  rock.position = [ this.position[0] +( Math.random() * (this.size - 0.3) - (this.size/2 - 0.3)), this.position[1] + 0.1,
  this.position[2] + (Math.random() * (this.size - 0.3) - (this.size/2 - 0.3))];

  for(var c = this.rocks.length - 1; c >= 0; c--){
    if(rock.position[0] > this.rocks[c].position[0] - rock.rockSize && rock.position[0] < this.rocks[c].position[0] + rock.rockSize  ){
        //their X's overlap, if their y's overlap as well, this position is invalid
        if(rock.position[2] > this.rocks[c].position[2] - rock.rockSize || rock.position[2] < this.rocks[c].position[2] + rock.rockSize  ){
            //their Y's also overlap, so its invalid
            rock.position[0]= this.rocks[c].position[0];
            rock.position[2]= this.rocks[c].position[2];
            rock.position[1] = this.rocks[c].position[1] + rock.randomYScale + 0.05;
            break;
         }
      }
  }

  this.rocks.push(rock);
}



  display(){
      this.nestAppearance.apply();
      this.scene.pushMatrix();
      this.scene.translate(0 + this.position[0],1 + this.position[1],0 + this.position[2]);
      this.scene.scale(this.size,1, this.size);
      this.cube.display();

      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.translate(this.size/ 2 + this.position[0] ,0.5 + this.position[1],this.size/2 + this.position[2]);
      this.scene.scale(0.3,1,0.3);
      this.cylinder.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.translate(this.size/ 2 + this.position[0],1.5 + this.position[1],this.size/ 2 + this.position[2]);
      this.scene.scale(0.3,1,0.3);
      this.cone.display();
      this.scene.popMatrix();


      this.scene.pushMatrix();
      this.scene.translate(-this.size/ 2 + this.position[0],0.5 + this.position[1],-this.size/ 2 + this.position[2]);
      this.scene.scale(0.3,1,0.3);
      this.cylinder.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.translate(-this.size/ 2 + this.position[0],1.5 + this.position[1],-this.size/ 2 + this.position[2]);
      this.scene.scale(0.3,1,0.3);
      this.cone.display();
      this.scene.popMatrix();


      this.scene.pushMatrix();
      this.scene.translate(this.size/ 2 + this.position[0],0.5 + this.position[1],-this.size/ 2 + this.position[2]);
      this.scene.scale(0.3,1,0.3);
      this.cylinder.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.translate(this.size/ 2 + this.position[0],1.5 + this.position[1],-this.size/ 2 + this.position[2]);
      this.scene.scale(0.3,1,0.3);
      this.cone.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.translate(-this.size/ 2 + this.position[0],0.5+ this.position[1],this.size/ 2 + this.position[2]);
      this.scene.scale(0.3,1,0.3);
      this.cylinder.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.translate(-this.size/ 2 + this.position[0],1.5 + this.position[1],this.size/ 2 + this.position[2]);
      this.scene.scale(0.3,1,0.3);
      this.cone.display();
      this.scene.popMatrix();


      //display the rocks
      for(var i = 0; i < this.rocks.length; i++){
        this.scene.pushMatrix();
        this.scene.translate(0, 1.5, 0);
        this.rocks[i].display();
        this.scene.popMatrix();
      }
      
      
  }
}
