let bodyHue = 200; 
let time = 0;
let captureProgress = 0; // 0: 시작, 1: 포획 완료 상태

function setup() {
  createCanvas(600, 400); 
  colorMode(HSB, 360, 100, 100);
  frameRate(20);
  
  saveGif('Homework4', 10);
}

function draw() {
  time = frameCount * 0.03; 
  
  // 1. 애니메이션 업데이트
  captureProgress = (sin(time * 0.5) + 1) / 2;
  
  // 2. 배경 및 색상 설정
  let backgroundHue = (frameCount * 0.5) % 360; 
  fill(backgroundHue, 60, 90); 
  stroke(backgroundHue + 180 % 360, 70, 50); 
  strokeWeight(1);
  rect(0, 0, width, height)
  

  
  // 3. 몬스터볼 크기 애니메이션
  let ballScale = 1.0;
  if (captureProgress < 0.5) {
      ballScale = lerp(1.0, 0.5, captureProgress * 2);
  } else {
      ballScale = lerp(0.5, 1.0, (captureProgress - 0.5) * 2); 
  }

  let ballYShift = sin(time * 3) * 5; 
  
  push();
  translate(110, 80); 
  scale(ballScale);    
  translate(0, ballYShift); 

  // 몬스터볼 (원점: (0, 0)) 
  fill(0, 100, 90); 
  stroke(0); strokeWeight(7 / ballScale); 
  arc(0, 0, 120, 120, PI, TWO_PI, CHORD);
  fill(0, 0, 100); 
  stroke(0); strokeWeight(7 / ballScale);
  arc(0, 0, 120, 120, 0, PI, CHORD);
  stroke(0); strokeWeight(7 / ballScale); 
  line(-60, 0, 60, 0); 
  noStroke(); fill(0);
  ellipse(0, 0, 35, 35);    
  stroke(0); strokeWeight(0.3 / ballScale); fill(0, 0, 100); 
  ellipse(0, 0, 25, 25);    
  pop();
  
  
  // 4. 문양
  let sizePulse = cos(time * 4) * 0.1 + 1; 
  push();
  translate(435, 70); 
  scale(sizePulse); 
  fill(210, 80, 100); 
  stroke(210, 100, 70);
  strokeWeight(0);
  triangle(0, -40, -30, 0, 30, 0); 
  arc(0, 0, 60, 75, 0, PI, CHORD); 
  pop();
  let dirtShiftX = sin(time * 5) * 3;
  fill(30, 70, 80); 
  stroke(30, 80, 50);
  strokeWeight(1);
  quad(480 + dirtShiftX, 100, 495 + dirtShiftX, 60, 505 + dirtShiftX, 60, 490 + dirtShiftX, 100);
  quad(500 - dirtShiftX, 100, 520 - dirtShiftX, 40, 550 - dirtShiftX, 40, 570 - dirtShiftX, 100);
  
  
  // 5. 캐릭터(포켓몬) 애니메이션
  
  let charX = lerp(300, 110, captureProgress);
  let charY = lerp(240, 80, captureProgress);
  let charScale = lerp(1.0, 0.05, captureProgress); 

  bodyHue = (backgroundHue + 180) % 360; 
  let bodyShiftY = sin(time * 2) * 8; 
  let armShiftY = sin(time * 10) * 10; 

  push();
  translate(charX, charY); 
  scale(charScale);       
  
  // 회전 애니메이션
  let charRotation = captureProgress * (TWO_PI * 3); 
  rotate(charRotation); 
  
  translate(0, bodyShiftY / charScale); // 3. 부유 애니메이션

  // 캐릭터 몸통, 원점: (0, 0)
  
  // 몸통
  fill(bodyHue, 40, 100); 
  stroke(bodyHue, 60, 80);
  strokeWeight(2 / charScale); 
  
  rect(-80, -80, 160, 160);    
  arc(0, -80, 160, 160, PI, TWO_PI, CHORD); 
  arc(0, 80, 160, 60, 0, PI, CHORD);
  
  // 얼굴
  let eyeFill = map(sin(time * 10), -1, 1, 0, 40); 
  noStroke(); fill(bodyHue, 90, eyeFill); 
  ellipse(-50, -110, 5, 5); 
  ellipse(50, -110, 5, 5); 
  ellipse(-5, -85, 4, 4); 
  ellipse(5, -85, 4, 4); 
  noFill(); stroke(bodyHue, 80, 60);
  strokeWeight(2 / charScale);
  let mouthSize = cos(time * 3) * 5 + 25; 
  arc(0, -85, 140, mouthSize, 0.05, PI - 0.05);
  
  // 팔과 손가락
  fill(bodyHue, 40, 100); stroke(bodyHue, 60, 80); strokeWeight(2 / charScale);
  ellipse(-40, 0 + armShiftY, 36, 65);  
  ellipse(40, 0 + armShiftY, 36, 65);   
  
  stroke(bodyHue, 80, 60); strokeWeight(3 / charScale);
  line(-45, 20 + armShiftY, -45, 30 + armShiftY); 
  line(-35, 20 + armShiftY, -35, 30 + armShiftY);
  line(35, 20 + armShiftY, 35, 30 + armShiftY);  
  line(45, 20 + armShiftY, 45, 30 + armShiftY);
  
  // 발
  fill(bodyHue, 40, 100); stroke(bodyHue, 60, 80); strokeWeight(1 / charScale);
  ellipse(-50, 110, 55, 30); 
  ellipse(50, 110, 55, 30);  
  
  // 발가락
  stroke(bodyHue, 80, 60); strokeWeight(3 / charScale);
  line(-70, 120, -60, 110);
  line(-57, 124, -47, 114);
  line(43, 114, 53, 124);
  line(57, 110, 67, 120);

  
  // 6. 꼬리 
  push(); 
  // 꼬리 위치: 몸통 중심(0, 0)에서 오른쪽 하단으로 이동
  translate(110, 40); 
  
  // 꼬리는 캐릭터 회전에만 의존하며, 개별적인 회전 변수 제거
  rotate(-PI/4); // 꼬리의 기본 기울기만 유지
  
  fill(bodyHue, 40, 100); 
  stroke(bodyHue, 60, 80);
  strokeWeight();
  
  // 꼬리 그리기 (새로운 원점 (80, 40) 기준)
  ellipse(0, 0, 150, 65); 
  pop(); 

  
  pop(); // 캐릭터 변환 종료
  
  textSize(20);
  fill(0);
  text("20212981 안성준", 10, 30);
}
