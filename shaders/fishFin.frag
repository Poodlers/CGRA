#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec4 color;

varying vec4 coords;

void main() {
    
    gl_FragColor = texture2D(uSampler, vTextureCoord);
    gl_FragColor = color;
	
}