import {CGFobject, CGFappearance} from './lib/CGF.js';

export class MyCylinder extends CGFobject {
    constructor(scene, slices, stacks,height, texture, color) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.texture = texture;
        this.height = height;
        this.color = color;
        this.initBuffers();
        this.initMaterials();
    }

    initMaterials(){
        this.materialCylinder = new CGFappearance(this.scene);
        this.materialCylinder.setAmbient(0, 0, 0, 1);
        this.materialCylinder.setDiffuse(0, 0, 0, 1);
        this.materialCylinder.setSpecular(0, 0, 0, 1);
        this.materialCylinder.setEmission(this.color[0],this.color[1],this.color[2],1);
        this.materialCylinder.setTexture(this.texture);
        this.materialCylinder.setTextureWrap('REPEAT', 'REPEAT');
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;
        var texCoo = 0;


        for(var i = 0; i < this.slices; i++){
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa=Math.sin(ang);
            var saa=Math.sin(ang+alphaAng);
            var ca=Math.cos(ang);
            var caa=Math.cos(ang+alphaAng);

        
            this.vertices.push(ca, 0, -sa);
            this.vertices.push(caa, 0, -saa);
            this.vertices.push(ca, this.height, -sa);
            this.vertices.push(caa, this.height, -saa);
            
        
            // push normal once for each vertex of this triangle
            this.normals.push(ca, 0, -sa);
            this.normals.push(caa, 0, -saa);
            this.normals.push(ca, this.height, -sa);
            this.normals.push(caa, this.height, -saa);
           

            this.indices.push(4*i, (4*i+3) , (4*i+2) );
            this.indices.push(4*i, (4*i+1) , (4*i+3) );
        
            this.texCoords.push(texCoo, 1);
            this.texCoords.push(texCoo + 1/this.slices, 1);
            this.texCoords.push(texCoo, 0);
            this.texCoords.push(texCoo + 1/this.slices, 0);

            ang+=alphaAng;
            texCoo+= 1 / this.slices;
        }

    

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
    
    display(){
        this.materialCylinder.apply();
        super.display();
    }
   
}


