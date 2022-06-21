exports.verifyOrgData = (name, contactNo, city, sellItem, Address, userId, openingHours, imgLink,accountType) => {
    const sellItems = ['fuel','gas','milk powder']
    const areas = ['Kalutara','Colombo','Gampaha','Ampara','Anuradhapura','Badulla','Batticaloa','Galle','Hambantota','Jaffna','Kandy','Kegalla','Kilinochchi','Kurunegala','Mannar','Matale','Matara','Moneragala','Mullaitivu','Nuwara Eliya','Polonnaruwa','Puttalam','Ratnapura','Trincomalee','Vavuniya']
	return new Promise((resolve, reject) => {
		if (!name || typeof name != "string") {
			reject("Invalid Name");
		}

		if (name.length < 5) {
			reject("Name must be at least 5 characters");
		}

		if (!contactNo || contactNo.length !== 10) {
			reject("Invalid Contact No.");
		}

		if (!city || !areas.includes(city)) {
			reject("Invalid City");
		}

		if(!sellItem || !sellItems.includes(sellItem)){
            reject("Invalid Sell Item");
        }

        if(!Address || Address.length < 5){
            reject("Invalid Address");
        }

        if(!userId){
            reject("Invalid ID");
        }

        if(!openingHours){
            reject("Invalid Opening Hours");
        }

        if(!imgLink){
            reject("Invalid Image Link");
        }

        if(!accountType || accountType !== 'Seller'){
            reject("Invalid Account Type");
        }

		resolve();
	});
};