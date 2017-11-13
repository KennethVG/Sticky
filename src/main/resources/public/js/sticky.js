var local = "http://localhost:8080/";
var heroku = "https://safe-dawn-99683.herokuapp.com/"

$(function() {
	// STICKIES TONEN:
	var sticky;
	var mydata;
	var achtergrond = document.getElementById("achtergrond");
	$.get(heroku + "notes", function(data, status) {
		mydata = data;
		if (status == 'success') {
			$.each(data, function(index, value) {
				sticky = document.createElement("div");
				sticky.className = "stickynote text-center col-md-2";
				sticky.id = index;
				sticky.innerHTML = value.text;
				achtergrond.appendChild(sticky);
			});
		}
	}, "json");

	// STICKY TOEVOEGEN
	$("#button1").click(function(e) {
		var invoer = invoerveld.value;
		console.log("Invoer= " + invoer);
		if (invoer == "" || invoer.length > 60) {
			alert("Voer tekst in tussen 0 en 60 tekens");
			invoer.value = "";
		} else {
			$.ajax({
				method : "post",
				url : heroku + "notes/",
				data : invoer,
				contentType : "application/json",
				success : function(result) {
					console.log("Pagina terug laden!");
					location.reload();
				},
				error : function(request, msg, error) {
					alert("Toevoegen is niet gelukt!");
				}
			});
		}
	});

	// STICKY VERWIJDEREN NA KLIKKEN:
	$(document).on("click", "div.stickynote", function(e) {
		var mijnSticky = e.target;
		console.log("Mydata= " + mydata[mijnSticky.id].id);
		$.ajax({
			method : "delete",
			url : heroku + "notes/" + mydata[mijnSticky.id].id,
			contentType : "application/json",
			success : function(result) {
				achtergrond.removeChild(mijnSticky);
			},
			error : function(request, msg, error) {
				alert("Deleten is niet gelukt: " + msg);
			}
		});
	});

	// ALLE STICKIES VERWIJDEREN
	$("#button2").click(function(e) {

		$.ajax({
			method : "delete",
			url : heroku + "notes/",
			contentType : "application/json",
			success : function(result) {
				console.log("Alles verwijderd!");
				location.reload();
			},
			error : function(request, msg, error) {
				alert("Deleten is niet gelukt: " + msg);
			}
		});

	});
});
