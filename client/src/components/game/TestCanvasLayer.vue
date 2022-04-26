<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: 'TestCanvasLayer',
    data() {
        return {
            wrapper: {} as any,
            canvasEl: {} as any,
            canvas: {} as any,
            background: {x: 0, y: 0, width: 512, height: 480},
            backgroundReady: false,
            backgroundImg: new Image(),
            charReady: false,
            charImg: new Image(),
            char: {
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
            keysDown: {} as any,
            then: Date.now(),
            now: Date.now()
        }
    },
    async mounted() {
        this.wrapper = document.getElementById('gameWrapper')
        this.canvasEl = document.createElement('canvas');
        this.canvas = await this.canvasEl.getContext('2d');
        this.canvasEl.width = 1028;
        this.canvasEl.height = 768;
        this.wrapper?.appendChild(this.canvasEl)

        this.backgroundImg.onload = () => {
            this.backgroundReady = true;
        };
        this.backgroundImg.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/15388/background.png';

        this.charImg.onload = () => {
            this.charReady = true;
        };
        this.charImg.src = '/public/dude.png';

        this.canvas?.drawImage(this.backgroundImg, this.background.x, this.background.y);
        this.canvas?.drawImage(this.charImg,
            this.char.spriteX,
            this.char.spriteY, this.char.width, this.char.height, this.char.x, this.char.y, this.char.width, this.char.height);


    },
    methods: {
        render() {
            this.canvas?.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
            if (this.char.moving) {
                if (this.char.animateTime > 0) {
                    this.char.animateTime--;
                } else {
                    if (this.char.animateCur + 1 < this.char.animatePos.length) {
                        this.char.animateCur++;
                        this.char.spriteY = this.char.animatePos[this.char.animateCur];
                    } else {
                        this.char.animateCur = 0;
                        this.char.spriteY = this.char.animatePos[0];
                    }
                    this.char.animateTime = 2;
                }
            }

            if (this.backgroundReady) {
                this.canvas?.drawImage(this.backgroundImg, this.background.x, this.background.y);
            }

            if (this.charReady) {
                this.canvas?.drawImage(this.charImg, this.char.spriteX, this.char.spriteY, this.char.width, this.char.height, this.char.x, this.char.y, this.char.width, this.char.height);
            }
        },
        mainInterval() {
            this.now = Date.now();
            var delta = this.now - this.then;

            // this.update(delta / 1000);
            this.render();

            this.then = this.now;
            console.log('test')
            requestAnimationFrame(this.mainInterval);

        },
        test() {
            this.canvas?.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
        },
    },
});
</script>
<template>
    <button @click="test">delete</button>
    <div id="gameWrapper"></div>
</template>

<style lang="sass" scoped>
#gameWrapper
    width: 1080px
    border: 1px solid #37B487
    margin: 20px auto
</style>