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
         tx.executeSql('DROP TABLE IF EXISTS myGeoLocations');
         tx.executeSql('CREATE TABLE IF NOT EXISTS myGeoLocations (timestamp, lat, long)');
//         tx.executeSql('INSERT INTO myGeoLocations (timestamp, lat, long) VALUES (10-09-2012 16:11, "55.64779924543545", "12.277518341750605")');
//         tx.executeSql('INSERT INTO myGeoLocations (timestamp, lat, long) VALUES (01-09-2012 12:11, "55.64779924543545", "12.277518341750605")');
         tx.executeSql('INSERT INTO myGeoLocations (timestamp, lat, long) VALUES ()');
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
    
	function queryGetLatestGeo(tx) {
	    tx.executeSql('SELECT * FROM myGeoLocations', [], querySuccess, errorCB);
	}
	
	function querySuccess(tx, results) {
	    var len = results.rows.length;
	    console.log("myGeoLocations table: " + len + " rows found.");
	    for (var i=0; i<len; i++){
	        console.log("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
	    }
	}
// ============================
// DATABASE FUNCTIONS	|	END
// ============================
