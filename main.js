time_data = {};

function lap(this_obj, club_name){
    const date1 = new Date();
    const lap_time = date1.getHours() + ':' + date1.getMinutes() + ':' +date1.getSeconds() + ':' +date1.getMilliseconds();

    const ranking_obj = document.getElementById('ranking');
    var new_club_obj = document.createElement('p');
    new_club_obj.textContent = club_name + '　　　' + lap_time;
    ranking_obj.appendChild(new_club_obj);

    time_data[club_name] = lap_time;
    console.log(time_data)
    this_obj.remove();
}


