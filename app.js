const app = Vue.createApp({

  data() {
    return {
     products:[],
     toys:[],
     medicamentos:[],
     ofertas:[],
     flag:[],
     menorPrecio:[],
     carrito:[],
    }
  },

 created() {
     
      
      // Definicion del endpoint de acuerdo al id del html//
     
      fetch("https://apipetshop.herokuapp.com/api/articulos")
  
          .then(res => res.json())
          .then(json => { 
            this.products=json.response
            //console.log(this.products)
            this.toys = this.products.filter(e => e.tipo == "Juguete")
            this.medicamentos=this.products.filter(e => e.tipo == "Medicamento")
            this.ofertas=this.products.filter(e => e.stock <= "5")
            
          })
            
          
          //.catch(err => alert(err.message))
    },
     methods: {

      // Ordeno los datos del array, segun la propeidad que necesito//
    filtroPrecio(array,propiedad) {
          let arrayAux = [...array]
          arrayAux.sort((a,b)=>{
             
          if(a[propiedad] > b[propiedad]){ return 1}
          if(a[propiedad] < b[propiedad]){ return -1}
          return 0;});
         // console.log(arrayAux)
       return arrayAux
      },
// Funciones del Carrito//

      agregar(producto) {
        if (!this.productoExiste(producto._id)) {
            this.carrito.push(producto);
            console.table(this.carrito)
            this.guardar();
        }
      },

       productoExiste(id) {
      return this.products.find(producto => producto.id === id);
       },

       obtenerConteo() {
     
        return this.carrito.length;
      },

      quitar(id) {
        const indice = this.carrito.findIndex(p => p.id === id);
        if (indice != -1) {
            this.carrito.splice(indice, 1);
            this.guardar();
        }
      },
    
      guardar() {
          localStorage.setItem(this.clave, JSON.stringify(this.carrito));
      },
    
      obtener() {
        const productosCodificados = localStorage.getItem(this.clave);
        return JSON.parse(productosCodificados) || [];
      }
      
  
    }, 
 
   computed: {
     
    ofertasFilterToys() {
 
      if(this.flag.length==0){ 

                if(this.menorPrecio!=""){
                  return this.filtroPrecio(this.toys,"precio")
                }
                else { return this.toys }
         } 
      else {  
        
            if(this.menorPrecio!=""){
              console.table(this.filtroPrecio(this.toys.filter(e=>e.stock <5),"precio"))
              return this.filtroPrecio(this.toys.filter(e=>e.stock <5),"precio")
            }
            else { return this.toys.filter(e=>e.stock <5) }
            } 
        
        },
      
           
    
 
    
    ofertasFilterMedicamentos() {

      if(this.flag.length==0){ 

        if(this.menorPrecio!=""){
          return this.filtroPrecio(this.medicamentos,"precio")
        }
        else { return this.medicamentos }
      } 
      else {  

        if(this.menorPrecio!=""){
          console.table(this.filtroPrecio(this.medicamentos.filter(e=>e.stock <5),"precio"))
          return this.filtroPrecio(this.medicamentos.filter(e=>e.stock <5),"precio")
        }
        else { return this.medicamentos.filter(e=>e.stock <5) }
    } 


    }, 
     
    
   }
  
});

app.mount("#app")


