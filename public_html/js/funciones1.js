$(function () { //$ invocacion a libreria de jquery. Función anónima autoejecutable. Paradigma funcional.

    //patrón módulo (js): para proteger el programa, lo encapsulamos en una variable (namespace)
    var TallerAvanzada = {}; //variable de tipo literal -vacía. Este es el namespace propio

    (function (app) { //function va a recibir un parámetro, que entra por abajo, pero yo voy a trabajar con el nombre
        //app. 
        app.init = function () { //inicializa la variable
            alert("Estoy en el DOM");
            app.buscarPersona();
            app.oyentes();
        };


        app.buscarPersona = function(){
            alert("Ejecuto buscar personas")
        };
        
        app.oyentes = function(){
            alert("Ejecuto oyentes")
        };
        
        
        app.init();
        alert("Terminó la ejecución");

    })(TallerAvanzada); //el parámetro se mete por abajo 

});


//Una variable puede ser parámetro de una función
/*  fc1(pi, fc2()){
 var a = fc1();
 var a = fc1();
 return fca();
 Funciones de primer orden*/
