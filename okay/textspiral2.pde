String text = "I will be okay? I will. Be okay. I will be okay. Be okay? I will. I will be? Okay? Okay? I will be? I will be okay? Be. Okay, okay, be okay? I will be okay. I will be okay. Okay, okay. I will. I will. I will. Okay. Okay. I will. Okay, I will. Okay. I will be? Be okay, I will. Okay. Okay. Be okay, I will. Be okay? I will. I will. I will be okay? Okay. Be okay, okay. Be? Okay? Okay, I will. I will. Be? Okay? Okay? Okay? I will be okay, okay? I will be. Be okay? Okay. Be okay. Be okay, be okay, okay? I will be okay? I will. Okay, I will. Okay. Be okay. Be? Be? Okay? Okay, I will. Okay, be okay? Okay, I will be okay? I will. Be okay. I will be okay. Be okay? Okay. Be okay. Be? Be. Okay, okay. I will. Okay, be? Be okay, I will. Be? I will be. I will. Okay, be okay. Be okay? I will be. I will. I will. Be okay. Be okay? Be? Okay, be okay? Be? Okay? Okay, be? Be? I will be? Be? Okay. Okay. Be? Be. Be okay, be? Be okay, I will. Be okay. Okay? Be okay. I will be. Okay? Be. Okay. Be okay? Okay. I will be. I will. Okay, be. Okay, be okay? I will. Okay. Okay? Okay. Be okay, be? Be okay? Okay. Okay, I will. I will be okay. Be okay, okay. Okay. Be? Be okay. Be? I will be. I will. I will. Okay. Be? I will. Be okay, I will be okay. Be okay? Be okay, okay, be? Be? Be. Be? Okay, be okay, I will be okay? I will. I will be. I will. I will. Be okay? Be okay? Okay? Be okay, okay, okay? I will. ";
char[] chars = text.toCharArray();
PFont monospace;
int count; 
void setup() {
  size(1000, 1000);
  background(255);
  frameRate(30);
  monospace = createFont("Courier", 20);
  textFont(monospace);
  fill(0);
  count = 0;
} 

void draw() {
  clear();
  background(255);
  translate(width/2, height/2);

  rotate(0.002 * count);
  for(int i = 1500; i > 0; i--) {
    rotate(0.03);
    textSize(i * 20.0/1000);
    fill(0);
    int tokenIndex = 1500 - i;
    text(chars[tokenIndex % chars.length], 0, -i / 2);
  }
  saveFrame();
  if (0.002 * count > 2 * PI) {
    noLoop();
  }
  count++;
}
