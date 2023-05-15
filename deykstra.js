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

//


//базовые значения кнопок
let obstacle = new Boolean(false);
let start = new Boolean(false);
let finish = new Boolean(false);

function createTable(){
    var elem = document.querySelector(".main_task");
    var dum = document.getElementById("main_dummy");
    var N = document.getElementById("main_N").value;
    //console.log(N);
    if(N < 3 || N > 75)
        alert("3<=N<=75")
    else {
//создание таблицы
        dum.parentNode.removeChild(dum);

        var table = document.createElement('table');

        for(var i = 0; i < N; i++) {
            var tr = document.createElement('tr');
            for(var j = 0; j < N; j++){
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


//смена состояний кнопок
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

//*temp* значения финиша и старта
let ryad1, stroka1, ryad2, stroka2;

//функция расскраски
function Color(x){
    //сброс покраски маршрута
    var len = document.getElementById('main_dummy').rows.length;
    for(i = 0; i < len; i++){
        for(j = 0; j < len; j++){
            let colored = document.getElementById('main_dummy').rows[i].cells[j];
            if((colored.getAttribute('id'))=='path')
                colored.setAttribute('id','blank')
        }

    }
    let col = x.cellIndex;
    let row = x.parentNode.rowIndex;
    let td = document.getElementById('main_dummy').rows[row].cells[col];
    let id = td.getAttribute('id');
    if(obstacle){
        if(id!="start" || id!="finish")
            td.setAttribute('id','obstacle');
        else
            alert("Нельзя ставить Преграды на Старт или Финиш");
        
    }
    else if(start){
        if(id=="blank"){
            if(ryad1 == undefined && stroka1 == undefined){
                ryad1 = col;
                stroka1 = row;
                td.setAttribute('id','start');
            }
            else{
                let td1 = document.getElementById('main_dummy').rows[stroka1].cells[ryad1];
                let id1 = td1.getAttribute('id');
                if(id1=="start"){
                    td1.setAttribute('id', 'blank');
                }
                let col = x.cellIndex;
                let row = x.parentNode.rowIndex;
                ryad1 = col;
                stroka1 = row;
                let td2 = document.getElementById('main_dummy').rows[row].cells[col];
                td2.setAttribute('id','start');
    
            }
        }
        else
            alert("Поставьте Старт на пустую клетку");
        
        
    }
    else if(finish){
        if(id=="blank"){
            if(ryad2 == undefined && stroka2 == undefined){
                ryad2 = col;
                stroka2 = row;
                td.setAttribute('id','finish');
            }
            else{
                let td1 = document.getElementById('main_dummy').rows[stroka2].cells[ryad2];
                let id1 = td1.getAttribute('id');
                if(id1=="finish"){
                    td1.setAttribute('id', 'blank');
                }
                let col = x.cellIndex;
                let row = x.parentNode.rowIndex;
                ryad2 = col;
                stroka2 = row;
                let td2 = document.getElementById('main_dummy').rows[row].cells[col];
                td2.setAttribute('id','finish');
    
            }
        }
        else
            alert("Поставьте Финиш на пустую клетку");
        
        
    }
}






function Star(){
    var openSet = [];
    var closedSet = [];
    var len = document.getElementById('main_dummy').rows.length;
    console.log(len);
    var n = 0;
    for(i=0;i<len;i++){
        n++;
    }
        
    console.log(n);



//Создаю матрицу для алгоритма
    var arr = new Array(n);
    for(var i = 0; i < n; i++){
        arr[i] = new Array(n);
    }
    for(var i = 0; i < n; i++){
        for(var j = 0; j < n; j++){
            arr[i][j] = new Spot(i,j);
        }
    }

    for(var i = 0; i < n; i++){
        for(var j = 0; j < n; j++){
            arr[i][j].addNeighbours(arr);
        }
    }

    for(i = 0; i < n; i++){
        for(j = 0; j < n; j++){
            var colored = document.getElementById('main_dummy').rows[j].cells[i];
            console.log(colored);
            if((colored.getAttribute('id'))=='obstacle'){
                arr[i][j].obstacle = true;
            }
                
        }

    }

    console.log(arr);


//*Struct*
    function Spot(i,j){
        this.i = i;
        this.j = j;
        this.f= 0;
        this.g = 0;
        this.h = 0;
        this.neighbours = [];
        this.previous = undefined;
        this.obstacle = false;
    
        this.addNeighbours = function (arr) {
            var i = this.i;
            var j = this.j;
            var cols = n;
            var rows = n;
            if(i < cols-1)
                this.neighbours.push(arr[i + 1][j]);
            if(i > 0)
                this.neighbours.push(arr[i - 1][j]);
            if(j < rows-1)
                this.neighbours.push(arr[i][j+1]);
            if(j > 0)
                this.neighbours.push(arr[i][j - 1]);
        }
    }

    function RemoveFromArray(arr, elem){
        for(var i = arr.length - 1; i >= 0; i--){
            if(arr[i]== elem);
                arr.splice(i,1);
        }
    }
    //Расстояние городских кварталов
    function do_Math(a,b){
        var d = Math.abs(a.i - b.i) + Math.abs(a.j - b.j);
        return d;
    }

    var start = document.getElementById('start');
    var tempend = document.getElementById('finish');
    console.log(start);
    console.log(tempend);
    let tempcolS = start.cellIndex;
    let temprowS = start.parentNode.rowIndex;
    let tempcolE = tempend.cellIndex;
    let temprowE = tempend.parentNode.rowIndex;
    var path = [];

    let colS = 0;
    for(var i = 0; i<tempcolS; i++){
        colS++;
    }
    let rowS = 0;
    for(var i = 0; i<temprowS; i++){
        rowS++;
    }
    let colE = 0;
    for(var i = 0; i<tempcolE; i++){
        colE++;
    }
    let rowE = 0;
    for(var i = 0; i<temprowE; i++){
        rowE++;
    }
    console.log('col ', colE, ' row ', rowE)
    var end = arr[colE][rowE];
    console.log('col ', colS, ' row ', rowS)
    openSet.push(arr[colS][rowS]);

    while(openSet.length > 0){
        console.log('Openset= ',openSet);
        var winner = 0;
        for(var i = 0; i < openSet.length; i++){
            if (openSet[i].f < openSet[winner].f){
                winner = i;
            }
        }
        var current = openSet[winner];
        if(openSet[winner] === end){
            for(var i = path.length-1; i >= 0; i--){
                let coloring = document.getElementById('main_dummy').rows[path[i].j].cells[path[i].i];
                console.log('krasim: ', coloring);
                if((coloring.getAttribute('id'))=='blank')
                coloring.setAttribute('id','path');
            }
            console.log("сделал");
            return 0;
        }
        RemoveFromArray(openSet, current);
        closedSet.push(current); 
        var neighbours = current.neighbours;
        for(var i = 0; i < neighbours.length; i++){
            var neighbour = neighbours[i];

            if(!closedSet.includes(neighbour) && !neighbour.obstacle){
                var tempg = current.g + 1;

                var newpath = false;
                if(openSet.includes(neighbour)){
                    if(tempg < neighbour.g){
                        neighbour.g = tempg;
                        newpath = true;
                    }

                }
                else {
                    neighbour.g = tempg;
                    newpath = true;
                    openSet.push(neighbour);
                }
                if(newpath){
                neighbour.h = do_Math(neighbour, end);
                neighbour.f = neighbour.g + neighbour.h;
                neighbour.previous = current;
                }
                
            }
        }
        
        path = [];
        var temp = current;
        path.push(temp);
        while(temp.previous){
            path.push(temp.previous);
            temp = temp.previous;
        }
        if(path.length < 1){
            alert("Нет пути");
            return 0;
        }
        console.log(path);
        console.log(closedSet);
    }

}
