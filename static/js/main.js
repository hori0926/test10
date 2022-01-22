time_data = {};
var club_names = ['club1','club2','club3'];
const club_num = club_names.length;

current_team_number = 1;


function lap(this_obj, club_name){
    const date1 = new Date();
    const lap_time = date1.getHours() + ':' + date1.getMinutes() + ':' +date1.getSeconds() + ':' +date1.getMilliseconds();
    
    //テーブルに追加する部分
    var table_obj = document.getElementById('ranking').querySelector('tbody'); //追加先のテーブル
    const original_obj = document.getElementById('rank'); //コピペもとのテーブル
    var rank_obj = original_obj.cloneNode(true);
    var rowElem = rank_obj.rows[0];  //唯一のrow
    var rank_select = rowElem.getElementsByClassName('cp_sl02')[0];
    rank_select.options[get_club_num(club_name)].selected = true;
    var rank_time = rowElem.getElementsByClassName('time')[0];
    rank_time.textContent = lap_time;
    var rank_number = rowElem.getElementsByClassName('number')[0];
    rank_number.textContent = current_team_number + '位';
    table_obj.appendChild(rowElem);

    const position = document.getElementById('position').getAttribute('value')
    console.log(position)
    //非同期通信でデータ送信
    send_current_team(position,current_team_number,club_name,lap_time);

    current_team_number++;
    this_obj.remove();
}

function get_club_num(club_name){
    for(let i=0;i<club_num;i++){
        if(club_names[i]==club_name){
            return i;
        }
    }
}

function send_current_team(position, rank, team, time){
    //ここからjsonの作成
    data = {}
    data['position'] = position
    console.log(position)
    data['rank'] = rank
    data['team'] = team
    data['time'] = time
    json = JSON.stringify(data)
    console.log(json)


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('message').innerText = this.responseText;
        }
    };
    xhttp.open("POST", "http://127.0.0.1:5000//record", true);
    // POSTはURLにパラメータを載せないので、以下のようにやるよ
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send('data='+json);
}

//ここから下はメモ
window.onload = function(){
    const position = document.getElementById('position').getAttribute('value')
    console.log(position)
}



function check() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('message').innerText = this.responseText;
        }
    };
    const user_name = document.getElementById('user_name').value;
    // ここのURLはFlask起動時に表示されるURLにすること
    xhttp.open("GET", `http://127.0.0.1:5000/?name=${user_name}`, true);
    xhttp.send();
}

function register() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('message').innerText = this.responseText;
        }
    };
    const user_name = document.getElementById('user_name').value;
    xhttp.open("POST", "http://127.0.0.1:5000//test", true);
    // POSTはURLにパラメータを載せないので、以下のようにやるよ
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`name=${user_name}`);
}


