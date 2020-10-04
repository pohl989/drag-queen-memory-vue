<template>
  <div class="card-group">
    <TheCard
      v-for="card in cards"
      :key="card.id"
      :queen="card.name"
      :flipped="card.flipped"
      :matched="card.matched"
      :id="card.id"
      @card-click="selectedQueen"
    />
  </div>
</template>

<script>
import TheCard from "../components/TheCard";
const requireImages = require.context(`../assets/cards`, false, /\.jpeg$/);

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
      cards: [],
      level: "Hard",
      levels: [
        { level: "Hard", length: QUEEN_NAMES ? QUEEN_NAMES.lengths : 1 },
        { level: "Medium", length: 10 },
        { level: "Easy", length: 5 }
      ]
    };
  },
  methods: {
    selectedQueen: function(queen) {
      const cards = this.cards;
      const index = cards.findIndex(card => card.id === queen.id);
      queen["flipped"] = !queen["flipped"];
      cards[index] = queen;
      this.cards = cards;
    },
    shuffle: function(array) {
      const shuffled = array.sort(function(a, b) {
        return 0.5 - Math.random();
      });
      return Object.values(shuffled);
    },
    queensInGame: function(gameSize) {
      return this.shuffle(this.queens).slice(0, gameSize);
    },
    gameSize: function(level) {
      return this.levels.find(l => level === l["level"])["length"];
    },
    setUpNewCards: function() {
      const queens = this.queensInGame(this.gameSize(this.level));
      const aCards = queens.map(queen => {
        return {
          name: queen,
          id: `${queen}-a`,
          flipped: false,
          matched: false
        };
      });
      const bCards = queens.map(queen => {
        return {
          name: queen,
          id: `${queen}-b`,
          flipped: false,
          matched: false
        };
      });
      const cards = [...bCards, ...aCards];
      return this.shuffle(cards);
    }
  },
  computed: {
    displayedCards: function() {
      const doubled = [...this.queensInGame, ...this.queensInGame];
      return this.shuffle(doubled);
    }
  },
  mounted() {
    this.cards = this.setUpNewCards();
  }
};
</script>

<style>
.scene {
  height: 100px;
  width: auto;
  perspective: 700px;
  margin: 10px;
}
.card-group {
  display: grid;
  grid-template-rows: repeat(30, 110px);
  grid-template-columns: repeat(3, 1fr);
}
.card {
  height: 95px;
}
@media (min-width: 770px) {
  .card {
    height: 170px;
  }
  .scene {
    width: auto;
    perspective: 800px;
  }
  .card-group {
    grid-template-rows: repeat(30, 180px);
    grid-template-columns: repeat(4, 1fr);
  }
}
@media (min-width: 1000px) {
  .card-group {
    grid-template-columns: repeat(5, 1fr);
  }
}
@media (min-width: 1100px) {
  .card-group {
    grid-template-columns: repeat(6, 1fr);
  }
}
@media (min-width: 1400px) {
  .card-group {
    grid-template-columns: repeat(12, 1fr);
  }
}
</style>
