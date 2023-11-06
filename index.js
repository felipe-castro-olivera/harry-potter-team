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
      categoriasSeleccionadas: [],
      buscador: "",
      personajeAMostrar: null,
      dataApiHarry: null,
      urlImagen: "https://placehold.co/300x400?text=Sin+foto",
      favoritos: [],
    };
  },
  created() {
    this.dataHarry(urlAPI);
    this.mostrarModal(this.personajeAMostrar);
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
          this.dataApiHarry = data.map((personaje) => personaje);
          this.personajes = data;
          this.personajesBkp = data;
          this.categoriasCasas = Array.from(
            new Set(
              this.personajes.map((personaje) => personaje.house).splice(4, 4)
            )
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
    filtro(personaje) {
      let filtrobuscador = this.personajesBkp.filter((personaje) =>
        personaje.name.toLowerCase().includes(this.buscador.toLowerCase())
      );

      if (this.categoriasSeleccionadas.length == 0) {
        this.personajes = filtrobuscador;
      } else {
        this.personajes = filtrobuscador.filter((personaje) =>
          this.categoriasSeleccionadas.includes(personaje.house)
        );
      }
    },  
  },
}).mount("#app")
