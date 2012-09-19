// ==============================
// DATABASE FUNCTIONS	|	START
// ==============================
		function reBuildDB()
		{
			html5sql.process(
		     [
		        "DROP TABLE IF EXISTS myPosition;",
				 "CREATE TABLE IF NOT EXISTS myPosition (userID INTEGER, geoLatitude FLOAT, geoLongitude FLOAT, geoAltitude FLOAT, geoAccuracy INTEGER, timestampLocal INTEGER, timestampServer INTEGER, geoNote TEXT, shareWithFriends INTEGER, shareWithPublic INTEGER, UNIQUE(userID,timestampLocal));"
		     ],
		     function(){
				status.innerHTML = "Success creating and inserting into Tables";
		        testDB();
		     },
		     function(error, statement){
		        status.innerHTML = "Error: " + error.message + " when processing " + statement;
		     }
		 );		
    	}

		// FETCH SQL-RESULTS
		function testDB(){
			html5sql.process(
			    ["SELECT * FROM myPosition;"],
			    function(transaction, results, rowsArray){
			    	var outputRows = '';
			      	for(var i = 0; i < rowsArray.length; i++){
			        	//each row in the rowsArray represents a row retrieved from the database
			        	var userID = rowsArray[i].userID;
			        	var geoLat = rowsArray[i].geoLatitude;
			        	var geoLong = rowsArray[i].geoLongitude;
			        	outputRows = outputRows +userID+'<br/>'+geoLat+' # '+geoLong+ '<br/>';
			      	}
					var output = document.getElementById('output');
			      	output.innerHTML = outputRows;
			    },
			    function(error, statement){
			      //hande error here           
			    }
			);		
		}

// ============================
// DATABASE FUNCTIONS	|	END
// ============================




// ==============================
// GEODATA FUNCTIONS	|	START
// ==============================

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
		html5sql.process(
		     [
		        "INSERT INTO myPosition (userID, geoLatitude, geoLongitude, geoAltitude, geoAccuracy) VALUES (2,"+geoLatitude+","+geoLongitude+","+geoAltitude+","+geoAccuracy+");"
		     ],
		     function(){
				status.innerHTML = "Success inserting GEOlocation into myPosition";
		        testDB();
		     },
		     function(error, statement){
		        status.innerHTML = "Error: " + error.message + " when processing " + statement;
		     }
		 );



		//post_to_url('http://my.spongy.dk/save_position.php',{'lat':geoLatitude,'long':'432','accu':'2','timestamp':'12.12.12 43:23'});
        var element = document.getElementById('geoData');
        element.innerHTML = 'Latitude: '           + geoLatitude            + '<br />' +
                            'Longitude: '          + geoLongitude           + '<br />' +
                            'Altitude: '           + geoAltitude            + '<br />' +
                            'Accuracy: '           + geoAccuracy            + '<br />' +
                            'Altitude Accuracy: '  + geoAltitudeAccuracy    + '<br />' +
                            'Heading: '            + geoHeading             + '<br />' +
                            'Speed: '              + geoSpeed               + '<br />' +
                            'Timestamp: '          + geoTimestamp			+ '<br />';
		
	}
// ============================
// GEODATA FUNCTIONS	|	END
// ============================
