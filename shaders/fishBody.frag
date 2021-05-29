#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec4 color;
uniform float ratio;

varying vec4 coords;

void main() {
    
    gl_FragColor = texture2D(uSampler, vTextureCoord);
    if(vTextureCoord.t >= ratio)
        gl_FragColor = color;
	
}