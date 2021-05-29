import {CGFobject, CGFappearance} from './lib/CGF.js';

export class MyRock extends CGFobject {

  constructor(scene, slices, stacks, position) {
    super(scene);
    this.latDivs = stacks * 2;
    this.longDivs = slices;
    this.position = position;
    this.randomXScale = Math.random() * 0.4 + 0.3;
    this.randomZScale = Math.random() * 0.4 + 0.3;
    this.randomYScale = this.randomXScale * this.randomZScale * 0.7;
    this.rockSize = this.randomXScale;
    this.randomRotation = Math.random() * Math.PI * 2;
    
    this.initBuffers();
    this.initMaterials();
  }

  initMaterials(){
    this.rockAppearance = new CGFappearance(this.scene);
    this.rockAppearance.setAmbient(0.3, 0.3, 0.3, 1);
	  this.rockAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
	  this.rockAppearance.setSpecular(0.9, 0.9, 0.9, 1);
 
    
  }

  /**
   * @method initBuffers
   * Initializes the sphere buffers
   * TODO: DEFINE TEXTURE COORDINATES
   */
  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var phi = 0;
    var theta = 0;
    var phiInc = Math.PI / this.latDivs;
    var thetaInc = (2 * Math.PI) / this.longDivs;
    var latVertices = this.longDivs + 1;

    // build an all-around stack at a time, starting on "north pole" and proceeding "south"
    for (let latitude = 0; latitude <= this.latDivs ; latitude++) {
      var sinPhi = Math.sin(phi);
      var cosPhi = Math.cos(phi);

      // in each stack, build all the slices around, starting on longitude 0
      theta = 0;
      var firstVert = [];
      for (let longitude = 0; longitude <= this.longDivs; longitude++) {
        //--- Vertices coordinates
        var x = Math.cos(theta) * sinPhi;
        var y = cosPhi;
        var z = Math.sin(-theta) * sinPhi;
        
        //distort this man
        
        var vertexDistort = (Math.random() * 0.5 + 0.75);
        
        if(longitude == 0){
            firstVert.push(x * vertexDistort, y * vertexDistort , z * vertexDistort);
        }

        if(longitude == this.longDivs - 1){
            this.vertices.push(firstVert[0], firstVert[1], firstVert[2]);
        }else{
            this.vertices.push(x * vertexDistort, y * vertexDistort , z * vertexDistort );
        }

        //--- Indices
        if (latitude < this.latDivs && longitude < this.longDivs) {
          var current = latitude * latVertices + longitude;
          var next = current + latVertices;
          // pushing two triangles using indices from this round (current, current+1)
          // and the ones directly south (next, next+1)
          // (i.e. one full round of slices ahead)
        

          this.indices.push( current + 1, current, next);
          this.indices.push( current + 1, next, next +1);
        }

        //--- Normals
        // at each vertex, the direction of the normal is equal to 
        // the vector from the center of the sphere to the vertex.
        // in a sphere of radius equal to one, the vector length is one.
        // therefore, the value of the normal is equal to the position vectro
        this.normals.push(x, y, z);
        theta += thetaInc;

        //--- Texture Coordinates
        // To be done... 
        // May need some additional code also in the beginning of the function.
        
        this.texCoords.push(longitude / this.longDivs, latitude / this.latDivs);
      }

      phi += phiInc;
    }


    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }

  display(){
      this.scene.pushMatrix();
      this.rockAppearance.apply();
      this.scene.translate(this.position[0], this.position[1], this.position[2]);
      this.scene.rotate(this.randomRotation, 0,1,0);
      this.scene.scale(0.35, 0.7, 0.35);
      this.scene.scale(this.randomXScale, this.randomYScale, this.randomZScale);
      super.display();
      this.scene.popMatrix();
  }
}
