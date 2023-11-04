const urlApi = "https://hp-api.onrender.com/api/characters";

const { createApp } = Vue;
const app = createApp({
  data() {
    return {
    
      message: "Hola Harry Potter",
      dataApiHarry: null,
    };
  },
  mounted() {},
  created() {
    this.dataHarry(urlApi);
  },
  methods: {
    dataHarry(url) {
      fetch(url).then(response => response.json()).then(data => {
        this.dataApiHarry = data
        console.log(this.dataApiHarry)
      }

      );
    },
  },
  computed: {},
}).mount("#app");
