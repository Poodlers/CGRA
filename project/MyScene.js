import { CGFscene, CGFcamera, CGFaxis, CGFappearance,CGFtexture } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyMovingObject } from "./MyMovingObject.js";
import { MyCubeMap } from "./MyCubeMap.js";
import { MyPyramid } from "./MyPyramid.js";
import { MyFish } from "./MyFish.js";
import {MySeaFloor} from "./MySeaFloor.js";
import {MyNest} from "./MyNest.js";
import { MyWaterSurface } from "./MyWaterSurface.js";
import { MyRockSet} from "./MyRockSet.js";
import { MyPillar } from "./MyPillar.js";
import {MyAlgae} from "./MyAlgae.js";
import { MyAlgaeSet } from "./MyAlgaeSet.js";
import { MyMovingFish } from "./MyMovingFish.js";
import {CGFcamera2} from "./CFGCamera2.js";
import {MyAnimatedFish} from "./MyAnimatedFish.js";

/**
* MyScene
* @constructor
*/
export class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);

        this.initCameras();
        this.initLights();
        this.position = [0, 0, 0];
        this.speed = 0;
        this.speedFactor = 0.1;
        this.rotationAngle = 0;
        this.scaleFactor = 1;
        
        this.seaFloorY = 1;
        this.seaFloorSize = 50;
        this.nestCenter = [-2.5,-1.7,-1.5];

        this.cylinderTex = new CGFtexture(this, 'images/test_cubemap/py.png');
        this.globeTex = new CGFtexture(this, 'images/earth.jpg');
        this.seaFloor = new MySeaFloor(this, 20, this.seaFloorSize, 10, this.nestCenter);
        this.nest = new MyNest(this,this.nestCenter, 2);
        this.waterSurface = new MyWaterSurface(this,20,50);
        
        this.pillars = [];
        this.pillars.push(new MyPillar(this, [13, 0, -22]));
        this.pillars.push(new MyPillar(this, [13, 0, -10]));
        this.pillars.push(new MyPillar(this, [13, 0, 2]));
        this.pillars.push(new MyPillar(this, [20, 0, -22]));
        this.pillars.push(new MyPillar(this, [20, 0, -10]));
        this.pillars.push(new MyPillar(this, [20, 0, 2]));

        this.rockSet = new MyRockSet(this, 20, this.nest,this.seaFloorY,this.seaFloorSize);   
        this.algaeSet = new MyAlgaeSet(this,15,this.nest);

        this.algae = new MyAlgae(this, 3, [0,1,0]);
    
        this.myAnimatedFishes = [
            new MyAnimatedFish(this, Math.random() * 8 + 2, [0, 1, 0], [1.0, 0.0, 1.0, 1.0], Math.random() * 0.2 + 0.5, Math.random() * 1 + 2, true),
            new MyAnimatedFish(this, Math.random() * 8 + 2, [-5, 3, -5], [0.0, 0.0, 1.0, 1.0], Math.random() * 0.2 + 0.5, Math.random() * 1 + 2, false), 
            new MyAnimatedFish(this, Math.random() * 8 + 2, [5, 4, -5], [0.0, 1.0, 0.0, 1.0], Math.random() * 0.2 + 0.5, Math.random() * 1 + 2, true), 
            new MyAnimatedFish(this, Math.random() * 8 + 2, [5, 2, 0], [1.0, 1.0, 0.0, 1.0], Math.random() * 0.2 + 0.5, Math.random() * 1 + 2, false),
       
        ];

        this.pyramid = new MyPyramid(this,4,1);
        this.movingObject = new MyMovingObject(this, this.pyramid, this.rotationAngle, this.speed, this.speedFactor, this.position);
        
        this.incompleteSphere = new MySphere(this, 16, 8, this.globeTex);
        this.fish = new MyFish(this, [0, 2, 0], [1.0, 0.0, 0.0, 1.0], Math.random() * 0.2 + 0.5);
        this.rotateLeftBarbatana = true;
        this.rotateRightBarbatana = true;
        this.movingFish = new MyMovingFish(this, this.fish,this.rotationAngle, this.speed, this.speedFactor, this.fish.position, this.nest,this.seaFloorY);
        

        this.textureDemoBack = new CGFtexture(this, 'images/demo_cubemap/back.png');
        this.textureDemoBottom = new CGFtexture(this, 'images/demo_cubemap/bottom.png');
        this.textureDemoFront = new CGFtexture(this, 'images/demo_cubemap/front.png');
        this.textureDemoLeft = new CGFtexture(this, 'images/demo_cubemap/left.png');
        this.textureDemoRight = new CGFtexture(this, 'images/demo_cubemap/right.png');
        this.textureDemoTop = new CGFtexture(this, 'images/demo_cubemap/top.png');

        this.textureTestBack = new CGFtexture(this, 'images/test_cubemap/pz.png');
        this.textureTestBottom = new CGFtexture(this, 'images/test_cubemap/ny.png');
        this.textureTestFront = new CGFtexture(this, 'images/test_cubemap/nz.png');
        this.textureTestLeft = new CGFtexture(this, 'images/test_cubemap/nx.png');
        this.textureTestRight = new CGFtexture(this, 'images/test_cubemap/px.png');
        this.textureTestTop = new CGFtexture(this, 'images/test_cubemap/py.png');

        this.textureStairBack = new CGFtexture(this, 'images/Stairs/negz.jpg');
        this.textureStairBottom = new CGFtexture(this, 'images/Stairs/negy.jpg');
        this.textureStairFront = new CGFtexture(this, 'images/Stairs/posz.jpg');
        this.textureStairLeft = new CGFtexture(this, 'images/Stairs/negx.jpg');
        this.textureStairRight = new CGFtexture(this, 'images/Stairs/posx.jpg');
        this.textureStairTop = new CGFtexture(this, 'images/Stairs/posy.jpg');

        this.textureUnderWaterBack = new CGFtexture(this, 'images/underwater_cubemap/back.jpg');
        this.textureUnderWaterBottom = new CGFtexture(this, 'images/underwater_cubemap/bottom.jpg');
        this.textureUnderWaterFront = new CGFtexture(this, 'images/underwater_cubemap/front.jpg');
        this.textureUnderWaterLeft = new CGFtexture(this, 'images/underwater_cubemap/left.jpg');
        this.textureUnderWaterRight = new CGFtexture(this, 'images/underwater_cubemap/right.jpg');
        this.textureUnderWaterTop = new CGFtexture(this, 'images/underwater_cubemap/top.jpg');

        this.textures = [[this.textureDemoBack, this.textureDemoBottom, this.textureDemoFront, this.textureDemoLeft, this.textureDemoRight, this.textureDemoTop],
         [this.textureTestBack,this.textureTestBottom, this.textureTestFront, this.textureTestLeft, this.textureTestRight, this.textureTestTop],
         [this.textureStairBack,this.textureStairBottom, this.textureStairFront, this.textureStairLeft, this.textureStairRight, this.textureStairTop],
        [this.textureUnderWaterBack, this.textureUnderWaterBottom, this.textureUnderWaterFront, this.textureUnderWaterLeft, this.textureUnderWaterRight, this.textureUnderWaterTop]];

        this.selectedTexture = 3;  
        this.textureIds = { 'DemoCube': 0, 'TestCube': 1, 'Stairs': 2, 'Underwater': 3};

        this.demoCube = new MyCubeMap(this,this.textures[this.selectedTexture][0],this.textures[this.selectedTexture][1],
            this.textures[this.selectedTexture][2], this.textures[this.selectedTexture][3], this.textures[this.selectedTexture][4],this.textures[this.selectedTexture][5]);
        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        
        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);


        this.defaultAppearance = new CGFappearance(this);
		this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setEmission(0,0,0,1);
		this.defaultAppearance.setShininess(120);

		this.sphereAppearance = new CGFappearance(this);
		this.sphereAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.sphereAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.sphereAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.sphereAppearance.setShininess(120);
         
    
        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayMoving = false;
        this.displayDemoCube = true;
        this.displayAnimatedFishes = true;
        this.displaySphere = false;
        this.displayFish = true;
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera2(2.0, 0.1, 500, vec3.fromValues(2, 2, 2), vec3.fromValues(0, 2, 0));
        
    }
    updateAppliedTexture() {
        this.demoCube.updateTextures(this.textures[this.selectedTexture]);
    }
    updateSpeedFactor(){
        this.movingObject.updateSpeedFactor(this.speedFactor);
        this.movingFish.updateSpeedFactor(this.speedFactor);
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0,0,0,1);
        this.setShininess(10.0);
    }
    

    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        //To be done...
    
        this.checkKeys();
        this.movingObject.update();
        this.movingFish.update();
        this.fish.animate(t, this.movingFish.getSpeed() * 100, this.rotateLeftBarbatana,this.rotateRightBarbatana); 
        this.waterSurface.update(t);
        for(var i = 0; i < this.myAnimatedFishes.length; i++){
            this.myAnimatedFishes[i].update(t);
        }
        
    }

    checkKeys()  {
        this.rotateLeftBarbatana = true;
        this.rotateRightBarbatana = true;
        var text="Keys pressed: ";
        var keysPressed=false;
        // Check for key codes e.g. in https://keycode.info/

        if (this.gui.isKeyPressed("KeyW")) {
            text+=" W ";
            this.movingObject.accelerate(0.2);
            this.movingFish.accelerate(0.2);
            keysPressed=true;

        }

        if (this.gui.isKeyPressed("KeyC")) {
            text+=" C ";
            this.movingFish.pickUpInteraction(this.rockSet);
            keysPressed=true;

        }

        if (this.gui.isKeyPressed("KeyP")) {
            text+=" P ";
            this.movingFish.moveVertically(0.05);
            keysPressed=true;

        }
        if (this.gui.isKeyPressed("KeyL")) {
            text+=" L ";
            this.movingFish.moveVertically(-0.05);
            keysPressed=true;

        }

        if (this.gui.isKeyPressed("KeyS")){
            text+=" S ";
            this.movingObject.accelerate(-0.2);
            this.movingFish.accelerate(-0.2);
            keysPressed=true;
        }
        if (this.gui.isKeyPressed("KeyA")){
            text+=" A ";
            this.movingObject.turn(0.05);
            this.movingFish.turn(0.05);
            this.rotateLeftBarbatana = false;
            keysPressed=true;

        }
        if (this.gui.isKeyPressed("KeyD")){
            text+=" D ";
            this.movingObject.turn(-0.05);
            this.rotateRightBarbatana = false;
            this.movingFish.turn(-0.05);
            keysPressed=true;
        }
        if (this.gui.isKeyPressed("KeyR")){
            text+=" R ";
            this.movingObject.reset();
            this.movingFish.reset(this.rockSet);
            keysPressed=true;
        }

        if (keysPressed){
            console.log(text);
        }
            

  }
    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        
        this.defaultAppearance.apply();
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.sphereAppearance.apply();
        // ---- BEGIN Primitive drawing section
        if(this.displaySphere){
            this.incompleteSphere.display();
        }
        //This sphere does not have defined texture coordinates
        
        if(this.displayMoving){
            this.pushMatrix();
            this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
            this.movingObject.display();
            this.popMatrix();
        }
        
        if(this.displayDemoCube) this.demoCube.display();
        
        if(this.displayFish) this.movingFish.display();
    
        
        this.seaFloor.display();
        this.nest.display();
        this.waterSurface.display();
        
        this.rockSet.display();
        for(var i = 0; i < this.pillars.length; i++){
            this.pillars[i].display();
        }
        
        this.algaeSet.display();
        
        if(this.displayAnimatedFishes){
            for(var i = 0; i < this.myAnimatedFishes.length; i++){
                this.myAnimatedFishes[i].display();
            }
        }
        
        
        // ---- END Primitive drawing section
    }
}