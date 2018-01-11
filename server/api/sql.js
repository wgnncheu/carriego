//1.
var sql = require('mssql');
//2.
var config = {
    server: 'localhost',
    database: 'Xtend_1_0_8_1_Carrie',
    user: 'xtend_dev',
    password: 'xtend_dev',
    port: 1433
};
//3.
function loadShipmentDetails(param) {
    var trackingNumber = param.trackingNumber;
    var dbConn = new sql.ConnectionPool(config);
    //5.
    dbConn.connect().then(function () {
        //6.
        var request = new sql.Request(dbConn);
        //7.
        var queryString = "select ";
		queryString += "    p.TrackingNumber, ";
		queryString += "    p.SerialNumber, ";
		queryString += "    s.ShipmentNumber ";
        queryString += "FROM	Package		p ";
        queryString += "JOIN	Shipment	s	ON	p.ShipmentId	=	s.Id ";
        queryString += "WHERE	p.TrackingNumber = '" + trackingNumber + "'";

        request.query(queryString).then(function (recordSet) {
            console.log(recordSet);
            dbConn.close();
        }).catch(function (err) {
            //8.
            console.log(err);
            dbConn.close();
        });
    }).catch(function (err) {
        //9.
        console.log(err);
    });
}
//10.

loadShipmentDetails({ trackingNumber: "794655748180" });

exports.loadShipmentDetails = loadShipmentDetails;