const urlAPI = "https://hp-api.onrender.com/api/characters";

const { createApp } = Vue;

createApp({
  data() {
    return {
      message: "Hola Harry!",
      personajes: null,
      personaje: null,
      personajesBkp: [],
      categoriasCasas: [],
      categoriasLinaje: [],
      categoriasSeleccionadas: [],
      linajeSeleccionado: [],
      buscador: "",
      personajeAMostrar: null,
      dataApiHarry: null,
      favoritos: [],
      urlImagen: "https://placehold.co/300x400?text=Sin+foto",
    };
  },
  created() {
    this.dataHarry(urlAPI);
    let favoritosGuardados = JSON.parse(localStorage.getItem("favoritos"))
    if (favoritosGuardados) {
      this.favoritos = favoritosGuardados;
    }
  },
  methods: {
    dataHarry(url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.dataApiHarry = data.map((personaje) => personaje);
          this.personajes = data;
          this.personajesBkp = data;
          this.categoriasCasas = Array.from(
            new Set(
              this.personajes.map((personaje) => personaje.house).splice(4, 4)
            )
          );
          this.categoriasLinaje = new Set(
            data.map((personaje) => personaje.ancestry.replace("-", " "))
          );
        });
    },
    
    mostrarModal(personaje) {
      this.personajeAMostrar = personaje;
    },
    agregarFavorito(personaje) {
      if (this.favoritos.includes (personaje)) {
        console.log("ya existe")} else{ 
          this.favoritos.push(personaje)
          localStorage.setItem("favoritos", JSON.stringify(this.favoritos));
        };
      },
      eliminarFavorito(personaje) {
        const index = this.favoritos.findIndex((pers) => pers.id == personaje.id);
        if (index !== -1) {
          this.favoritos.splice(index, 1); 
          localStorage.setItem("favoritos", JSON.stringify(this.favoritos));
        }
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
          this.linajeSeleccionado.includes(personaje.ancestry.replace("-", " "))
        );
      }
    },
  },
}).mount("#app");