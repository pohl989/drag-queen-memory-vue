<template>
  <div>
    <TheGame />
  </div>
</template>

<script>
import TheGame from "./components/TheGame.vue";

export default {
  name: "App",
  components: {
    TheGame
  }
};
</script>

<style>
body {
  background: #ffdfe5;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
