<template>
  <div class="container">
    <main style="width: 100%;">
      <h1 class="standard-text-size title">Card Tilt</h1>
      <TiltCard/>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import TiltCard from '@/components/TiltCard.vue';
export default {
  name: 'HomeView',
  components: {
    TiltCard,
  },
}
</script>
<style scoped lang="scss">
.container{
  display: flex;
  justify-content: center;
  // align-items: center;
  height: 100dvh;
  .title{
    margin: 2em;
    @include text-linear-gradient-mixin();
  }
}

</style>
