var ldap = require('ldapjs');

function adLogin(page, req, res) {
	var url = "ldap://" + req.body.ad;
	var userPrincipalName = req.body.uid + "@" + req.body.domain;
	var passwd = req.body.passwd;

	if (passwd === "") {
		res.send("The empty password trick does not work here.");
		return ;
	}

	// Bind as the user
	var adClient = ldap.createClient({ url: url });
	adClient.bind(userPrincipalName, passwd, function(err) {

		if (err != null) {
			if (err.name === "InvalidCredentialsError")                
                page.data(function (data) {
                    data.errorMessage = "Credential error";
                    data.username = req.body.uid;                    
                }).screen('login');
			else
                page.data(function (data) {
                    data.errorMessage = "Unknown error: " + JSON.stringify(err);
                    data.username = req.body.uid;  
                }).screen('login');
		} else {
            page.data(function (data) {              
                data.username = req.body.uid;                    
            }).screen('barcode');    
		}  // End of the if err == null part
	});  // End of the function called by adClient.bind
}

exports.adLogin = adLogin;
