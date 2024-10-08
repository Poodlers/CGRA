#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float maxHeight;

varying vec4 coords;
void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);
	vec4 mapColor = texture2D(uSampler2,vTextureCoord);
	
	gl_FragColor = color * (mapColor * 0.9);
	
}