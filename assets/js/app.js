function startCalendar(weeksLived) {
	let calendarCont = $(".calendar-containers")
		let weekCount = 0;

	for (let i = 1; i <= 8; i++) {
		calendarCont.append("<div id=weekGroups" + i + " class='week-groups col-md-6 col-xl-6'></div>")


		for (let j = 1; j <= 520; j++) {
			weekCount++

			let calendarWeekGroups = $("#weekGroups" + i)
			calendarWeekGroups.append("<div class='weekSquare " + isPassed(weeksLived, weekCount) + "'></div>")

			function isPassed(lived, count) {
				if (count < lived) {
					return "passedWeek";
				}
				return ""
			}
		}
	}
}

($('.calculate-button').on('click', () => {
 	let birthDate = moment(document.getElementById("birthDate").value,'YYYY/M/D');
	let today = moment(moment().format("YYYY/M/D"),'YYYY/M/D');
	let diffWeeks = today.diff(birthDate, 'weeks');
 	$(".inputs").css("display", "none")
 	startCalendar(diffWeeks)

 	$.ajax({
		type: "POST",
	  	url: 'https://do2indie.com/Play/MementoMori/saveVisit.php'
	});
}))