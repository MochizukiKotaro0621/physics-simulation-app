const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
// グローバル変数の設定
const G = 9.8;  // 重力加速度
const STEP = 0.1;  // 時間刻み幅
let L = parseFloat(document.getElementById("L").value); // 長さの初期値
let theta = parseFloat(document.getElementById("theta").value) * (Math.PI / 180);  // 初期角度（ラジアンに変換）
let thetaPrev = theta;
let omega = 0;  // 初期角速度
let alpha = 0;  // 角加速度
let anime = false;  // アニメーションフラグ
let time = 0; // 時間表示
let damping = parseFloat(document.getElementById("damping").value);
let kineticEnergy = 0;
let potentialEnergy = 0;
let totalEnergy = 0;
let dragging = false;

// 初期化
function init() {
  L = parseFloat(document.getElementById('L').value);  // 入力された長さを取得
  theta = thetaPrev = parseFloat(document.getElementById('theta').value) * (Math.PI / 180);  // 入力された角度をラジアンに変換
  damping = parseFloat(document.getElementById("damping").value);
  omega = 0;
  alpha = 0;
  time = 0;
  kineticEnergy = 0;
  potentialEnergy = G * L * (1 - Math.cos(theta)); // 位置エネルギー
  anime = false;
  document.getElementById('btnAnime').value = 'アニメーション開始';
  draw();
}

// 振り子の描画
function draw() {
  ctx.strokeStyle = "black";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeRect(0, 0, canvas.width, canvas.height);  // 枠線の描画

  // 中心線の描画
  ctx.strokeStyle = "lightgray";
  ctx.lineWidth = 2;              // 線の太さを設定
  ctx.setLineDash([5, 5]);        // 破線のパターン [破線の長さ, 間隔]
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();
  ctx.setLineDash([]);

  // 振り子の座標を計算
  let x = canvas.width / 2 + L * Math.sin(theta);
  let y = L * Math.cos(theta) + canvas.height / 2;  // Y座標を調整してキャンバスの上から少し下に配置

  // 振り子の棒を描画
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, canvas.height / 2);  // 天井からの描画（20px下）
  ctx.lineTo(x, y);
  ctx.stroke();

  let colorValue = Math.min(255, Math.abs(omega * 500)); // 速度に応じて色を決定
  ctx.strokeStyle = `rgb(${colorValue}, 0, 0)`; // 赤色に変化
  ctx.fillStyle = `rgb(${colorValue}, 0, 0)`; // 振り子の玉と内部の色を変更

  // 質点（振り子の玉）を描画
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // 振り子の角度を描画
  const angleDegrees = theta * (180 / Math.PI);
  angle.innerHTML = " ,角度 : " + angleDegrees.toFixed(0) + "°"

  // 時間をプロット
  info.innerHTML = "時間 : " + time.toFixed(2) + "s";

  // エネルギーの計算
  kineticEnergy = 0.5 * (L * omega) ** 2; //運動エネルギー 
  potentialEnergy = G * L * (1 - Math.cos(theta)); // 位置エネルギー
  totalEnergy = kineticEnergy + potentialEnergy; //エネルギー保存

  // エネルギーをプロット
  KEnergy.innerHTML = "運動エネルギー : " + kineticEnergy.toFixed(0) + "J";
  PEnergy.innerHTML = "位置エネルギー : " + potentialEnergy.toFixed(0) + "J";
  TEnergy.innerHTML = "全エネルギー : " + totalEnergy.toFixed(0) + "J";

  if (anime) {
    // 角加速度の計算（運動方程式：α = -(g/L) * sin(θ)）
    alpha = -(G / L) * Math.sin(thetaPrev);
    // オイラー法で角速度と角度を更新
    omega += alpha * STEP;

    // 減衰の適応
    omega /= damping;
    theta += omega * STEP;
    time += STEP;

    // アニメーションフレームの更新
    requestAnimationFrame(draw);
    // 値（位置，速度）の更新
    thetaPrev = theta;
  }
}

// アニメーション開始
function startAnime() {
  if (anime) {
    anime = false;
    document.getElementById('btnAnime').value = 'アニメーション開始';
  } else {
    anime = true;
    draw();
    document.getElementById('btnAnime').value = 'アニメーション停止';
  }
}

// マウスが押されたときのイベント
canvas.addEventListener("mousedown", function (e) {
  let rect = canvas.getBoundingClientRect();
  let mouseX = e.clientX - rect.left;
  let mouseY = e.clientY - rect.top;

  // 振り子の球の現在のx座標
  let x = canvas.width / 2 + L * Math.sin(theta);
  // 振り子の球の現在のy座標
  let y = L * Math.cos(theta) + canvas.height / 2;  // Y座標を調整

  // マウスが球の近くをクリックした場合、ドラッグを開始
  let distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
  if (distance < 10) { // 球の半径程度の範囲
    dragging = true;
  }
});

// マウスが動いたときのイベント
canvas.addEventListener('mousemove', function (e) {
  if (dragging) {
    let rect = canvas.getBoundingClientRect();
    let mouseX = e.clientX - rect.left;
    let mouseY = e.clientY - rect.top;

    // マウスの位置から新しい角度を計算
    let dx = mouseX - (canvas.width / 2);
    let dy = mouseY - canvas.height / 2; // Y座標を調整
    theta = Math.atan2(dx, dy); // 角度をマウスの位置に基づいて更新

    // 角度の範囲を-π〜πに制限
    if (theta < -Math.PI) theta = -Math.PI;
    if (theta > Math.PI) theta = Math.PI;

    // 描画を更新
    draw();
  }
});

// マウスを離したときのイベント
canvas.addEventListener('mouseup', function () {
  dragging = false; // ドラッグ終了
});

// 初期化を呼び出す
init();
