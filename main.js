window.onload = function () {
  var url = new URL(window.location.href);
  var params = url.searchParams;
  const position = params.get("position");
  console.log(position);
  if (position == null) {
    window.location.href = "index.html";
  }
};

time_data = {};
var club_names = [
  "1. ソフトテニス部",
  "2. 将棋部",
  "3. ワンダーフォーゲルA",
  "4. ワンダーフォーゲルB",
  "5. ディベート同好会",
  "6. サッカーA",
  "7. サッカーB",
  "8. 柔道部",
  "9. 卓球部",
  "10. クイズ同好会",
  "11. 陸上A",
  "12. 陸上B",
  "13. 剣道部",
  "14. 生物研究部",
  "15. バスケットボールA",
  "16. バスケットボールB",
  "17. ソフトボール部",
  "18. 水泳部",
  "19. バドミントン部",
  "20. 硬式テニスA",
  "21. 硬式テニスB",
];
const club_num = club_names.length;

current_team_number = 1;

function lap(this_obj, club_name) {
  const date1 = new Date();
  const lap_time =
    date1.getHours() +
    ":" +
    date1.getMinutes() +
    ":" +
    date1.getSeconds() +
    ":" +
    date1.getMilliseconds();

  //テーブルに追加する部分
  var table_obj = document.getElementById("ranking").querySelector("tbody"); //追加先のテーブル
  const original_obj = document.getElementById("rank"); //コピペもとのテーブル
  var rank_obj = original_obj.cloneNode(true);
  var rowElem = rank_obj.rows[0]; //唯一のrow
  var rank_select = rowElem.getElementsByClassName("cp_sl02")[0];
  rank_select.options[get_club_num(club_name) + 1].selected = true; //選択なしの分＋１
  var rank_time = rowElem.getElementsByClassName("time")[0];
  rank_time.textContent = lap_time;
  var rank_number = rowElem.getElementsByClassName("number")[0];
  rank_number.textContent = current_team_number + "位";
  table_obj.appendChild(rowElem);

  var url = new URL(window.location.href);
  var params = url.searchParams;
  const position = params.get("position");
  console.log(position);
  //非同期通信でデータ送信
  send_current_team(position, current_team_number, club_name, lap_time);

  current_team_number++;
  this_obj.remove();
}

function get_club_num(club_name) {
  for (let i = 0; i < club_num; i++) {
    if (club_names[i] == club_name) {
      return i;
    }
  }
}

function send_current_team(position, rank, team, time) {
  //ここからjsonの作成
  data = {};
  data["position"] = position;
  console.log(position);
  data["rank"] = rank;
  data["team"] = team;
  data["time"] = time;
  json = JSON.stringify(data);
  console.log(json);

  var URL =
    "https://script.google.com/macros/s/AKfycbwBcY5kHzSO6_Wt8T7YxCqGk5GLPKCHG60TE4g3H1iPE-W0atOG4HSy7N4b0rJLwDnXyQ/exec";

  fetch(URL, {
    method: "POST",
    cache: "no-cache",
    mode: "no-cors",
    body: json,
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
      }
      return res.blob();
    })
    .then((blob) => {
      // blob にレスポンスデータが入る
      console.log("response:" + blob);
    })
    .catch((reason) => {
      console.log(reason);
    });
}
