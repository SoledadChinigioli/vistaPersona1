$(function () {

    var TallerAvanzada = {};

    (function (app) {

        app.init = function () {

            app.buscarPersonas();
            app.oyentes();
        };

        app.oyentes = function () {

            //Oyente para cuando se hace click en el boton Eliminar
            $("#cuerpoTabla").on('click', '.eliminar', function () { //.eliminar hace referencia a la clase eliminar*
                app.eliminarPersona($(this).attr("data-id_persona"));//atrapar el atributo al que yo llamé id y borralo
            });

            //oyente para cuando se hace click en el botón agregar
            $("#agregarPersona").on('click', function (event){
                //bander cero para alta
                $("#id").val(0);
                //el titulo que inyecto al modal
                $("#tituloModal").html("Nueva Persona");
                //muestra el modal
                $("#modalPersona").modal({show: true});
            });


        };


        app.buscarPersonas = function () {

            var url = "http://localhost:9001/api/v1/persona/";

            $.ajax({//ajax es una función de jquery
                url: url,
                method: 'GET',
                dataType: 'json',
                success: function (datosRecibidos) { //data o datosRecibidos son todos los datos de la BD
                    datoConvertido = JSON.stringify(datosRecibidos);
                    alert(datoConvertido);
                    app.rellenarTabla(datoConvertido);
                },
                error: function () {
                    alert('error');
                }

            });
        };

        app.rellenarTabla = function (datoConvertido) {
            alert(datoConvertido);
            datoParseado = JSON.parse(datoConvertido);//dato parseado contiene datos convertidos a jquery

            var linea = "";

            $.each(datoParseado, function (clave, persona) {//función callback: el segundo parámetro no se ejecuta hasta que el primero esté totalmente cargado
                linea += '<tr>' + //concateno el valor de la linea
                        '<td>' + persona.nombre + '</td>' +
                        '<td>' + persona.apellido + '</td>' +
                        '<td>' + persona.dni + '</td>' +
                        '<td>' +
                        '<a class="pull-left editar" data-id_persona="' + persona.id + '"><span class="glyphicon glyphicon-pencil"></span>Editar</a>' +
                        '<a class="pull-right eliminar" data-id_persona="' + persona.id + '"><span class="glyphicon glyphicon-remove"></span>Eliminar</a>' + //*
                        '</td>' +
                        '</tr>';
            });          //<a> es un bipervínculo
            //metadata: cualqier tag de html permite meter metadata: info adicional. En html podemos incorporar
            //metadata con data-...=... 

            $("#cuerpoTabla").html(linea); //función de jquery llamada .html. COn el # llamo un elemento q se llama cuerpotbla de la página html y con la fc html, insertá todo lo que tenemos acá. 
        };

        //Se elimina un registro de la base de datos
        app.eliminarPersona = function (id) {
            alert(id);
            //Se confirma que se desee eliminar ese registro
            if (confirm("¿Esta seguro que desea eliminar ese registro?"))
            {
                var url = 'http://localhost:9001/api/v1/persona/' + id;


                $.ajax({
                    url: url,
                    method: "DELETE",
                    dataType: 'json',
                    success: function (datosRecibidos) { //dato recibido recibe un mensaje 
                        datoConvertido = JSON.stringify(datosRecibidos);
                        alert("datosRecibidos");
                        alert('El registro se elimino exitosamente');
//                    app.actualizarDataTable(tipo);
                        app.borrarFila(id);
                    },
                    error: function (datosRecibidos) {
                        alert('Hubo un error al eliminar el registro');
                    }
                });
            }
        };

        app.borrarFila = function (id) {    //funcion para borrar un fila

            alert("entre borrar fila");
            var fila = $("#cuerpoTabla").find("a[data-id_persona='" + id + "']").parent().parent().remove();
            //Anda al cuepo de la tabla, buscame una fila que empiece con a y que tenga el id mencionado.
            //Luego, aplicamos parent()para encontrar al tr padre, y el tbody para borrar toda la fila.
            //Esto es navegar en el DOM
        };


        app.init();

    })(TallerAvanzada);


});
