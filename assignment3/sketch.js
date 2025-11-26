// --- 전역 변수 선언 ---
let hatX, hatY;
let originalHatY;
let isDragging = false;
let hatOff = false;
let blushOn = false;

let bgColorIndex = 0;
let originalBgColor; 

let cx, cy;

let skinColor;
let watermelonRed;
let peachSkin;

// --- 보조 함수들을 setup() 보다 위에 정의 ---

function resetCharacter() {
  // cx, cy 값이 정의되어 있어야 정상 작동합니다.
  hatX = cx;
  originalHatY = cy - 50;
  hatY = originalHatY;
  isDragging = false;
  hatOff = false;
  blushOn = false;
  skinColor = watermelonRed;
  bgColorIndex = 0; 
}

function drawPupils(lX, rX, cY, isHatOff) {
  let pupilSize = isHatOff ? 22 : 15;
  let eyeRadius = 6;
  
  let angleL = atan2(mouseY - cY, mouseX - lX);
  let pupilXL = lX + eyeRadius * cos(angleL);
  let pupilYL = cY + eyeRadius * sin(angleL);
  
  let angleR = atan2(mouseY - cY, mouseX - rX);
  let pupilXR = rX + eyeRadius * cos(angleR);
  let pupilYR = cY + eyeRadius * sin(angleR);
  
  fill(0);
  ellipse(pupilXL, pupilYL, pupilSize, pupilSize);
  ellipse(pupilXR, pupilYR, pupilSize, pupilSize);
}

function drawWatermelonHat(x, y) {
  push();
  translate(x, y);
  
  fill(0, 150, 0);
  noStroke();
  arc(0, 0, 200, 200, PI, 0, CHORD);

  fill(watermelonRed);
  let startX = -80;
  let endX = 80;
  let step = 20;
  for (let i = startX; i < endX; i += step) {
    triangle(i, 0, i + step / 2, -30, i + step, 0);
  }

  stroke(0);
  strokeWeight(8);
  noFill();
  curve(-100, -30, -60, -75, -60, -10, -100, 10);
  curve(-60, -30, -30, -90, -30, -10, -60, 10);
  curve(-30, -30, 0, -97, 0, -10, -30, 10);
  curve(0, -30, 30, -90, 30, -10, 0, 10);
  curve(30, -30, 60, -75, 60, -10, 30, 10);
  
  pop();
}

function drawHair() {
  push();
  translate(cx, cy - 50);
  
  fill(0);
  noStroke();
  arc(0, 0, 200, 200, PI, 0, CHORD);

  fill(peachSkin);
  let startX = -80;
  let endX = 80;
  let step = 20;
  for (let i = startX; i < endX; i += step) {
    triangle(i, 0, i + step / 2, -30, i + step, 0);
  }
  pop();
}


// --- p5.js 주요 함수 ---

function setup() {
  createCanvas(600, 400);

  cx = width / 2;
  cy = height / 2;
  
  watermelonRed = color(220, 0, 50);
  peachSkin = color(255, 220, 185);
  originalBgColor = color(200, 220, 0);

  // 이제 이 시점에는 resetCharacter 함수가 위에 정의되어 있으므로 확실히 인식됩니다.
  resetCharacter();

  textSize(20);
  fill(0);
  text("20212981 안성준", 10, 30);
}

function draw() {
  // 배경색 설정
  if (hatOff) {
    if (frameCount % 20 === 0) {
      bgColorIndex = (bgColorIndex + 1) % 4;
    }
    
    if (bgColorIndex === 0) {
      background(173, 216, 230);
    } else if (bgColorIndex === 1) {
      background(240, 230, 140);
    } else if (bgColorIndex === 2) {
      background(216, 191, 216);
    } else {
      background(144, 238, 144);
    }
  } else {
    background(originalBgColor);
  }

  // 이름
  fill(0);
  noStroke();
  textSize(20);
  text("20212981 안성준", 10, 30);

  // 몸통
  fill(250);
  stroke(0);
  strokeWeight(1);
  arc(cx, height, 320, 120, PI, 0, CHORD);
  fill(skinColor);
  noStroke();
  
  // 목 
  rect(cx - 20, cy + 80, 40, 80, 5);
  arc(cx, cy + 140, 80, 50, 0, PI, CHORD);
  fill(220, 0, 50)

  // 얼굴
  fill(skinColor);
  stroke(1);
  strokeWeight(2);
  ellipse(cx, cy, 200, 240);

  if (hatOff) {
    drawHair();
  }

  // 코
  fill(200, 100, 100);
  stroke(80, 40, 40);
  strokeWeight(2);
  beginShape();
  vertex(cx - 15, cy + 10);
  bezierVertex(cx, cy - 5, cx, cy - 5, cx + 15, cy + 10);
  bezierVertex(cx + 20, cy + 40, cx - 20, cy + 40, cx - 15, cy + 10);
  endShape(CLOSE);

  // 눈썹
  stroke(0);
  strokeWeight(10);
  line(cx - 60, cy - 30, cx - 20, cy - 35);
  line(cx + 20, cy - 35, cx + 60, cy - 30);

  // 눈
  let eyeCenterY = cy - 10;
  let eyeLeftX = cx - 35;
  let eyeRightX = cx + 35;
  
  fill(255);
  stroke(0);
  strokeWeight(3);
  ellipse(eyeLeftX, eyeCenterY, 40, 25);
  ellipse(eyeRightX, eyeCenterY, 40, 25);

  drawPupils(eyeLeftX, eyeRightX, eyeCenterY, hatOff);

  // 입
  if (hatOff) {
    fill(0);
    noStroke();
    ellipse(cx, cy + 62, 30, 40);
  } else {
    stroke(100, 0, 20);
    strokeWeight(6);
    line(cx - 20, cy + 60, cx + 20, cy + 60);
    line(cx - 20, cy + 65, cx + 20, cy + 65);
    
    fill(220);
    noStroke();
    arc(cx, cy + 95, 100, 50, 0, PI, CHORD);
  }

  // 홍조
  if (blushOn) {
    fill(255, 100, 100, 150);
    noStroke();
    ellipse(cx - 60, cy + 20, 35, 25);
    ellipse(cx + 60, cy + 20, 35, 25);
  }

  // 모자
  if (isDragging) {
    hatX = mouseX;
    hatY = mouseY;
    if (hatY < originalHatY - 50 && !hatOff) {
      hatOff = true;
      skinColor = peachSkin;
    }
  }
  drawWatermelonHat(hatX, hatY);
}

// --- 이벤트 함수 ---

function mousePressed() {
  let distance = dist(mouseX, mouseY, hatX, hatY);
  if (distance < 100) { 
    isDragging = true;
  }
}

function mouseReleased() {
  isDragging = false;
}

function keyPressed() {
  if (key === 'b' || key === 'B') {
    blushOn = !blushOn;
  }
  if (key === 'r' || key === 'R') {
    resetCharacter();
  }
}
