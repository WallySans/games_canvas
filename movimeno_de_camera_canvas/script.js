(function (){
  const cnv = document.querySelector("canvas");
  const ctx = cnv.getContext("2d");

  //recursos

  const backgroud = new Image();
  backgroud.src = "scene.png";

  const monster = new Image();
  monster.src = "monster.png";

  var mvLeft = mvRight = mvUp = mvDown = false

  window.addEventListener('keydown', function(e){
    let key = e.keyCode;
    switch(key) {
      case 37:
        mvLeft = true;
        break;
      case 39:
        mvRight = true;
        break;
      case 38:
        mvUp = true;
        break;
      case 40:
        mvDown =true;
        break;

    }
  },false)

  window.addEventListener('keyup', function(e){
    let key = e.keyCode;
    switch(key) {
      case 37:
        mvLeft = false;
        break;
      case 39:
        mvRight = false;
        break;
      case 38:
        mvUp = false;
        break;
      case 40:
        mvDown =false;
        break;

    }
  },false)
  //Objetos
  let sprites = [];
  let gameWorld = {
    img: backgroud,
    x:0,
    y:0,
    width:800,
    height: 600,
  };
  sprites.push(gameWorld);
  
  let char = {
    img: monster,
    x:0,
    y:0,
    width:64,
    height:64
  };
  sprites.push(char);

  var cam = {
    x:0,
    y:0,
    width: cnv.width,
    height: cnv.height,
    leftEdge: function (){
      return this.x + (this.width * 0.25);
    },
    rightEdge: function (){
      return this.x + (this.width * 0.75);
    },
    topEdge: function (){
      return this.y + (this.height * 0.25);
    },
    bottomEdge: function (){
      return this.y + (this.height * 0.75);
    }
  };
  //centralizar o monster;
  char.x = (gameWorld.width - char.width)/2;
  char.y = (gameWorld.height - char.height)/2;

  //centralizar a câmera
  cam.x = (gameWorld.width - cam.width)/2;
  cam.y = (gameWorld.height - cam.height)/2;

  function update() {
    if(mvLeft && !mvRight){
      char.x -= 2;
    }
    if(mvRight && !mvLeft){
      char.x += 2;
    }
    if(mvUp && !mvDown){
      char.y -= 2;
    }
    if(mvDown && !mvUp){
      char.y += 2;
    }
     //Limitar Char
    if(char.x < 0){
      char.x = 0;
    }
    if(char.x + char.width > gameWorld.width){
      char.x = gameWorld.width - char.width;
    }
    if(char.y < 0){
      char.y = 0;
    }
    if(char.y + char.height > gameWorld.height){
      char.y = gameWorld.height - char.height;
    }    

    //Atualizar a camera de acordo com char
    if(char.x < cam.leftEdge()){
      cam.x = char.x - (cam.width * 0.25);
    }
    if(char.x + char.width > cam.rightEdge()){
      cam.x = char.x + char.width -(cam.width *0.75);
    }
    if(char.y < cam.topEdge()){
      cam.y = char.y - (cam.height * 0.25);
    }
    if(char.y + char.width > cam.bottomEdge()){
      cam.y = char.y + char.height -(cam.width * 0.75);
    }

    //Limite da camera
    if(cam.x < 0){
      cam.x = 0;
    }
    if(cam.x + cam.width > gameWorld.width){
      cam.x = gameWorld.width - cam.width;
    }
    if(cam.y < 0){
      cam.y = 0;
    }
    if(cam.y + cam.height > gameWorld.height){
      cam.y = gameWorld.height - cam.height;
    }
  }
  function render() {
    ctx.save();
    ctx.translate(-cam.x, -cam.y);
    for(const i in sprites) {
      let spr = sprites[i];
      ctx.drawImage(spr.img,0,0,spr.width,spr.height,spr.x,spr.y,spr.width,spr.height);
    }
    ctx.restore();
    ctx.font ="bold 25px Arial"
    ctx.fillText("score:0",10,30)
  }

  function loop(){
    requestAnimationFrame(loop,cnv);
    update();
    render();
  }

  loop();
}())
