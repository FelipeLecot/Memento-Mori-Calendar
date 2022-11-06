function startCalendar(weeksLived) {
	let weekCount = 0;

	for (let i = 1; i <= 8; i++) {
		$(".calendar-containers").append("<div id=weekGroups" + i + " class='week-groups'></div>")


		for (let j = 1; j <= 520; j++) {
			weekCount++

			$("#weekGroups" + i).append(`<div class="weekSquare ${checkForSpecialDates(weekCount, weeksLived)}"></div>`)
		}
	}

	function checkForSpecialDates(weekCount, weeksLived) {
		let classes = []

		weekCount < weeksLived ? classes.push('passedWeek') : false

		weekCount % 52 == 0 ? classes.push('birthDay') : false
		
		weekCount == weeksLived ? classes.push('currentWeek') : false
		
		return classes.join(' ')
	}
}

$('.calculate-button').on('click', () => {
	calculateDiffWeeks($("#birthDate").val())
})

function calculateDiffWeeks(inputDate) {
	let birthDate = moment(inputDate,'YYYY/M/D');
	setCookie('birthDate', inputDate, 365)
	let today = moment(moment().format("YYYY/M/D"),'YYYY/M/D');
	let diffWeeks = today.diff(birthDate, 'weeks');
	$("#birthDate").val(inputDate)
	startCalendar(diffWeeks)

	$.ajax({
		type: "POST",
		url: 'https://mementomori.do2software.com/saveVisit.php'
	});
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}

$(window).ready(() => {
	if (getCookie('birthDate') != null) {
		calculateDiffWeeks(getCookie('birthDate'))
	}
})

$('#birthDate').on('keypress', function (e) {
    if (e.key === 'Enter') {
		calculateDiffWeeks($("#birthDate").val())
    }
});