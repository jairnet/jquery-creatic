var resultado = [];
var carga_list = [];
var busca = function(){};
var traerdatos = function(){};
var textobuscar = "";
var page = 1;
$(function (){
  var busqueda = $('#botonbuscar');
  var contenido = $("#contenido");
  var rover =$("#rover")

  traerdatos("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=",page,"&api_key=o1cFa3hWOrp6cHS6FhxxYA7o5M4iHOJ2ZmGAAa1c");

  $(document).ajaxStart(function(){
    $("#loader").css("display", "block");
  });
  $(document).ajaxComplete(function(){
    $("#loader").css("display", "none");
  });

  $("#btnatras").on('click',function(){
    page--;
    rover.empty();
    traerdatos("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=", page, "&api_key=o1cFa3hWOrp6cHS6FhxxYA7o5M4iHOJ2ZmGAAa1c");
  });
  $("#btnsiguiente").on('click',function(){
      page++;
      rover.empty();
      traerdatos("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=", page, "&api_key=o1cFa3hWOrp6cHS6FhxxYA7o5M4iHOJ2ZmGAAa1c");
  });

  $("#btnatrasdos").on('click',function(){
    page--;
    rover.empty();
    traerdatos("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=", page, "&api_key=o1cFa3hWOrp6cHS6FhxxYA7o5M4iHOJ2ZmGAAa1c");
  });
  $("#btnsiguientedos").on('click',function(){
      page++;
      rover.empty();
      traerdatos("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=", page, "&api_key=o1cFa3hWOrp6cHS6FhxxYA7o5M4iHOJ2ZmGAAa1c");
  });

  $(busqueda).on('click', function(){
    textobuscar = $("#textbuscar").val();
    if(textobuscar !=""){
      contenido.empty();
      busca("https://images-api.nasa.gov/search?q=",textobuscar);
    };

  });
}); // cierro ready

traerdatos = function(url, page, api_key){
  $.ajax({
  type: "GET",
  url: "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page="+page+"&api_key=DEMO_KEY",
  dataType: "json"
  }).done(function(carga){
      var rovercont = $("#rover");
      carga_list = carga.photos;
      $("#numpag").text(page);
      $("#numpagdos").text(page);
      console.log(page);
      $.each(carga_list,function(index,rest){
          var id_photo = carga.photos[index].id;
          var til = carga.photos[index].camera.full_name;
          var imag = carga.photos[index].img_src;
          var fech = carga.photos[index].earth_date;
          $("#rover").append('<div class="col-md-4"><div class="card mb-4 box-shadow"><img class="card-img-top" src="'+imag+'" alt="" width="100" height="300" id="foto"><div class="card-body"><p class="card-text">Foto N° <b>'+id_photo+'</b></p><p class="card-text">Camara: '+til+'</p><div class="d-flex justify-content-between align-items-center"><div class="btn-group"></div><small class="text-muted" id="fecha">Imagen recibida el: '+fech+'</small></div></div></div></div>');
      });
  }).fail(function(){
      alert('Error con la Api')
  }).always(function(){
  }); // Cierro ajax
};//cierro traer datos

busca = function(url, texto){
var numero = 0;
var conta = 0;
 $.ajax({
  type: "GET",
  url: url+texto,
  dataType: "json"
  }).done(function(busqueda){
    var contenido = $("#contenido");
    textobuscar = $("#textbuscar").val();
    resultado = busqueda.collection.items;
    numero = resultado.length;
    contenido.replaceWith('<section id="contenido"><br><div class="container"><div class="alert alert-success" role="alert">'+numero+' Resultados de: <spma class="font-italic">'+texto+'</spam></div></div><hr></section>');
    $("section").append('<div class="container"><table class="table"><thead><th scope="col">Numero</th><th scope="col">Titulo</th><th scope="col">Fecha Creacion</th><th scope="col">Localizacion</th><th scope="col">Detalle</th></thead><tbody></tbody></table></div>');
    
    $.each(resultado,function(index,rest){
      conta++;
      var item = busqueda.collection.items[index].data[0];
      $(".table").append('<tr><td>'+conta+'</td><td>'+item.title+'</td><td>'+item.date_created+'</td><td>'+item.location+'</td><td><button class="btn" data-codigo="'+index+'">Ver</button></td></tr>');
    });
    
    $(".btn").on("click", function(){
      var cod = $(this).data('codigo');
      $("#titulodetalle").text(busqueda.collection.items[cod].data[0].title);
      if(busqueda.collection.items[cod].links[0].render=="image"){
        $("#imagendetalle").attr("src", busqueda.collection.items[cod].links[0].href);  
      };
      $("#detail").text(busqueda.collection.items[cod].data[0].description);
      $("#Modal").modal("show");
    });
    
  }).fail(function(){
    alert('Error con la Api')
  }).always(function(){
}); // Cierro ajax
}// Cierro funcion busca
 // Cierro fucnion principal ready