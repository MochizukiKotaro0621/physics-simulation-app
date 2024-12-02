const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// グローバル変数の設定
const G = 9.8; // 重力加速度
const STEP = 0.05; // 時間刻み幅

// 振り子1
let L1 = parseFloat(document.getElementById("L").value); // 長さの初期値
let theta1 = parseFloat(document.getElementById("theta").value) * (Math.PI / 180); // 初期角度（ラジアンに変換）
let omega1 = 0; // 初期角速度
let alpha1 = 0; // 角加速度

// 振り子2
let L2 = parseFloat(document.getElementById("L").value); // 長さの初期値
let theta2 = parseFloat(document.getElementById("theta").value) * (Math.PI / 180); // 初期角度（ラジアンに変換）
let omega2 = 0; // 初期角速度
let alpha2 = 0; // 角加速度
let a2 =document.getElementById("a").value;//上昇加速度
// 振り子3
let L3 = parseFloat(document.getElementById("L").value); // 長さの初期値
let theta3 = parseFloat(document.getElementById("theta").value) * (Math.PI / 180); // 初期角度（ラジアンに変換）
let omega3 = 0; // 初期角速度
let alpha3 = 0; // 角加速度
let a3 =document.getElementById("a").value;//左右加速度

let anime = false; // アニメーションフラグ
let time = 0; // 時間表示

// 初期化
function init() {
  L1 =L2=L3= parseFloat(document.getElementById('L').value);
  theta1 =theta2=theta3 =parseFloat(document.getElementById('theta').value) * (Math.PI / 180);
  omega1 = omega2 =omega3= alpha1 = alpha2=alpha3 = 0;
  a2 =document.getElementById("a").value;//上昇加速度
  a3 =document.getElementById("a").value;//左右加速度
  time = 0;
  anime = false;
  document.getElementById('btnAnime').value = '回答';
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
  ctx.moveTo(canvas.width / 5, canvas.height/2-L1-20);
  ctx.lineTo(canvas.width / 5, canvas.height/2+L1+40);
  ctx.stroke();
  ctx.moveTo(canvas.width / 2, canvas.height/2-L1-20);
  ctx.lineTo(canvas.width / 2, canvas.height/2+L1+40);
  ctx.stroke();
  ctx.moveTo(canvas.width*4 / 5, canvas.height/2-L1-20);
  ctx.lineTo(canvas.width*4 / 5, canvas.height/2+L1+40);
  ctx.stroke();
  ctx.setLineDash([]);

  // 振り子1の座標計算
  let x1 = canvas.width / 5 + L1 * Math.sin(theta1);
  let y1 = L1 * Math.cos(theta1) + canvas.height / 2;

  // 振り子2の座標計算
  let x2 = (canvas.width / 2)  + L2 * Math.sin(theta2);
  let y2 = L2 * Math.cos(theta2) + canvas.height / 2;
// 振り子3の座標計算
  let x3 = (canvas.width*4 / 5)  + L3 * Math.sin(theta3);
  let y3 = L3 * Math.cos(theta3) + canvas.height / 2;

  // 振り子1の棒の描画
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.moveTo(canvas.width / 5, canvas.height / 2);
  ctx.lineTo(x1, y1);
  ctx.stroke();

  // 振り子1の玉の描画
  ctx.beginPath();
  ctx.arc(x1, y1, 10, 0, Math.PI * 2);
  ctx.fill();
  // 振り子1の枠の描画
  ctx.strokeStyle = "gray";
  ctx.strokeRect(canvas.width / 5 - 100, canvas.height / 2 - L1-20 , 200, L1 + canvas.height / 2);

  // 振り子2の棒の描画
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.moveTo((canvas.width / 2) , canvas.height / 2);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  // 振り子2の玉の描画
  ctx.beginPath();
  ctx.arc(x2, y2, 10, 0, Math.PI * 2);
  ctx.fill();
  // 振り子2の枠の描画
  ctx.strokeStyle = "gray";
  ctx.strokeRect(canvas.width / 2 - 100, canvas.height / 2 - L1-20 , 200  , L1 + canvas.height / 2);

// 振り子3の棒の描画
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.moveTo((canvas.width*4 / 5) , canvas.height / 2);
  ctx.lineTo(x3, y3);
  ctx.stroke();

  // 振り子3の玉の描画
  ctx.beginPath();
  ctx.arc(x3, y3, 10, 0, Math.PI * 2);
  ctx.fill();
  // 振り子3の枠の描画
  ctx.strokeStyle = "gray";
  ctx.strokeRect(canvas.width*4 / 5 - 100, canvas.height / 2 - L1-20 , 200  , L1 + canvas.height / 2);

  // 時間の表示
  document.getElementById("info").innerText = `時間 : ${time.toFixed(2)}s`;

  if (anime) {
    // 振り子1の角加速度と更新
    alpha1 = -(G / L1) * Math.sin(theta1);
    omega1 += alpha1 * STEP;
    theta1 += omega1 * STEP;
    
    // 振り子2の角加速度と更新
    // 振り子2の見かけの重力加速度
    const g_eff2 = G + parseFloat(a2);
    alpha2 = -(g_eff2 / L2) * Math.sin(theta2);
    omega2 += alpha2 * STEP;
    theta2 += omega2 * STEP;

    // 振り子3の角加速度と更新
    // 振り子3の見かけの重力加速度と角度
    const g_eff3 = Math.sqrt(G * G + parseFloat(a3) * parseFloat(a3));
    const theta_eff3 = Math.atan(parseFloat(a3) / G);
    alpha3 = -(g_eff3 / L3) * Math.sin(theta3 + theta_eff3);
    omega3 += alpha3 * STEP;
    theta3 += omega3 * STEP;
    // 時間を更新
    time += STEP;
    if (time >= 50) {
      init(); // 初期化
      anime = false; // アニメーションを再開
      draw(); // 再描画
      return; // このフレームを終了
    }
    // アニメーションフレームの更新
    requestAnimationFrame(draw);
  }
}

// アニメーション開始
function startAnime() {
  if (anime) {
    anime = false;
    document.getElementById('btnAnime').value = '回答';
  } else {
    anime = true;
    draw();
    document.getElementById('btnAnime').value = '停止';
  }
}

// 初期化を呼び出す
init();


//////////////////////////////////////
$(document).ready(function () {
  // ラジオボタンが選択されたら回答ボタンを有効化
  $('input[name="q1"]').on('change', function () {
    // 選択されたラジオボタンがあれば回答ボタンを有効化
    if ($('input[name="q1"]:checked').length > 0) {
      $('#btnAnime').prop('disabled', false);
    }
  });

  // 回答ボタンが押されたときの処理
  $('#btnAnime').on('click', function () {
    const selectedAnswer = $('input[name="q1"]:checked').val();
    const explanation = `
      <p>振り子の周期 \( T \) は次の式で表されます：</p>
  <ul>
    <li>左側の振り子（通常の振り子）:
      \\[
      T = 2\\pi \\sqrt{\\frac{L}{g}}
      \\]
    </li>
    <li>中央の振り子（上に加速している場合）:
      \\[
      T = 2\\pi \\sqrt{\\frac{L}{g+a}}
      \\]
    </li>
    <li>右側の振り子（右に加速している場合）:
      \\[
      T = 2\\pi \\sqrt{\\frac{L}{\\sqrt{g^2 + a^2}}}
      \\]
    </li>
  </ul>
  <p>それぞれの周期は以下のような条件に依存します：</p>
  <ul>
    <li>左側（通常の振り子）は重力加速度 \\( g \\) のみ。</li>
    <li>中央（上に加速）は追加の加速度 \\( a \\) によって周期が短くなります。</li>
    <li>右側（右に加速）は \\( g \\) と \\( a \\) の合成加速度の影響を受けます。</li>
  </ul>
  <p>詳しくは、以下のリンクを参照してください：</p>
  <a href="https://www.youtube.com/watch?v=wkiFqukxaM8" target="_blank">高校物理　加速中の単振り子の周期</a>
`;

    if (selectedAnswer === "C") {
      $('.answer').html(`
        <p style="color:green;">正解！</p>
        ${explanation}
        <p>したがって、振り子3の説明が誤りです</p>
      `);
    } else {
      $('.answer').html(`
        <p style="color:red;">振り子3の説明が誤りです</p>
        ${explanation}
        <p>不正解。正しい答えは「C」です。振り子3は水平方向の加速度で周期が影響を受けます。</p>
      `);
    }
    // MathJaxを再実行して数式をレンダリング
    MathJax.typeset();
  });
});
