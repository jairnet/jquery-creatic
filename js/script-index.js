var resultado = [];
var busca = function(){};
var textobuscar = "";
$(function(){
  var busqueda = $('#botonbuscar');
  var contenido = $("#contenido");
  $(busqueda).on('click', function(){
    textobuscar = $("#textbuscar").val();
    if(textobuscar !=""){
      contenido.empty();
      busca("https://images-api.nasa.gov/search?q=",textobuscar);
    };
  });

});
  
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
}
