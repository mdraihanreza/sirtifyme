router.post('/updateProviderEmploymentDetails', function (req, res) {
	let authData = req.authDet;
	let employmentData = req.body;
	adminService.updateProviderEmploymentDetails(employmentData, authData,  function (response) {
		res.send(response);
	});
});
router.post('/updateProviderAdditionalEmploymentDetails', function (req, res) {
	let authData = req.authDet;
	let employmentData = req.body;
	adminService.updateProviderAdditionalEmploymentDetails(employmentData, authData,  function (response) {
		res.send(response);
	});
});
router.post('/updateProviderEmploymentDetails', function (req, res) {
		
	let authData = req.authDet;
	let employmentData = req.body;
	console.log(employmentData,'employmentDataroute')
	console.log(authData,'authDataroute')
	adminService.updateProviderEmploymentDetails(employmentData, authData,  function (response) {
		console.log(authData,'authData')
		res.send(response);
	});
});
updateProviderEmploymentDetails: async function (employmentData, authData, callback) {
	if (employmentData.c_job_name == '' && employmentData.c_job_from_year == '' ) {
		callback({ success: false, type: "Validation error", message: " above fields required" });
		return false;
	}

	if (employmentData.user_id == '') {
		callback({success: false,type:"Validation error",message: "User id is required." });
		return false;
	}

	UserEmployement.updateOne({ "user_id": employmentData.user_id },{
		"c_job_name": employmentData.c_job_name,
		"c_job_from_year": employmentData.c_job_from_year,
		"dom": new Date()
	}).exec();

	callback({ success: true, message: 'Employment details updated successfully' });
},
updateProviderAdditionalEmploymentDetails: async function (employmentData, authData, callback) {
	if (employmentData.job_name == '') {
		callback({success: false,type:"Validation error",message: "Institution name is required." });
		return false;
	}
	if (employmentData.employment_start_date == '') {
		callback({success: false,type:"Validation error",message: "From year is required." });
		return false;
	}
	if (employmentData.employment_end_date == '') {
		callback({success: false,type:"Validation error",message: "To year is required." });
		return false;
	}
	if (employmentData.user_id == '') {
		callback({success: false,type:"Validation error",message: "User id is required." });
		return false;
	}
	const emp_data = new UserAdditionalEmployment({
		user_id: employmentData.user_id,
		job_name: employmentData.job_name,
		employment_start_date: employmentData.employment_start_date,
		employment_end_date: employmentData.employment_end_date
	});
	emp_data.save();

	callback({ success: true, message: 'Additional Employment details updated successfully' });
},
updateProviderEmploymentDetails: async function (employmentData, authData, callback) {
	console.log(employmentData,'employmentData')
	if(employmentData)
	{
		 await UserEmployement.deleteMany({"user_id":authData.id}).exec();
		var employment_data = [];
		  employment_data.push({
			 user_id: employmentData[0].user_id,
			 job_name: employmentData.empinfo[0].job_name,
			 c_job_name: employmentData.c_job_name,
			 c_job_from_year: employmentData.c_job_from_year,
			 })
		for (var i = 0; i < employmentData.length; i++) {
			employment_data.push({
				user_id: employmentData[0].user_id,
				job_name: employmentData[i].job_name,
				employment_start_date: employmentData[i].employment_start_date,
				employment_end_date: employmentData[i].employment_end_date
			});
		}
		UserEmployement.insertMany(employment_data).then(function(){
			console.log("Data inserted")// Success
		}).catch(function(error){
			console.log(error)// Failure
		});
		callback({ success: true, message: 'Employment details updated successfully' });
	}
	else
	{
		callback({ success: false, message: 'Employment data mandatory' });
	}
},
viewProviderEmploymentDetails: async function (authData, user_id, callback) {
	var user_employment_data = await UserEmployement.find({ "user_id": user_id }).exec();
	if(user_employment_data.length > 0)
	{
		const emp_details = {
			employement_id: user_employment_data._id,
			c_job_name: user_employment_data.c_job_name,
			c_job_from_year : user_employment_data.c_job_from_year,
		}
		var user_additional_employement_data = await UserAdditionalEmployment.find({ "user_id": user_id }).exec();
		
		var additional_employement_result = [];
		if(user_additional_employement_data.length > 0)
		{
			for (var i = 0; i < (user_additional_employement_data.length); i++) {
				additional_employement_result.push({
					additional_employement_id: user_additional_employement_data[i]._id,
					job_name: user_additional_employement_data[i].job_name,
					employment_start_date: user_additional_employement_data[i].employment_start_date,
					employment_end_date: user_additional_employement_data[i].employment_end_date,
				});
			}
		}
		callback({ success: true, message: 'Employment details fetched', data: user_employment_data });
	}
	else
	{
		callback({ success: false, message: 'No data found' });
	}
},
viewProviderEducationDetails: async function (authData, user_id, callback) {
	var edu_data = await UserEducation.findOne({ "user_id": user_id }).exec();
	if(edu_data)
	{	
		const edu_details = {
			education_id: edu_data._id,
			ug_institute_name: edu_data.ug_institute_name,
			ug_from_year : edu_data.ug_from_year,
			ug_to_year : edu_data.ug_to_year,
			g_institute_name: edu_data.g_institute_name,
			g_from_year: edu_data.g_from_year,
			g_to_year: edu_data.g_to_year,
			g_status:  edu_data.g_status,
			med_institue_name: edu_data.med_institue_name,
			med_school_from_year: edu_data.med_school_from_year,
			med_school_to_year: edu_data.med_school_to_year,
			med_status: edu_data.med_status,
		};

		var user_additional_education_data = await UserAdditionalEducation.find({ "user_id": user_id }).exec();
		
		var additional_education_result = [];
		if(user_additional_education_data.length > 0)
		{
			for (var i = 0; i < (user_additional_education_data.length); i++) {
				additional_education_result.push({
					additional_education_id: user_additional_education_data[i]._id,
					education_name: user_additional_education_data[i].education_name,
					edu_name: user_additional_education_data[i].edu_name,
					from_year: user_additional_education_data[i].from_year,
					to_year: user_additional_education_data[i].to_year,
				});
			}
		}
		callback({ success: true, message: 'Education details fetched', data: edu_details, additional_data: additional_education_result });
	}
	else
	{
		callback({ success: false, message: 'No data found' });
	}
},