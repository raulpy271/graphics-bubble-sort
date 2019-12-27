const default_rod= 10;
const default_milliseconds = 30;
const default_color='#000';
const thematic_color='#0c0';
var rod = default_rod;
var milliseconds = default_milliseconds;


try {
  var url = window.location.href;
  var search = ['rods', 'velocity'];
  rod = Number(RegExp(".*"+search[0]+"="+"(.*)"+"&").exec(url)[1])
  milliseconds = Number(RegExp(".*"+search[1]+"="+"(.*)").exec(url)[1])
  
  if (milliseconds =="" || rod == "" || rod > 20 || milliseconds > 5000){
    rod= default_rod;
    milliseconds = default_milliseconds;
  }
} 
catch(err) {
  rod= default_rod;
  milliseconds = default_milliseconds;
}


var height_rods = [];
for (var i=0;i<rod;i++){height_rods.push(get_random(100,400))}


function get_random(min, max){return Math.round(Math.random()*(max-min)+min);}


function create_rods(numbers_rods, id){
  for (var c=0;c<numbers_rods;c++){
    
    var element = document.querySelector(id);
    var new_element = document.createElement('div');
    var new_element_id = 'rod' + c;
    
    new_element.id=new_element_id;
    new_element.style.display='inline-block';
    new_element.style.backgroundColor=default_color;
    
    new_element.style.margin='6px';
    new_element.style.boxShadow='0 0 3px 3px '+thematic_color;
    new_element.style.width='50px';
    new_element.style.height=height_rods[c] + 'px';
    element.appendChild(new_element);
  }
}

function update(index1, index2){
  var id1 = 'div#rod' + index1;
  var id2 = 'div#rod' + index2;
  var element1 = document.querySelector(id1);
  var element2 = document.querySelector(id2);

  element1.style.height=height_rods[index1]+'px';
  element2.style.height=height_rods[index2]+'px';
}


function set_color(color, index) {
  var i, id, element;
  if (index === undefined){
    for (i=0;i<rod;i++){
      id = 'div#rod' + i;
      element = document.querySelector(id);
      element.style.backgroundColor=color;
    } 
  } else {
      id ='div#rod' + index;
      element = document.querySelector(id);
      element.style.backgroundColor=color;
  }
}


function bubblesort(crescent=true){

  var i = 0, c = 0, temp,bigger, logic_expression;
  var contador_total=0;
  
  logic_expression = function() {
    if (crescent) {return height_rods[i]>height_rods[i+1];}
    else {return height_rods[i]<height_rods[i+1];}
  }

  var for_loop= setInterval(function (){
    if (c >= rod-1){
      c=0; 
      set_color(default_color);
      clearInterval(for_loop);
      return contador_total;
    }

    if (i >= rod){c++; i=0; contador_total++;}
    
    else{
      bigger = i;
      if (logic_expression()){
        bigger = i+1;
        temp=height_rods[i];
        height_rods[i]=height_rods[i+1];
        height_rods[i+1]=temp;
        update(i,i+1);
      }
      contador_total++;
      set_color(default_color);
      set_color(thematic_color, bigger);
      i++;
    } 
  }, milliseconds);
}


function shuffle(){
  var c, id, element;
  for (c=0; c<rod;c++){
    height_rods[c] = (get_random(100,400));
    id = 'div#rod' + c;
    element = document.querySelector(id);
    element.style.height=height_rods[c]+'px';
  }
}

function start(){
  create_rods(rod, 'div.rods');
}
