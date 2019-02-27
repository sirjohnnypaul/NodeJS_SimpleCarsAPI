
function setup() {
  createCanvas(1000,1000);

  drawData();
  console.log('Processing...');


  let button = select('#addCaBtn');
  button.mousePressed(sumbitCar);
}

function drawData() {
  loadJSON('all', gotData);
}

function sumbitCar() {
  let model = select('#model').value();
  let price = select('#price').value();

  console.log(model,price);
  loadJSON('add/'+model+'/'+price, finishedAdding);

  function finishedAdding(data) {
    console.log(data);
    drawData();
  }
}


function gotData(data) {
  background(51);
  console.log(data);
  var keys = Object.keys(data);
  //console.log(keys);
  
  for (let i = 0; i < keys.length; i++) {
    let car = keys[i];
    var price = data[car];
    var x = random(width);
    var y = random(height);
    fill(255);
    textSize(20);
    text(car,x,y);
  }
}

