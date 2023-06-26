class Facility {
	slot = {
		Clubhouse: [],
		TennisCourt: [],
	};
	perform(inputArr) {
		let outputArr = [];
		inputArr.forEach((input) => {
			const result = this.execute(input);
			outputArr.push(`${input} | ${result}`);
		});
		return outputArr;
	}
	execute(input) {
		const parts = input.split(",");
		const facility = parts[0].trim();
		const dateParts = parts[1].trim().split("-");
		const date = `${dateParts[2].trim()}-${dateParts[1].trim()}-${dateParts[0].trim()}`;
		const [startTimeStr, endTimeStr] = parts[2].trim().split(" - ");
		const startDate = new Date(`${date}T${startTimeStr}:00Z`);
		const endDate = new Date(`${date}T${endTimeStr}:00Z`);
		if (facility == "Clubhouse") {
			const isAlreadyBooked = this.slot.Clubhouse.some(
				(element) =>
					((startDate >= element.startTime && startDate < element.endTime) ||
					(endDate >= element.startTime && endDate < element.endTime))
			);
			if (isAlreadyBooked) {
				return "Booking Failed, Already Booked";
			}
			return this.ClubhouseCalculateBookingAmount(startDate, endDate);
		} else if (facility == "TennisCourt") {
			const isAlreadyBooked = this.slot.TennisCourt.some(
				(element) =>
					((startDate >= element.startTime && startDate < element.endTime) ||
					(endDate >= element.startTime && endDate <element.endTime))
			);
			if (isAlreadyBooked) {
				return "Booking Failed, Already Booked";
			}
			return this.TennisCourtCalculateBookingAmount(startDate, endDate);
		} else {
			return "Booking Failed, Invalid Club";
		}
	}
	ClubhouseCalculateBookingAmount(startTime, endTime) {
		const duration = (endTime - startTime) / (1000 * 60 * 60);
		let totalAmount = 0;
		let startHours = startTime.getUTCHours();
		let startMinutes = startTime.getUTCMinutes();
		const startTimeFormatted = `${startHours
			.toString()
			.padStart(2, "0")}:${startMinutes.toString().padStart(2, "0")}`;
		let endHours = endTime.getUTCHours();
		let endMinutes = endTime.getUTCMinutes();
		const endTimeFormetted = `${endHours
			.toString()
			.padStart(2, "0")}:${endMinutes.toString().padStart(2, "0")}`;
		if (startTimeFormatted >= endTimeFormetted) {
			return "Booking Failed, Invalid Time Slot";
		} else if (startTimeFormatted >= "10:00" && endTimeFormetted <= "16:00") {
			totalAmount = duration * 100;
		} else if (startTimeFormatted >= "16:00" && endTimeFormetted <= "22:00") {
			totalAmount = duration * 500;
		} else if (
			startTimeFormatted >= "10:00" &&
			startTimeFormatted <= "16:00" &&
			endTimeFormetted >= "16:00" &&
			endTimeFormetted <= "22:00"
		) {
			const [startHour, startMinute] = startTimeFormatted
				.split(":")
				.map(Number);
			const [endHour, endMinute] = endTimeFormetted.split(":").map(Number);
			const [benchHour, benchMin] = "16:00".split(":").map(Number);
			const durationFirst =
				benchHour - startHour + (benchMin - startMinute) / 60;
			const durationSecond = endHour - benchHour + (endMinute - benchMin) / 60;
			totalAmount = durationFirst * 100 + durationSecond * 500;
		} else {
			return "Booking Failed, Invalid Time Slot";
		}
		if (totalAmount > 0) {
			this.slot.Clubhouse.push({ startTime, endTime });
			return `Booked, Rs. ${totalAmount}`;
		} else {
			return `Booking Failed, Zero Amount`;
		}
	}
	TennisCourtCalculateBookingAmount(startTime, endTime) {
		const duration = (endTime - startTime) / (1000 * 60 * 60);
		const totalAmount = duration * 50;
		if (totalAmount > 0) {
			this.slot.TennisCourt.push({ startTime, endTime });
			return `Booked, Rs. ${totalAmount}`;
		} else {
			return `Booking Failed, Zero Amount`;
		}
	}
}

module.exports = {
	Facility: Facility,
};
