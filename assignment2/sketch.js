function setup() {
  createCanvas(600, 400);
  background(200, 220, 0);

  textSize(20);
  fill(0);
  text("20212981 안성준", 10, 30);

  // 중심 좌표
  let cx = width / 2;
  let cy = height / 2;

  // 수박 얼굴
  fill(200, 0, 50);
  stroke(1);
  strokeWeight(2);
  ellipse(cx, cy, 200, 240);

  // 아래 흰 부분
  fill(220);
  noStroke();
  arc(cx, cy + 95, 100, 50, 0, PI, CHORD);

  // 윗부분 초록 껍질
  fill(0, 150, 0);
  arc(cx, cy - 50, 200, 200, PI, 0, CHORD);

  // 삼각형 홈
  fill(200, 0, 50);
  noStroke();
  let startX = cx - 80;
  let endX = cx + 80;
  let step = 20;
  for (let x = startX; x < endX; x += step) {
    triangle(x, cy - 50, x + step / 2, cy - 80, x + step, cy - 50);
  }

  // 검은 줄무늬
  stroke(0);
  strokeWeight(8);
  noFill();
  curve(cx - 100, cy - 80, cx - 60, cy - 125, cx - 60, cy - 60, cx - 100, cy - 40);
  curve(cx - 60, cy - 80, cx - 30, cy - 140, cx - 30, cy - 60, cx - 60, cy - 40);
  curve(cx - 30, cy - 80, cx, cy - 147, cx, cy - 60, cx - 30, cy - 40);
  curve(cx, cy - 80, cx + 30, cy - 140, cx + 30, cy - 60, cx, cy - 40);
  curve(cx + 30, cy - 80, cx + 60, cy - 125, cx + 60, cy - 60, cx + 30, cy - 40);

  // 눈
  fill(255);
  stroke(0);
  strokeWeight(3);
  ellipse(cx - 35, cy - 10, 40, 25);
  ellipse(cx + 35, cy - 10, 40, 25);

  // 동공
  fill(0);
  ellipse(cx - 35, cy - 10, 15, 15);
  ellipse(cx + 35, cy - 10, 15, 15);

  // 눈썹
  stroke(0);
  strokeWeight(10);
  line(cx - 60, cy - 30, cx - 20, cy - 35);
  line(cx + 20, cy - 35, cx + 60, cy - 30);

  // 코
  fill(200, 100, 100);
  stroke(80, 40, 40);
  strokeWeight(2);
  beginShape();
  vertex(cx - 15, cy + 10);
  bezierVertex(cx, cy - 5, cx, cy - 5, cx + 15, cy + 10);
  bezierVertex(cx + 20, cy + 40, cx - 20, cy + 40, cx - 15, cy + 10);
  endShape(CLOSE);

  // 입
  stroke(100, 0, 20);
  strokeWeight(6);
  line(cx - 20, cy + 60, cx + 20, cy + 60);
  line(cx - 20, cy + 65, cx + 20, cy + 65);

  // 목
  fill(200, 0, 50);
  stroke(0);
  strokeWeight(0)
  rect(cx - 20, cy+120,40, 80, 5);

  // 어깨/몸
  fill(250);
  stroke(0);
  strokeWeight(1);
  arc(cx, height, 320, 120, PI, 0, CHORD);

  // 티셔츠 목부분
  fill(200, 0, 50);
  noStroke();
  arc(cx, cy + 140, 80, 50, 0, PI, CHORD);
}
