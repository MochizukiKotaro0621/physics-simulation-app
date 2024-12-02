const canvas_1 = document.getElementById('myCanvas_1');
const ctx_1 = canvas_1.getContext('2d');

// グローバル変数の設定
const G_1 = 9.8; // 重力加速度
const STEP_1 = 0.05; // 時間刻み幅

// 振り子1
let L1_1 = parseFloat(document.getElementById("L1_1").value); // 長さの初期値
let theta1_1 = parseFloat(document.getElementById("theta_1").value) * (Math.PI / 180); // 初期角度（ラジアンに変換）
let omega1_1 = 0; // 初期角速度
let alpha1_1 = 0; // 角加速度

// 振り子2
let L2_1 = parseFloat(document.getElementById("L2_1").value); // 長さの初期値
let theta2_1 = parseFloat(document.getElementById("theta_1").value) * (Math.PI / 180); // 初期角度（ラジアンに変換）
let omega2_1 = 0; // 初期角速度
let alpha2_1 = 0; // 角加速度

let anime_1 = false; // アニメーションフラグ
let time_1 = 0; // 時間表示

// 初期化
function init_1() {
  L1_1 = parseFloat(document.getElementById('L1_1').value);
  L2_1 = parseFloat(document.getElementById('L2_1').value);
  theta1_1 = parseFloat(document.getElementById('theta_1').value) * (Math.PI / 180);
  theta2_1 = parseFloat(document.getElementById('theta_1').value) * (Math.PI / 180);
  omega1_1 = omega2_1 = alpha1_1 = alpha2_1 = 0;
  time_1 = 0;
  anime_1 = false;
  document.getElementById('btnAnime_1').value = '回答';
  draw_1();
}

// 振り子の描画
function draw_1() {
  ctx_1.strokeStyle = "black";
  ctx_1.clearRect(0, 0, canvas_1.width, canvas_1.height);
  ctx_1.strokeRect(0, 0, canvas_1.width, canvas_1.height);  // 枠線の描画

  // 中心線の描画
  ctx_1.strokeStyle = "lightgray";
  ctx_1.lineWidth = 2;              // 線の太さを設定
  ctx_1.setLineDash([5, 5]);        // 破線のパターン [破線の長さ, 間隔]
  ctx_1.beginPath();
  ctx_1.moveTo(canvas_1.width / 4, 0);
  ctx_1.lineTo(canvas_1.width / 4, canvas_1.height);
  ctx_1.stroke();
  ctx_1.moveTo(canvas_1.width - canvas_1.width / 4, 0);
  ctx_1.lineTo(canvas_1.width - canvas_1.width / 4, canvas_1.height);
  ctx_1.stroke();
  ctx_1.setLineDash([]);

  // 振り子1の座標計算
  let x1_1 = canvas_1.width / 4 + L1_1 * Math.sin(theta1_1);
  let y1_1 = L1_1 * Math.cos(theta1_1) + canvas_1.height / 2;

  // 振り子2の座標計算
  let x2_1 = (canvas_1.width / 4) * 3 + L2_1 * Math.sin(theta2_1);
  let y2_1 = L2_1 * Math.cos(theta2_1) + canvas_1.height / 2;

  // 振り子1の棒の描画
  ctx_1.strokeStyle = "black";
  ctx_1.beginPath();
  ctx_1.moveTo(canvas_1.width / 4, canvas_1.height / 2);
  ctx_1.lineTo(x1_1, y1_1);
  ctx_1.stroke();

  // 振り子1の玉の描画
  ctx_1.beginPath();
  ctx_1.arc(x1_1, y1_1, 10, 0, Math.PI * 2);
  ctx_1.fill();

  // 振り子2の棒の描画
  ctx_1.strokeStyle = "black";
  ctx_1.beginPath();
  ctx_1.moveTo((canvas_1.width / 4) * 3, canvas_1.height / 2);
  ctx_1.lineTo(x2_1, y2_1);
  ctx_1.stroke();

  // 振り子2の玉の描画
  ctx_1.beginPath();
  ctx_1.arc(x2_1, y2_1, 10, 0, Math.PI * 2);
  ctx_1.fill();

  // 時間の表示
  document.getElementById("info_1").innerText = `時間 : ${time_1.toFixed(2)}s`;

  if (anime_1) {
    // 振り子1の角加速度と更新
    alpha1_1 = -(G_1 / L1_1) * Math.sin(theta1_1);
    omega1_1 += alpha1_1 * STEP_1;
    theta1_1 += omega1_1 * STEP_1;

    // 振り子2の角加速度と更新
    alpha2_1 = -(G_1 / L2_1) * Math.sin(theta2_1);
    omega2_1 += alpha2_1 * STEP_1;
    theta2_1 += omega2_1 * STEP_1;

    // 時間を更新
    time_1 += STEP_1;
    if (time_1 >= 30) {
      init_1(); // 初期化
      anime_1 = false; // アニメーションを再開
      draw_1(); // 再描画
      return; // このフレームを終了
    }
    // アニメーションフレームの更新
    requestAnimationFrame(draw_1);
  }
}

// アニメーション開始
function startAnime_1() {
  if (anime_1) {
    anime_1 = false;
    document.getElementById('btnAnime_1').value = '回答';
  } else {
    anime_1 = true;
    draw_1();
    document.getElementById('btnAnime_1').value = '停止';
  }
}

// 初期化を呼び出す
init_1();

$(document).ready(function () {
  // ラジオボタンが選択されたら回答ボタンを有効化
  $('input[name="q1_1"]').on('change', function () {
    // 選択されたラジオボタンがあれば回答ボタンを有効化
    if ($('input[name="q1_1"]:checked').length > 0) {
      $('#btnAnime_1').prop('disabled', false);
    }
  });

  // 回答ボタンが押されたときの処理
  $('#btnAnime_1').on('click', function () {
    const selectedAnswer = $('input[name="q1_1"]:checked').val();
    const explanation = `
      <p>振り子の周期 \( T \) は次の式で表されます：</p>
      <p>\[
      T = 2π √(L / g)
      \]</p>
      <p>ここで：</p>
      <ul>
        <li>\( T \): 周期（秒）</li>
        <li>\( L \): 振り子の長さ（メートル）</li>
        <li>\( g \): 重力加速度（約9.8 m/s\(^2\)）</li>
      </ul>
      <p>この式から明らかなように、振り子の長さ \( L \) が増えると、周期 \( T \) も増加します。</p>
    `;

    if (selectedAnswer === "B") {
      $('.answer_1').html(`
        <p style="color:green;">正解！</p>
        ${explanation}
        <p>したがって、振り子の長さが長くなると周期は長くなります。</p>
      `);
    } else {
      $('.answer_1').html(`
        <p style="color:red;">不正解。</p>
        ${explanation}
        <p>正しい答えは「B」です。振り子の長さが長くなると周期は長くなります。</p>
      `);
    }
  });
});
