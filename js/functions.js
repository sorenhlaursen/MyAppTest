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


// ============================
// DATABASE FUNCTIONS	|	END
// ============================
