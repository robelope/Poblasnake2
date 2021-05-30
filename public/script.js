const nokia = 400;
const DIR = {
            KeyS:[0,1],
            KeyW:[0,-1],
            KeyA:[-1,0],
            KeyD:[1,0],
            ArrowDown:[0,1],
            ArrowUp:[0,-1],
            ArrowLeft:[-1,0],
            ArrowRight:[1,0]
        }
const pobla = {
    x: 0,
    y: 0,
    width: 300,
    height: 300,
    frameX: 0,
    frameY: 0,
    veloc: 9,
    mueve: false
};
const playerSprite = new Image();
    playerSprite.src = ""
let cont = {
            direccion:{x:1, y:0},
            bicho:[{x:0, y:0}],
            comida:{x:0, y:250},
            jugando: false,
            crecer: 0,
            IV: 80
            
        }
    let mov
    let pantalla = document.querySelector('canvas');
    let ctx = pantalla.getContext('2d')
    pantalla.width = 400; 
    pantalla.height = 400;
    ctx.fillStyle = "dimgray";
    ctx.fillRect(10,10,10,10);

        let loop = () => {
            let cola = {}
            
            Object.assign(cola, cont.bicho[cont.bicho.length-1])
            const ph = cont.bicho[0];
            let comio = ph.x === cont.comida.x && ph.y === cont.comida.y;
            if (checkCol()) {
                cont.jugando = false;
                reinic()
            }
            let dx = cont.direccion.x;
            let dy = cont.direccion.y;
            let largo = cont.bicho.length-1;
            if(cont.jugando){
            for (let x = largo; x>-1; x--){
                const ph = cont.bicho[x]
                if(x===0){
                    ph.x += dx;
                    ph.y += dy;
                }
                else{
                    ph.x = cont.bicho[x-1].x;
                    ph.y = cont.bicho[x-1].y;
                }
            }
        };
            
            if(comio){
                cont.crecer += 1;
                
                cont.IV -=5;
                remorfi();
            }
            if(cont.crecer>0){
                cont.bicho.push(cola);
                cont.crecer -= 1;
            }
            requestAnimationFrame(dibujar)
            setTimeout(loop, cont.IV)
        }

        let checkCol = () =>{
            const h = cont.bicho[0];
            if (h.x < 0 || h.x >= nokia/7 || h.y < 0 || h.y>=nokia/7){
                return true;
            }
            for (let sx = 1; sx < cont.bicho.length; sx++){
                const ph = cont.bicho[sx];
                if(ph.x === h.x && ph.y === h.y){
                    return true;
                }
            }
        }

        document.onkeydown = (e)=>{
            mov = DIR[e.code];
            const [x, y] = mov;
            if(-x !== cont.direccion.x && -y !== cont.direccion.y){
            cont.direccion.x=x;
            cont.direccion.y=y;
            }
        }


        let dibujar = (color) =>{
            ctx.clearRect(0,0,nokia,nokia);
            ctx.font = "20px Georgia";
            ctx.strokeText("Escore: ", 300, 30);
            for(let xc=0; xc<cont.bicho.length; xc++){
                const {x, y} = cont.bicho[xc];
                dibujarCoso('dimgray', x, y);
            }
            
            const comida = cont.comida;
            dibujarCoso('darkslategray', comida.x, comida.y);
        }
        let dibujarCoso = (color, x, y) =>{
            ctx.fillStyle = color;
            ctx.fillRect(x*7,y*7,20,20)
        }
        let rand = () =>{
            let dir = Object.values(DIR)
            return{
                x:parseInt(Math.random()*nokia/10),
                y:parseInt(Math.random()*nokia/10),
                d:dir[parseInt(Math.random()*10)]
            }
        }
        let remorfi = () =>{
            let newPos = rand();
            let morfi = cont.comida;
            morfi.x = newPos.x;
            morfi.y = newPos.y;
        }

        let reinic = () =>{
            cont = {
            direccion:{x:1, y:0},
            bicho:[{x:0, y:0}],
            comida:{x:0, y:250},
            jugando: false,
            crecer: 0,
            IV: 80
            }
            let pos=rand();
            let ph = cont.bicho[0]
            ph.x = pos.x;
            ph.y = pos.y;
            cont.direccion.x = pos.d[0];
            cont.direccion.y = pos.d[1];
            
            posmorfi = rand();
            let morfi = cont.comida;
            morfi.x = posmorfi.x;
            morfi.y = posmorfi.y;
            cont.jugando = true;
        }


        window.onload = () =>{
            loop();
            reinic();
            
        }   