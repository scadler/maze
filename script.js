const canvas = document.getElementById("maze");
const context = canvas.getContext("2d");
var ctx = canvas.getContext('2d');
var algorithm = {
    x: 0,
    y: 0,
    complete: false,
}

function drawRect(x,y,w,h,color){
    ctx.fillStyle = color
    ctx.fillRect(x,y,w,h)
}
function createWalls(){
    drawRect(0,0,canvas.width,canvas.height,"#FFFFFF")
    var i = 0
    while(i < Math.round(canvas.height/25)){
        i++
        drawRect((i*25)-1, 0, 1,canvas.height,"#000")
        drawRect(0, (i*25)-1, canvas.width,1,"#000")
    }
}
createWalls()
function generateMaze(){
    const x = algorithm.x
    const y = algorithm.y
    
    drawRect(x, y, 24,24,"#0001fe")
    var i = 0
    var dir = [ [25,0], [0,25], [-25,0], [0,-25], ]
    var vel = [ [-1,0,1,24], [0,-1,24,1], [24,0,1,24], [0,24,24,1], ]
    var empty = []
    while(i<4){
        if(ctx.getImageData(x + dir[i][0], y + dir[i][1], 1, 1).data.includes(255)){
            empty.push(dir[i])
        }
        i++
        if(i === 4){
            console.log(empty)
        }
    }
    var v = Math.floor(Math.random()*empty.length)
    console.log(v)
    
    algorithm.x += dir[v][0]
    algorithm.y += dir[v][1]
    if(!ctx.getImageData(algorithm.x, algorithm.y, 1, 1).data.includes(1)){
    drawRect(algorithm.x + vel[v][0],algorithm.y + vel[v][1], vel[v][2],vel[v][3],"#0001fe")
    }
}

setInterval(() => { if(algorithm.complete === false){
     generateMaze() 
    }
},)