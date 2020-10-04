<template>
  <h1>Drag Queen Memory Game</h1>

  <div v-if="gameOver" class="play-again">
    <button @click="setUpNewCards()">
      Congrats! Play Again?
    </button>
  </div>
  <div class="card-group">
    <TheCard
      v-for="card in cards"
      :key="card.id"
      :queen="card.name"
      :flipped="isFlipped(card)"
      :matched="isMatched(card)"
      :game-over="gameOver"
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
      selected: [],
      level: "Easy",
      levels: [
        { level: "Hard", length: QUEEN_NAMES ? QUEEN_NAMES.lengths : 1 },
        { level: "Medium", length: 7 },
        { level: "Easy", length: 6 }
      ]
    };
  },
  methods: {
    selectedQueen: function(queen) {
      const cards = this.cards;
      const index = cards.findIndex(card => card.id === queen.id);
      queen["flipped"] = !queen["flipped"];
      cards[index] = queen;
      //update selection
      this.selected =
        this.selected.length === 1 ? [...this.selected, queen] : [queen];
      //update matches if there is a match
      if (this.isAMatch(this.selected[1], this.selected[0])) {
        this.updateMatchedList(this.selected[1], this.selected[0]);
      }

      this.cards = cards;
    },
    isAMatch: function(a, b) {
      return a && b ? a["name"] === b["name"] && a["id"] !== b["id"] : false;
    },
    isFlipped: function(queen) {
      return (
        queen["matched"] ||
        this.selected.map(selected => selected["id"]).indexOf(queen["id"]) !==
          -1
      );
    },
    updateMatchedList: function(queenA, queenB) {
      const cards = this.cards;
      queenA["matched"] = true;
      const indexA = cards.findIndex(card => card.id === queenA["id"]);
      cards[indexA] = queenA;
      queenB["matched"] = true;
      const indexB = cards.findIndex(card => card.id === queenB["id"]);
      cards[indexB] = queenB;
      this.cards = cards;
      return true;
    },
    isMatched(card) {
      if (card["matched"]) {
        return true;
      } else {
        return false;
      }
    },
    shuffle: function(array) {
      const shuffled = array.sort(() => {
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
      this.selected = [];
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
      this.cards = this.shuffle(cards);
    }
  },
  computed: {
    displayedCards: function() {
      const doubled = [...this.queensInGame, ...this.queensInGame];
      return this.shuffle(doubled);
    },
    gameOver: function() {
      return this.cards.every(card => card.matched);
    }
  },
  mounted() {
    this.setUpNewCards();
  }
};
</script>

<style>
h1 {
  font-size: 1.5rem;
}

@keyframes jiggle {
  45%,
  65% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.1, 0.9);
  }
  55% {
    transform: scale(0.9, 1.1) translate(0, -5px);
  }
  60% {
    transform: scale(1, 1) translate(0, -5px);
  }
}
.play-again {
  width: 100vw;
  /* background-color: yellow; */
  position: absolute;
  z-index: 10;
  bottom: 5%;
}
.play-again > button {
  border: 2px solid #5ca4f5;
  margin: 5px;
  border-radius: 1rem;
  padding: 0.5rem;
  background-color: none;
  font-family: "Caveat", serif;
  color: #5ca4f5;
  font-size: 1.5rem;
  cursor: pointer;
  animation: jiggle 2s infinite ease-in;
}

.play-again > button:hover,
.play-again > button:focus {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  transform: scale(1.05);
}

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
  h1 {
    font-size: 2rem;
  }
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
