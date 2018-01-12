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
function loadShipmentDetails(page, params) {
    var trackingNumber = params.trackingNumber;

    var dbConn = new sql.ConnectionPool(config);
    //5.
    dbConn.connect().then(function () {
        //6.
        var request = new sql.Request(dbConn);

        request.input('trackingNumber', sql.VarChar(200), trackingNumber)
        .execute("ListShipmentDetails").then(function (recordSet) {
            //4.
            console.log(recordSet);
            dbConn.close();

            page.data(function (data) {
                data.shipmentDetails = recordSet;
            }).screen('details');
        }).catch(function (err) {
            //5.
            console.log(err);
            dbConn.close();
        });

    }).catch(function (err) {
        //9.
        console.log(err);
    });
}

exports.loadShipmentDetails = loadShipmentDetails;