<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    data() {
        return{
            wrapper:{} as any,
            canvasEl:{} as any,
            canvas:{} as any,
            background:{x: 0, y: 0, width: 512, height: 480},
            backgroundReady:false,
            backgroundImg:new Image(),
            charReady:false,
            charImg:new Image(),
            char:{
                x: 50,
                y: 50,
                width: 20,
                height: 42,
                spriteX: 0,
                spriteY: 0,
                speed: 150,
                edgeRegion: 50,
                moving: false,
                animateTime: 2,
                animateCur: 0,
                animatePos: [0, 42, 84, 42, 0, 128, 170, 128]
            },
            keysDown:{} as any,
            then:Date.now(),
            now:Date.now()
        }
    },
    mounted() {
        this.wrapper = document.getElementById('gameWrapper')
        this.canvasEl = document.createElement('canvas');
        this.canvas = this.canvasEl.getContext('2d');
        this.canvasEl.width = 450;
        this.canvasEl.height = 300;
        this.wrapper?.appendChild(this.canvasEl)

        this.backgroundImg.onload = ()=>{
            this.backgroundReady = true;
        };
        this.backgroundImg.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/15388/background.png';

        this.charImg.onload = ()=>{
            this.charReady = true;
        };
        this.charImg.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/15388/knightd25b8b7e.png';

        addEventListener('keydown',  (e)=> {
            this.char.moving = true;
            this.keysDown[e.keyCode] = true;
        }, false);

        addEventListener('keyup', (e)=> {
            this.char.moving = false;
            delete this.keysDown[e.keyCode];
        }, false);


        this.render();
        this.then = Date.now();
        this.mainInterval();
    },
    methods:{

        update(modifier:any){
            if(37 in this.keysDown){
                this.char.spriteX = 170;
                if(Math.round(this.char.x) > this.char.edgeRegion){
                    this.char.x -= this.char.speed * modifier;
                } else {
                    if(Math.round(this.background.x) < 0){
                        this.background.x += this.char.speed * modifier;
                    } else if(Math.round(this.char.x) > 0){
                        this.char.x -= this.char.speed * modifier;
                    }
                }
            }
            if(38 in this.keysDown){
                this.char.spriteX = 74;
                if(Math.round(this.char.y) > this.char.edgeRegion){
                    this.char.y -= this.char.speed * modifier;
                } else {
                    if(Math.round(this.background.y) < 0){
                        this.background.y += this.char.speed * modifier;
                    } else if(Math.round(this.char.y) > 0){
                        this.char.y -= this.char.speed * modifier;
                    }
                }
            }
            if(39 in this.keysDown){
                this.char.spriteX = 148;
                if((Math.round(this.char.x) + this.char.width) < (this.canvasEl.width - this.char.edgeRegion)){
                    this.char.x += this.char.speed * modifier;
                } else {
                    if(Math.round(this.background.x) > (this.canvasEl.width - this.background.width)){
                        this.background.x -= this.char.speed * modifier;
                    } else if((Math.round(this.char.x) + this.char.width) < this.canvasEl.width){
                        this.char.x += this.char.speed * modifier;
                    }
                }
            }
            if(40 in this.keysDown){
                this.char.spriteX = 0;
                if((Math.round(this.char.y) + this.char.height) < (this.canvasEl.height - this.char.edgeRegion)){
                    this.char.y += this.char.speed * modifier;
                } else {
                    if(Math.round(this.background.y) > (this.canvasEl.height - this.background.height)){
                        this.background.y -= this.char.speed * modifier;
                    } else if((Math.round(this.char.y) + this.char.height) < this.canvasEl.height){
                        this.char.y += this.char.speed * modifier;
                    }
                }
            }

            if(37 in this.keysDown && 38 in this.keysDown){
                this.char.spriteX = 124;
            }
            if(38 in this.keysDown && 39 in this.keysDown){
                this.char.spriteX = 100;
            }
            if(39 in this.keysDown && 40 in this.keysDown){
                this.char.spriteX = 50;
            }
            if(40 in this.keysDown && 37 in this.keysDown){
                this.char.spriteX = 26;
            }
        },
        render() {
            this.canvas?.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
            if(this.char.moving){
                if(this.char.animateTime > 0){
                    this.char.animateTime--;
                } else {
                    if(this.char.animateCur + 1 < this.char.animatePos.length){
                        this.char.animateCur++;
                        this.char.spriteY = this.char.animatePos[this.char.animateCur];
                    } else {
                        this.char.animateCur = 0;
                        this.char.spriteY = this.char.animatePos[0];
                    }
                    this.char.animateTime = 2;
                }
            }

            if(this.backgroundReady){
                this.canvas?.drawImage(this.backgroundImg, this.background.x, this.background.y);
            }

            if(this.charReady){
                this.canvas?.drawImage(this.charImg, this.char.spriteX, this.char.spriteY, this.char.width, this.char.height, this.char.x, this.char.y, this.char.width, this.char.height);
            }
        },
        mainInterval() {
            this.now = Date.now();
            var delta = this.now - this.then;

            this.update(delta / 1000);
            this.render();

            this.then = this.now;
            requestAnimationFrame(this.mainInterval);
        },
    },
});
</script>
<template>
    <div id="gameWrapper">

    </div>
</template>

<style lang="sass" scoped>
#gameWrapper
    width: 1080px
    margin: 20px auto
</style>