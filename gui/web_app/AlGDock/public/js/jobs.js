//foo data
var rows = [{
        name: "job1",
        protein: "p1",
        library: "l2",
        id: 1,
        status: "done"
    }, {
        name: "job2",
        protein: "p3",
        library: "l5",
        id: 2,
        status: "running"
    }, {
        name: "job3",
        protein: "p3",
        library: "l12",
        id: 3,
        status: "queued"
    }];

$(document).ready(function () {
    var html = "<table border='1|1'> <thead> <tr>";
    html+="<th data-sort='string'>Name</th>";
    html+="<th data-sort='int'>ID</th>";
    html+="<th data-sort='string'>Status</th>";
    html+="<th data-sort='string'>Protein</th>";
    html+="<th data-sort='string'>Ligand Library</th>";
    html+="</tr> </thead> <tbody>";
    for (var i = 0; i < rows.length; i++) {
        html+="<tr>";
        html+="<td>"+rows[i].name+"</td>";
        html+="<td>"+rows[i].id+"</td>";
        html+="<td>"+rows[i].status+"</td>";
        html+="<td>"+rows[i].protein+"</td>";
        html+="<td>"+rows[i].ligand+"</td>";
        html+="<td>"+rows[i].score+"</td>";
        html+='<td><a href="/report_jobID" class="button1">Data Report</a></td>'; //use variable for JobID to get specific job report
        html+='<td><a href="/report_jobID/files" class="button1">Download</a></td>'; //download a specific job report
        html+="</tr>";
    }
    html+="</tbody> </table>";
    $("#table").html(html);
    $("#table").stupidtable();
    
    	
});
