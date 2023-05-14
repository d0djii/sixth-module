//document.addEventListener("DOMContentLoaded", ready);

/*document.addEventListener("DOMContentLoaded", function(event) {
    var elem = document.querySelector('.base_task');

let n; 
document.querySelector('#but').onclick = function() {
    n = document.getElementById("N");
        var table = document.createElement('table');

        for(var i = 0; i < N; i++){
            let tr = document.createElement('tr');
            for(var j = 0; j < N; j++){
                let td = document.createElement('td');
                tr.appendChild(td);
            }
            table.appendChild(tr);   
        }
        parent.appendChild(table);
    }
}
    
  );
*/

let obstacle = new Boolean(false);
let start = new Boolean(false);
let finish = new Boolean(false);

function createTable(){
    var elem = document.querySelector(".main_task");
    var dum = document.getElementById("main_dummy");
    var N = document.getElementById("main_N");
    if(N.value < 3 || N.value > 75)
        alert("nea")
    else {
        dum.parentNode.removeChild(dum);

    var table = document.createElement('table');

    for(var i = 0; i < N.value; i++) {
        var tr = document.createElement('tr');
        //tr.setAttribute('onclick','col(this)');
        for(var j = 0; j < N.value; j++){
            var td = document.createElement('td');
            var div = document.createElement('div');
            td.setAttribute('onclick','Color(this)');                   
            td.setAttribute('id','blank')   
            td.appendChild(div);
            tr.appendChild(td);
        }
        table.appendChild(tr);

    }
    table.setAttribute('id','main_dummy')
    elem.appendChild(table);
    }
    }

function Obstacle(){
    obstacle = true;
    start = false;
    finish = false;
}
function Start(){
    obstacle = false;
    start = true;
    finish = false;
} 
function Finish(){
    obstacle = false;
    start = false;
    finish = true;
} 

let ryad, stroka;


function Color(x){
    if(obstacle){
        var col = x.cellIndex;
        var row = x.parentNode.rowIndex;
        var td = document.getElementById('main_dummy').rows[row].cells[col];
        td.setAttribute('id','obstacle');
    }
    

}
