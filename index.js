const urlAPI = "https://hp-api.onrender.com/api/characters";

const { createApp } = Vue;
let page = 0;
let hasMore = false;
let isLoading = false;

createApp({
  data() {
    return {
      message: "Hola Harry!",
      personajes: null,
      personajesBkp: [],
      categoriasCasas: [],
      categoriasLinaje: [],
      categoriasSeleccionadas: [],
      linajeSeleccionado: [],
      buscador: "",
      personajeAMostrar: null,
      dataApiHarry: null,
      urlImagen: "https://placehold.co/300x400?text=Sin+foto",
    };
  },
  created() {
    this.dataHarry(urlAPI);
  },
  methods: {
    dataHarry(url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.dataApiHarry = data.map((personaje) => personaje);
          this.personajes = data;
          this.personajesBkp = data;
          this.categoriasCasas = Array.from(
            new Set(
              this.personajes.map((personaje) => personaje.house).splice(4, 4)
            )
          );
          this.categoriasLinaje = new Set(
            data.map((personaje) => personaje.ancestry.replace("-"," "))
          );
        });
    },
    mostrarModal(personaje) {
      this.personajeAMostrar = personaje;
    },
  },
  computed: {
    filtroCasas(personaje) {
      let filtrobuscador = this.personajesBkp.filter((personaje) =>
        personaje.name.toUpperCase().includes(this.buscador.toUpperCase())
      );

      if (this.categoriasSeleccionadas.length == 0) {
        this.personajes = filtrobuscador;
      } else {
        this.personajes = filtrobuscador.filter((personaje) =>
          this.categoriasSeleccionadas.includes(personaje.house)
        );
      }
    },
    filtroLinaje() {
      let filtrobuscador2 = this.personajesBkp.filter((personaje) =>
        personaje.name.toUpperCase().includes(this.buscador.toUpperCase())
      );
      console.log(filtrobuscador2);

      if (this.linajeSeleccionado.length == 0) {
        this.personajes = filtrobuscador2;
      } else {
        this.personajes = filtrobuscador2.filter((personaje) =>
          this.linajeSeleccionado.includes(personaje.ancestry.replace("-"," "))
        );
      }
    },
  },
}).mount("#app");
