//foo data
var rows = [{
        name: "job1",
        protein: "p1",
        ligand: "l2",
        id: 1,
        score: 100
    }, {
        name: "job2",
        protein: "p3",
        ligand: "l5",
        id: 2,
        score: 1000
    }, {
        name: "job3",
        protein: "p3",
        ligand: "l12",
        id: 3,
        score: 87
    }];

$(document).ready(function () {
    var html = "<table border='1|1'> <thead> <tr>";
    html+="<th data-sort='string'>Name</th>";
    html+="<th data-sort='int'>ID</th>";
    html+="<th data-sort='string'>Protein</th>";
    html+="<th data-sort='string'>Ligand</th>";
    html+="<th data-sort='int'>Score</th>";
    html+="</tr> </thead> <tbody>";
    for (var i = 0; i < rows.length; i++) {
        html+="<tr>";
        html+="<td>"+rows[i].name+"</td>";
        html+="<td>"+rows[i].id+"</td>";
        html+="<td>"+rows[i].protein+"</td>";
        html+="<td>"+rows[i].ligand+"</td>";
        html+="<td>"+rows[i].score+"</td>";

        html+="</tr>";
    }
    html+="</tbody> </table>";
    $("#table").html(html);
    $("#table").stupidtable();
});
