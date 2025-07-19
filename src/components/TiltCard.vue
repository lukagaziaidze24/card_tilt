<template>
    <div class="card-component-wrapper">
        <div ref="tiltCard" class="tilt-card-wrapper" @mousemove="handleCardTile" @mouseout="handleCardTiltOut">
    
        </div>
    </div>

</template>
<script>
export default {
    name: "tile card",
    data(){
        return {
            mouseHoverXTilt: 0,
            mouseHoverYTilt: 0,
            maximumDegree: 20,
            maximumBoxShadowX: 20,
            maximumBoxShadowY: 20,
            gyroscope: null,
            gyroscopeInfo: {
                x: 0,
                y: 0,
                z: 0,
                maxXDegreeCoefficient: 10, // they need to be the same ++__
                minXDegreeCoefficient: -10,  // they need to be the same ++__
            },
        }
    },
    mounted() {
        this.getGyroscopePermission();
    },
    methods: {
        getGyroscopePermission(){
            // window.addEventListener('devicemotion', (event) => {
            //     console.log('Rotation rate:', event.rotationRate);
            // });
            window.navigator.permissions.query({
                name: 'gyroscope',
            }).then((result) => {
                if(result.state == "granted"){ //(window.DeviceOrientationEvent || window.DeviceMotionEvent)
                    this.gyroscope = new Gyroscope({
                        frequency: 60,
                    });
                    
                    
                    this.gyroscope.addEventListener("reading", (e) => {
                        this.gyroscopeInfo.x = Math.max(Math.min(this.gyroscopeInfo.x + this.gyroscope.x, this.gyroscopeInfo.maxXDegreeCoefficient), this.gyroscopeInfo.minXDegreeCoefficient);
                        let gyroscopeXAngleCoefficient = this.gyroscopeInfo.x / this.gyroscopeInfo.maxXDegreeCoefficient * -1;

                        this.gyroscopeInfo.y = Math.max(Math.min(this.gyroscopeInfo.y + this.gyroscope.y, this.gyroscopeInfo.maxXDegreeCoefficient), this.gyroscopeInfo.minXDegreeCoefficient);
                        let gyroscopeYAngleCoefficient = this.gyroscopeInfo.y / this.gyroscopeInfo.maxXDegreeCoefficient * -1;


                        this.$refs.tiltCard.style.transform = `rotateY(${gyroscopeYAngleCoefficient * this.maximumDegree}deg) rotateX(${gyroscopeXAngleCoefficient * this.maximumDegree}deg)`;
                        this.$refs.tiltCard.style.boxShadow = `rgba(0, 0, 0, 0.16) ${gyroscopeYAngleCoefficient * this.maximumBoxShadowX}px ${gyroscopeXAngleCoefficient * this.maximumBoxShadowY}px 30px 30px, rgba(0, 0, 0, 0.16) ${gyroscopeYAngleCoefficient * this.maximumBoxShadowX / 2}px ${gyroscopeXAngleCoefficient * this.maximumBoxShadowY / 2}px 10px 10px`;
                    });
                    this.gyroscope.start();
                }
            }).catch((error) => {
            });
        },
        handleCardTile(event){
            let rect = this.$refs.tiltCard.getBoundingClientRect();
            let middlePointX = rect.width / 2;
            let middlePointY = rect.height / 2;
            this.mouseHoverXTilt = (middlePointX - event.offsetX) / middlePointX;
            this.mouseHoverYTilt = (middlePointY - event.offsetY) / middlePointY;
            this.$refs.tiltCard.style.transform = `rotateY(${this.mouseHoverXTilt * this.maximumDegree}deg) rotateX(${this.mouseHoverYTilt * this.maximumDegree}deg)`;
            this.$refs.tiltCard.style.boxShadow = `rgba(0, 0, 0, 0.16) ${this.mouseHoverXTilt * this.maximumBoxShadowX}px ${this.mouseHoverYTilt * this.maximumBoxShadowY}px 30px 30px, rgba(0, 0, 0, 0.16) ${this.mouseHoverXTilt * this.maximumBoxShadowX / 2}px ${this.mouseHoverYTilt * this.maximumBoxShadowY / 2}px 10px 10px`;
        },
        handleCardTiltOut(){
            this.mouseHoverXTilt = 0;
            this.mouseHoverYTilt = 0;
            this.$refs.tiltCard.style.transform = `rotateY(${this.mouseHoverXTilt * this.maximumDegree}deg) rotateX(${this.mouseHoverYTilt * this.maximumDegree}deg)`;
            this.$refs.tiltCard.style.boxShadow = `rgba(0, 0, 0, 0.16) 0px 0px 30px 30px`;
        }
    }
}
</script>
<style scoped lang="scss">
.card-component-wrapper{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .tilt-card-wrapper{
        width: 90%;
        max-width: 250px;
        height: 50dvh;
        background-color: red;
        cursor: pointer;
        border-radius: 2em;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 0px 30px 30px;
        transition: all 0.2s ease-out;
        background-image: linear-gradient(45deg, orange 45%, blue 65%);
        // transform: rotateY(30deg);
    }
}
</style>