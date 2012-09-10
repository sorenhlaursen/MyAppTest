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
