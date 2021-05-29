#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec2 v3TextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;


void main() {

	vec4 colorDistort = texture2D(uSampler2, v3TextureCoord);

	float distortR = colorDistort.r - 0.5;
	float distortG = colorDistort.g - 0.5;
	vec2 realTextureCoord = vec2(0.0,0.0);
	realTextureCoord.r = vTextureCoord.r + distortR;
	realTextureCoord.g = vTextureCoord.g + distortG;

	if(realTextureCoord.r < 0.0) realTextureCoord.r = 0.0;
	if(realTextureCoord.g < 0.0) realTextureCoord.g = 0.0;
	if(realTextureCoord.g > 1.0) realTextureCoord.g = 1.0;
	if(realTextureCoord.r > 1.0) realTextureCoord.r = 1.0;
	vec4 color = texture2D(uSampler, realTextureCoord);

	
	gl_FragColor = color;
}