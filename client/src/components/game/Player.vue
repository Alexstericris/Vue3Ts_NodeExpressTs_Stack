<script lang="ts">
import {defineComponent} from "vue";
import type {PropType} from "vue";
import type {Character} from "@/types/gametypes";
import GameApi from "@/apis/GameApi";
import {mapState} from "vuex";

export default defineComponent({
    name:'Player',
    props: {
        character: {
            type:Object as PropType<Character>,
            required:true
        },
    },
    data() {
        return {
            playerSize:50,
            xAxis: 100,
            yAxis: 100,
            xDir: '',
            yDir: '',
            direction: '',
            ticks: 0,
            ticksRate:10,
            acceleration: 1,
            velocity: 0,
            maxVelocity: 10,
            heading: '',
            gameLoop: null,
            mainSVG:document.getElementById('mainSVG')
        }
    },
    computed: {
        ...mapState(['socket']),
        inputs() {
            return this.xDir || this.yDir;
        },
        noInputs() {
            return !this.xDir && !this.yDir;
        },

    },
    created() {
        this.setStartingPosition();
        this.loop();
        let keyDownHandler=(event:KeyboardEvent)=>{
            event.preventDefault();
            if(event.key==="Escape"){
                window.removeEventListener('keydown',keyDownHandler,false)
            }
            if (event.key === 'ArrowUp' || event.key === 'w') {
                this.yDir = 'up';
            }
            if (event.key === 'ArrowLeft' || event.key === 'a') {
                this.xDir = 'left';
            }
            if (event.key === 'ArrowDown' || event.key === 's') {
                this.yDir = 'down';
            }
            if (event.key === 'ArrowRight' || event.key === 'd') {
                this.xDir = 'right';
            }
            this.direction = this.yDir + this.xDir;
        }
        let keyUpHandler=(event:KeyboardEvent)=>{
            event.preventDefault();
            if(event.key==="Escape"){
                window.removeEventListener('keydown',keyUpHandler,false)
            }
            if (['ArrowUp', 'ArrowDown', 'w', 's'].includes(event.key)) {
                this.yDir = '';
            }
            if (['ArrowLeft', 'ArrowRight', 'a', 'd'].includes(event.key)) {
                this.xDir = '';
            }
        }
        window.addEventListener("keydown",keyDownHandler);
        window.addEventListener("keyup",keyUpHandler);
    },
    methods: {
        loop() {
            this.ticks++
            this.update()
            requestAnimationFrame(this.loop)
        },
        setStartingPosition() {
            this.xAxis = this.character.position.xAxis;
            this.yAxis = this.character.position.yAxis;
        },
        update() {
            if (this.inputs) {
                if (this.ticks % this.ticksRate === 0) {
                    if (this.velocity < this.maxVelocity) {
                        this.velocity += this.acceleration
                    } else {
                        this.velocity = this.maxVelocity;
                    }
                }
                this.movePlayer()
            } else if (this.direction) {
                this.movePlayer()
                if (this.ticks % this.ticksRate === 0) {
                    if (this.velocity > 0) {
                        this.velocity -= this.acceleration
                    } else {
                        this.velocity = 0;
                        this.direction = '';
                    }
                }
            }
        },
        movePlayer() {
            let positionChanged=false
            if (this.direction.includes('up')) {
                if(this.yAxis - this.velocity < 50){
                    this.yAxis=this.playerSize
                }else{
                    this.yAxis -= this.velocity;
                }
                positionChanged=true
            }
            if (this.direction.includes('left')) {
                if(this.xAxis - this.velocity < 50){
                    this.xAxis=this.playerSize
                }else{
                    this.xAxis -= this.velocity;
                }
                positionChanged=true
            }
            if (this.direction.includes('down')) {
                if(this.yAxis + this.velocity > 670){
                    this.yAxis=670
                }else{
                    this.yAxis += this.velocity;
                }
                positionChanged=true
            }
            if (this.direction.includes('right')) {
                let gameWidth = document.getElementById('mainSVG')?.getBoundingClientRect().width;
                if(gameWidth){
                    if(this.xAxis + this.velocity > (gameWidth-this.playerSize)){
                        this.xAxis=gameWidth-this.playerSize
                    }else{
                        this.xAxis += this.velocity;
                    }
                    positionChanged=true
                }
            }
            if(positionChanged){
                this.persistPosition();
            }
        },
        persistPosition(){
            this.socket.emit('positionUpdated',this.character._id,{
                xAxis:this.xAxis,
                yAxis:this.yAxis
            })
        }
    }
});
</script>
<template>
    <circle ref="player" :fill="character.attributes.color"
            :cx="xAxis"
            :cy="yAxis"
            :r="character.attributes.size"/>
</template>
<style scoped>

</style>