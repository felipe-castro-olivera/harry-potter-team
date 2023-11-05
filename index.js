const urlAPI = "https://hp-api.onrender.com/api/characters";

const { createApp } = Vue;

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
      buscador2: "",
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
          console.log(data[0].ancestry);
          this.dataApiHarry = data.map((personaje) => personaje);
          this.personajes = data;
          this.personajesBkp = data;
          this.categoriasCasas = Array.from(
            new Set(
              this.personajes.map((personaje) => personaje.house).splice(4, 4)
            )
          ); console.log(this.categoriasCasas);
          this.categoriasLinaje = new Set(data.map((personaje) => personaje.ancestry.toUpperCase()))
        }); console.log(this.categoriasLinaje);


    },
  },
  computed: {
    filtroCasas(personaje) {
      let filtrobuscador = this.personajesBkp.filter((personaje) =>
        personaje.name.includes(this.buscador.toLowerCase())
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
        personaje.ancestry.includes(this.buscador2.toUpperCase())
      );

      if (this.linajeSeleccionado.length == 0) {
        this.personajes = filtrobuscador2;
      } else {
        this.personajes = filtrobuscador2.filter((personaje) =>
          this.linajeSeleccionado.includes(personaje.ancestry))
      }

    }
  },
}).mount("#app");
