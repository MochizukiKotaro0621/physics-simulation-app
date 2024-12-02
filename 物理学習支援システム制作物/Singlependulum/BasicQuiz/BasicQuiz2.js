const canvas_2 = document.getElementById('myCanvas_2');
const ctx_2 = canvas_2.getContext('2d');

// グローバル変数の設定
const G_2 = 9.8; // 重力加速度
const STEP_2 = 0.05; // 時間刻み幅

// 振り子1
let L1_2 = parseFloat(document.getElementById("L_2").value); // 長さの初期値
let theta1_2 = parseFloat(document.getElementById("theta1_2").value) * (Math.PI / 180); // 初期角度（ラジアンに変換）
let omega1_2 = 0; // 初期角速度
let alpha1_2 = 0; // 角加速度

// 振り子2
let L2_2 = parseFloat(document.getElementById("L_2").value); // 長さの初期値
let theta2_2 = parseFloat(document.getElementById("theta2_2").value) * (Math.PI / 180); // 初期角度（ラジアンに変換）
let omega2_2 = 0; // 初期角速度
let alpha2_2 = 0; // 角加速度

let anime_2 = false; // アニメーションフラグ
let time_2 = 0; // 時間表示

// 初期化
function init_2() {
  L1_2 = parseFloat(document.getElementById('L_2').value);
  L2_2 = parseFloat(document.getElementById('L_2').value);
  theta1_2 = parseFloat(document.getElementById('theta1_2').value) * (Math.PI / 180);
  theta2_2 = parseFloat(document.getElementById('theta2_2').value) * (Math.PI / 180);
  omega1_2 = omega2_2 = alpha1_2 = alpha2_2 = 0;
  time_2 = 0;
  anime_2 = false;
  document.getElementById('btnAnime_2').value = '回答';
  draw_2();
}

// 振り子の描画
function draw_2() {
  ctx_2.strokeStyle = "black";
  ctx_2.clearRect(0, 0, canvas_2.width, canvas_2.height);
  ctx_2.strokeRect(0, 0, canvas_2.width, canvas_2.height);  // 枠線の描画

  // 中心線の描画
  ctx_2.strokeStyle = "lightgray";
  ctx_2.lineWidth = 2;              // 線の太さを設定
  ctx_2.setLineDash([5, 5]);        // 破線のパターン [破線の長さ, 間隔]
  ctx_2.beginPath();
  ctx_2.moveTo(canvas_2.width / 4, 0);
  ctx_2.lineTo(canvas_2.width / 4, canvas_2.height);
  ctx_2.stroke();
  ctx_2.moveTo(canvas_2.width - canvas_2.width / 4, 0);
  ctx_2.lineTo(canvas_2.width - canvas_2.width / 4, canvas_2.height);
  ctx_2.stroke();
  ctx_2.setLineDash([]);

  // 振り子1の座標計算
  let x1_2 = canvas_2.width / 4 + L1_2 * Math.sin(theta1_2);
  let y1_2 = L1_2 * Math.cos(theta1_2) + canvas_2.height / 2;

  // 振り子2の座標計算
  let x2_2 = (canvas_2.width / 4) * 3 + L2_2 * Math.sin(theta2_2);
  let y2_2 = L2_2 * Math.cos(theta2_2) + canvas_2.height / 2;

  // 振り子1の棒の描画
  ctx_2.strokeStyle = "black";
  ctx_2.beginPath();
  ctx_2.moveTo(canvas_2.width / 4, canvas_2.height / 2);
  ctx_2.lineTo(x1_2, y1_2);
  ctx_2.stroke();

  // 振り子1の玉の描画
  ctx_2.beginPath();
  ctx_2.arc(x1_2, y1_2, 10, 0, Math.PI * 2);
  ctx_2.fill();

  // 振り子2の棒の描画
  ctx_2.strokeStyle = "black";
  ctx_2.beginPath();
  ctx_2.moveTo((canvas_2.width / 4) * 3, canvas_2.height / 2);
  ctx_2.lineTo(x2_2, y2_2);
  ctx_2.stroke();

  // 振り子2の玉の描画
  ctx_2.beginPath();
  ctx_2.arc(x2_2, y2_2, 10, 0, Math.PI * 2);
  ctx_2.fill();

  // 時間の表示
  document.getElementById("info_2").innerText = `時間 : ${time_2.toFixed(2)}s`;

  if (anime_2) {
    // 振り子1の角加速度と更新
    alpha1_2 = -(G_2 / L1_2) * Math.sin(theta1_2);
    omega1_2 += alpha1_2 * STEP_2;
    theta1_2 += omega1_2 * STEP_2;

    // 振り子2の角加速度と更新
    alpha2_2 = -(G_2 / L2_2) * Math.sin(theta2_2);
    omega2_2 += alpha2_2 * STEP_2;
    theta2_2 += omega2_2 * STEP_2;

    // 時間を更新
    time_2 += STEP_2;
    if (time_2 >= 30) {
      init_2(); // 初期化
      anime_2 = false; // アニメーションを再開
      draw_2(); // 再描画
      return; // このフレームを終了
    }
    // アニメーションフレームの更新
    requestAnimationFrame(draw_2);
  }
}

// アニメーション開始
function startAnime_2() {
  if (anime_2) {
    anime_2 = false;
    document.getElementById('btnAnime_2').value = '回答';
  } else {
    anime_2 = true;
    draw_2();
    document.getElementById('btnAnime_2').value = '停止';
  }
}

// 初期化を呼び出す
init_2();

/////////////////////////////////////////////////////////////
$(document).ready(function () {
  // ラジオボタンが選択されたら回答ボタンを有効化
  $('input[name="q1_2"]').on('change', function () {
    // 選択されたラジオボタンがあれば回答ボタンを有効化
    if ($('input[name="q1_2"]:checked').length > 0) {
      $('#btnAnime_2').prop('disabled', false);
    }
  });

  // 回答ボタンが押されたときの処理
  $('#btnAnime_2').on('click', function () {
    const selectedAnswer = $('input[name="q1_2"]:checked').val();
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
      <p>この式から明らかなように、角度（ふり幅）は周期に影響を与えません．</p>
    `;

    if (selectedAnswer === "C") {
      $('.answer_2').html(`
        <p style="color:green;">正解！</p>
        ${explanation}
        <p>正解！角度によらず周期は同じです</p>
      `);
    } else {
      $('.answer_2').html(`
        <p style="color:red;">不正解。</p>
        ${explanation}
        <p>不正解。正しい答えは「C」です。</p>
      `);
    }
  });
});

