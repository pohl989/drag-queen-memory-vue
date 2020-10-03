<template>
  <div class="hello">
    THE GAME
    <TheCard v-for="queen in queens" :key="queen" :queen="queen" />
  </div>
</template>

<script>
import TheCard from "../components/TheCard";
const requireImages = require.context(`../../public/cards`, false, /\.jpeg$/);

const QUEEN_NAMES = requireImages.keys().map(path =>
  path
    .split("/")
    .pop()
    .replace(/\.\w+$/, ``)
);

export default {
  name: "TheGame",
  components: { TheCard },
  data: function() {
    return {
      queens: QUEEN_NAMES,
      level: "",
      levels: [
        { level: "Hard", length: 12 },
        { level: "Medium", length: 10 },
        { level: "Easy", length: 5 }
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
