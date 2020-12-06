const canvas = document.getElementById("maze");
const context = canvas.getContext("2d");
var ctx = canvas.getContext('2d');
var algorithm = {
    x: 0,
    y: 0,
    complete: false,
    steps: 0,
    newSpot: false,
}
var dir = [ [50,0], [0,50], [-50,0], [0,-50], ]
var vel = [ [-1,0,1,49], [0,-1,49,1], [49,0,1,49], [0,49,49,1], ]
function drawRect(x,y,w,h,color){
    ctx.fillStyle = color
    ctx.fillRect(x,y,w,h)
}
function createWalls(){
    drawRect(0,0,canvas.width,canvas.height,"#FFFFFF")
    var i = 0
    while(i < Math.round(canvas.height/25)){
        i++
        drawRect((i*50)-1, 0, 1,canvas.height,"#000")
        drawRect(0, (i*50)-1, canvas.width,1,"#000")
    }
}
createWalls()
function newPos(){
    var nx = Math.floor(Math.random()*11)*50
    var ny = Math.floor(Math.random()*11)*50
    console.log(nx+" nx"+" "+ny+" ny")
    algorithm.x = nx
    algorithm.y = ny
    console.log("new pos")
    algorithm.newSpot = true
}
function generateMaze(){
    const x = algorithm.x
    const y = algorithm.y
    drawRect(x, y, 49,49,"#0001fe")
    var i = 0
    var empty = []
    while(i<4){
        if(ctx.getImageData(x + dir[i][0], y + dir[i][1], 1, 1).data.includes(255)){
            empty.push(dir[i])
        }
        i++
    }
    var v = Math.floor(Math.random()*empty.length)
    if(algorithm.x + dir[v][0] > 540){
        newPos()
    }
    else if(algorithm.x + dir[v][0] < 540){
        algorithm.x = algorithm.x + dir[v][0]
    }
    if(algorithm.y + dir[v][1] > 540){
        newPos()
    }
    else if(algorithm.y + dir[v][1] < 540){
        algorithm.y = algorithm.y + dir[v][1]
    }
    if(!ctx.getImageData(algorithm.x, algorithm.y, 1, 1).data.includes(1)){
        drawRect(algorithm.x + vel[v][0],algorithm.y + vel[v][1], vel[v][2],vel[v][3],"#0001fe")
        algorithm.steps += 1;
    }
}
setInterval(() => { if(algorithm.steps  <= 3900){
     generateMaze() 
    }
},)