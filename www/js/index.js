/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var pictureSource;   // picture source
var destinationType; // sets the format of returned value
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
		pictureSource = navigator.camera.PictureSourceType;
		destinationType = navigator.camera.DestinationType;
        app.receivedEvent('deviceready');	
    },
	CarregarSlider: function(){
		 settings = {
			primeiraImg: function(){
				elemento = document.querySelector(".slider a:first-child");
				elemento.classList.add("ativo");
			},

			slide: function(){
				elemento = document.querySelector(".ativo");

				if(elemento.nextElementSibling){
					elemento.nextElementSibling.classList.add("ativo");
					elemento.classList.remove("ativo");
				}else{
					elemento.classList.remove("ativo");
					settings.primeiraImg();
				}

			},

			proximo: function(){

				elemento = document.querySelector(".ativo");

				if(elemento.nextElementSibling){
					elemento.nextElementSibling.classList.add("ativo");
					elemento.classList.remove("ativo");
				}else{
					elemento.classList.remove("ativo");
					settings.primeiraImg();
				}
				
			},

			anterior: function(){
				elemento = document.querySelector(".ativo");

				if(elemento.previousElementSibling){
					elemento.previousElementSibling.classList.add("ativo");
					elemento.classList.remove("ativo");
				}else{
					elemento.classList.remove("ativo");                     
					elemento = document.querySelector("a:last-child");
					elemento.classList.add("ativo");
				}
				}
		}

			//chama o slide
		settings.primeiraImg();
		app.Acelerometro();
	},
	Acelerometro: function(){		
var xanterior = 0;	
function onSuccess(acceleration) {
	if(xanterior > 5){
			settings.proximo();
			xanterior = 0;
		}else if (xanterior < -5){
			settings.anterior();
			xanterior = 0;
		}
		  'Acceleration X: ' + acceleration.x + '\n' +
          'Acceleration Y: ' + acceleration.y + '\n' +
          'Acceleration Z: ' + acceleration.z + '\n' +
          'Timestamp: '      + acceleration.timestamp + '\n'
		  xanterior = acceleration.x;
}

function onError() {
    alert('onError!');
}

var options = { frequency: 1000 };  // Update every 3 seconds

var watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
	},
	Geoloc: function(){
		var onSuccess = function(position) {
        alert('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n');
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
	},
	RedeSocial: function(){
	  var options = {
		  message: 'share this', // not supported on some apps (Facebook, Instagram)
		  subject: 'the subject', // fi. for email
		  files: ['', ''], // an array of filenames either locally or remotely
		  url: 'https://www.website.com/foo/#bar?a=b',
		  chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
	  }

	var onSuccess = function(result) {
	  console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
	  console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
	}

	var onError = function(msg) {
	  console.log("Sharing failed with message: " + msg);
	}

	window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
	},
	Pegar: function(){
		pegimagem = document.querySelector(".ativo img").getAttribute("src");
		window.plugins.socialsharing.share(null, null, pegimagem, null);
		//window.plugins.socialsharing.share(null, 'Android filename', 'data:image/png;base64,R0lGODlhDAAMALMBAP8AAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUKAAEALAAAAAAMAAwAQAQZMMhJK7iY4p3nlZ8XgmNlnibXdVqolmhcRQA7', null)
	},	
	Sepia: function(){                                                                                                            
		var div = document.getElementById("slider");
		if(div.style.filter == "sepia(100%)"){
		div.style.filter = "sepia(0%)";
		}else{
		div.style.filter = "sepia(100%)";
		}
	},
	Invert: function(){
	var div = document.getElementById("slider");
		if(div.style.filter == "invert(100%)"){
		div.style.filter = "invert(0%)";
		}else{
		div.style.filter = "invert(100%)";
		}
	},
	Cinza: function(){
		var div = document.getElementById("slider");
		if(div.style.filter == "grayscale(100%)"){
		div.style.filter = "grayscale(0%)";
		}else{
		div.style.filter = "grayscale(100%)";
		}
	},
	CapturePhoto: function(){
		navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
		destinationType: Camera.DestinationType.File_URI
		});

		function onSuccess(imageData) {
			adicao(imageData);
			var image = document.getElementById('imagem');
			image.src = "data:image/jpeg;base64," + imageData;
		}

		function onFail(message) {
			alert('Failed because: ' + message);
		}
		
		function adicao(imagemadd){
			elemento = document.querySelector(".slider img");
			if(elemento.id == "oi"){
				var x = document.getElementById('slider');
				x.innerHTML = "";
				var $wrapper = document.querySelector('.slider'),
				HTMLNovo = '<a href="#" class="trs"><img src="'+imagemadd+'"/></a>';
				$wrapper.insertAdjacentHTML('afterbegin', HTMLNovo);
				app.CarregarSlider();
			}else{
				var $wrapper = document.querySelector('.slider'),
				HTMLNovo = '<a href="#" class="trs"><img src="'+imagemadd+'"/></a>';
				$wrapper.insertAdjacentHTML('afterbegin', HTMLNovo);
				app.CarregarSlider();
			}
		}
	},
	Verde: function(){
		navigator.camera.getPicture(onPhotoURISuccess, onFail, {quality: 50,
		destinationType: Camera.DestinationType.File_URI,
		sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
		encodingType: Camera.EncodingType.JPEG
		});

	function adicao(imagemadd){
			elemento = document.querySelector(".slider img");
			if(elemento.id == "oi"){
				var x = document.getElementById('slider');
				x.innerHTML = "";
				var $wrapper = document.querySelector('.slider'),
				HTMLNovo = '<a href="#" class="trs"><img src="'+imagemadd+'"/></a>';
				$wrapper.insertAdjacentHTML('afterbegin', HTMLNovo);
				app.CarregarSlider();
			}else{
				var $wrapper = document.querySelector('.slider'),
				HTMLNovo = '<a href="#" class="trs"><img src="'+imagemadd+'"/></a>';
				$wrapper.insertAdjacentHTML('afterbegin', HTMLNovo);
				app.CarregarSlider();
			}
		}
    function onPhotoURISuccess(imageURI) {
		adicao(imageURI);
    }
	function onFail(message) {
			alert('Failed because: ' + message);
	}
			
	}
};