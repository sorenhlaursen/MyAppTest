	//prepare variables for geo-data
	var geoLatitude;
	var geoLongitude;
	var geoAltitude;
	var geoAccuracy;
	var geoAltitudeAccuracy;
	var geoHeading;
	var geoSpeed;
	var geoTimestamp;
	
    // Wait for Cordova to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // Cordova is ready
    //
    function onDeviceReady() {
		window.setInterval(function(){
			navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
		}, 500);
		
        var db = window.openDatabase("spongy", "0.9", "Spongy DB", 200000);
		//db.do(commands, do if error, do if succes)
        db.transaction(populateDB, errorCB, successCB);
		
    }

    // onSuccess Geolocation
    //
    function onGeoSuccess(position) {
		//Save current position and data
		geoLatitude = position.coords.latitude;
		geoLongitude = position.coords.longitude;
		geoAltitude = position.coords.altitude
		geoAccuracy = position.coords.accuracy;
		geoAltitudeAccuracy = position.coords.altitudeAccuracy;
		geoHeading = position.coords.heading;
		geoSpeed = position.coords.speed;
		geoTimestamp = position.timestamp;
    }

    // onError Callback receives a PositionError object
    //
    function onGeoError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
	
	function reportGeoPosition(){
		//post_to_url('http://my.spongy.dk/save_position.php',{'lat':geoLatitude,'long':'432','accu':'2','timestamp':'12.12.12 43:23'});
        var element = document.getElementById('formpost');
        element.innerHTML = 'Latitude: '           + geoLatitude            + '<br />' +
                            'Longitude: '          + geoLongitude           + '<br />' +
                            'Altitude: '           + geoAltitude            + '<br />' +
                            'Accuracy: '           + geoAccuracy            + '<br />' +
                            'Altitude Accuracy: '  + geoAltitudeAccuracy    + '<br />' +
                            'Heading: '            + geoHeading             + '<br />' +
                            'Speed: '              + geoSpeed               + '<br />' +
                            'Timestamp: '          + geoTimestamp			+ '<br />';
		
	}
	
	function post_to_url(path, params, method) {
		alert('Tjek post_to_url 1');

		method = method || "post"; // Set method to post by default, if not specified.

		// The rest of this code assumes you are not using a library.
		// It can be made less wordy if you use one.
		var form = document.createElement("form");
		form.setAttribute("method", method);
		form.setAttribute("action", path);

		for(var key in params) {
			if(params.hasOwnProperty(key)) {
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", key);
				hiddenField.setAttribute("value", params[key]);

				form.appendChild(hiddenField);
			 }
		}

		document.body.appendChild(form);
		form.submit();
		alert('Tjek post_to_url 2');
	}
	
	
// ==============================
// DATABASE FUNCTIONS	|	START
// ==============================
    // Populate the database 
    //
    function populateDB(tx) {
         tx.executeSql('DROP TABLE IF EXISTS DEMO');
         tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
         tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
         tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
    }

    // Transaction error callback
    //
    function errorCB(tx, err) {
        alert("Error processing SQL: "+err);
    }

    // Transaction success callback
    //
    function successCB() {
        alert("success!");
    }
// ============================
// DATABASE FUNCTIONS	|	END
// ============================
