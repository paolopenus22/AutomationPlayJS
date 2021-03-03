class Dates {

    formatDate = async (currentDate) => {

        let formattedDate = await currentDate.toISOString();
        return await formattedDate.split('T')[0];
    }

    getCurrentDateFormatted = async () => {
        return await this.formatDate(new Date());
    }

    getFutureDate = async (daysAhead) => {
        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + daysAhead);
        return await this.formatDate(currentDate);
    }

    formatTicketSummaryDate = async (givenDate) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        let date = new Date(givenDate);
        console.log(date);
        return `${monthNames[date.getMonth()].slice(0, 3)} ${date.getDate()}, ${date.getFullYear()}`;
    }

    formatTime = (time) => {
        let _time = time.split(':');
        let hours = Number(_time[0]);
        let minutes = _time[1];
        let timeValue = "";

        console.log(hours, minutes);

        if(hours == "00" || hours == "0"){
            hours = "24";
        }

        if(hours > 0  && hours <= 12) {

            timeValue += hours < 10 ? "0" + hours : hours;

        } else if(hours > 12) {

        timeValue += (hours - 12);
        }

        timeValue += ":" + minutes;
        timeValue += (hours >= 12) ? " pm" : " am";

        console.log(timeValue);
        return timeValue;
    }
}
module.exports = Dates;