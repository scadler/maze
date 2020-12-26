const canvas = document.getElementById("maze");
const context = canvas.getContext("2d");
var ctx = canvas.getContext('2d');
// var state = {
//     generated: false,
// }
var x, y, current;
var cols = []
var row = []
var grid = []
var cell
var neighbors = []
function drawRect(x,y,w,h,color){
    ctx.fillStyle = color
    ctx.fillRect(x,y,w,h)
}
function drawLine(x,y,w,h){
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000000"
    ctx.beginPath()
    ctx.moveTo(x,y)
    ctx.lineTo(w,h)
    ctx.stroke()
    
}
drawRect(0, 0, 20,20,"#0001fe")
function Cells(x,y){
    this.x = x;
    this.y = y;
    this.visited = false
    this.walls = [true, true, true, true]
    var c = x*20
    var r = y*20
    if(this.walls[0]){
        drawLine(c   ,r   ,c+20,r   )
    }
    if(this.walls[1]){
        drawLine(c+20,r   ,c+20,r+20)
    }
    if(this.walls[2]){
        drawLine(c+20,r+20,c   ,r+20)
    }
    if(this.walls[3]){
        drawLine(c   ,r+20,c   ,r   )
    }
    // console.log(this)
}
function index(i,j){
    if( i<0 || j<0 || i>19 || j>19){
        return -1
    }
    else{
    return (i *20) + j
    }
}
function checkBorders(c,r){
    console.log(grid[c * 20 + r])
    var top = grid[index(c-1,r)]
    var right = grid[index(c,r+1)]
    var left = grid[index(c,r-1)]
    var bottom = grid[index(c+1,r)]
    if(top && !top.visited){
        neighbors.push(top)
    }
    if(right && !right.visited){
        neighbors.push(right)
    }
    if(left && !left.visited){
        neighbors.push(left)
    }
    if(bottom && !bottom.visited){
        neighbors.push(bottom)
    }
    console.log(neighbors)
    if(neighbors.length > 0){
        var r = Math.floor(Math.random(0, neighbors.length))
        console.log(neighbors[r].x)
        checkBorders(neighbors[r].x,neighbors[r].y)
        drawRect(neighbors[r].x,neighbors[r].y,1,1,"#ffffff")
        return neighbors[r]
       
    }else{
        return undefined
    }
}
function createGrid(){
    for (var x=0; x<20; x++){
        for(var y=0; y<20;y++){
            var cell = new Cells(x,y)
            drawRect(x,y,1,1,"#ffffff")
            grid.push(cell)
        }
    }
}
current = grid[0]
function generate(){
    current.visited = true
    var next = current.checkBorders
    if(next){
        next.visited = true
        current = next
    }
    
}
createGrid()
checkBorders(1,1)
// setInterval(() => { if(algorithm.steps  <= 3900){
//      generateMaze() 
//     }
// },)