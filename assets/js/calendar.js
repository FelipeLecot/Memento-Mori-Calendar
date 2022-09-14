function startCalendar(weeksLived) {
	let calendarCont = $(".calendar-containers")
		let weekCount = 0;

	for (let i = 1; i <= 8; i++) {
		calendarCont.append("<div id=weekGroups" + i + " class='week-groups'></div>")


		for (let j = 1; j <= 520; j++) {
			weekCount++

			let calendarWeekGroups = $("#weekGroups" + i)
			calendarWeekGroups.append(`<div class="weekSquare ${checkForSpecialDates(weekCount, weeksLived)}"></div>`)
		}
	}

	function checkForSpecialDates(weekCount, weeksLived) {
		let classes = []

		weekCount < weeksLived ? classes.push('passedWeek') : false

		weekCount % 52 == 0 ? classes.push('birthDay') : false
		
		return classes.join(' ')
	}
}

($('.calculate-button').on('click', () => {
	calculateDiffWeeks()
}))

function calculateDiffWeeks() {
	let birthDate = moment(document.getElementById("birthDate").value,'YYYY/M/D');
	let today = moment(moment().format("YYYY/M/D"),'YYYY/M/D');
	let diffWeeks = today.diff(birthDate, 'weeks');
 	$(".inputs").css("display", "none")
 	startCalendar(diffWeeks)

 	$.ajax({
		type: "POST",
	  	url: 'https://mementomori.do2software.com/saveVisit.php'
	});
}

$('#birthDate').on('keypress', function (e) {
    if (e.key === 'Enter') {
		calculateDiffWeeks()
    }
});