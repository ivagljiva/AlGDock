// Iva
// Script to populate the table in the data report screen (view-data-report.hjs) with data from a specific job

// mock data for now
var rows = [{
        id: 1,
        protein: "p1",
        ligand: "l2",
        score: 100
    }, {
    	id: 1,
        protein: "p1",
        ligand: "l5",
        score: 1000
    }, {
    	id: 1,
        protein: "p1",
        ligand: "l12",
        score: 87
    }];


$(document).ready(function () {
    var html = "<table border='1|1'> <thead> <tr>";
    html+="<th data-sort='int'>Job ID</th>";
    html+="<th data-sort='string'>Protein</th>";
    html+="<th data-sort='string'>Ligand</th>";
    html+="<th data-sort='int'>Score</th>";
    html+="</tr> </thead> <tbody>";
    for (var i = 0; i < rows.length; i++) {
        html+="<tr>";
        html+="<td>"+rows[i].id+"</td>";
        html+="<td>"+rows[i].protein+"</td>";
        html+="<td>"+rows[i].ligand+"</td>";
        html+="<td>"+rows[i].score+"</td>";

        html+="</tr>";
    }
    html+="</tbody> </table>";
    $("#data-table").html(html);
    $("#data-table").stupidtable();
});