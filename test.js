const { Facility } = require(".");
describe("Facility", () => {
	const inputArr = [
		"Clubhouse, 26-10-2020, 16:00 - 22:00",
		"TennisCourt, 26-10-2020, 16:00 - 20:00",
		"Clubhouse, 26-10-2020, 16:00 - 22:00",
		"TennisCourt, 26-10-2020, 17:00 - 21:00",
	];
	const outputArr = [
		"Clubhouse, 26-10-2020, 16:00 - 22:00 | Booked, Rs. 3000",
		"TennisCourt, 26-10-2020, 16:00 - 20:00 | Booked, Rs. 200",
		"Clubhouse, 26-10-2020, 16:00 - 22:00 | Booking Failed, Already Booked",
		"TennisCourt, 26-10-2020, 17:00 - 21:00 | Booking Failed, Already Booked",
	];

	test("testAll", () => {
		const resultObj = new Facility();
		const result = resultObj.perform(inputArr);
		expect(result).toEqual(outputArr);
	});
});

