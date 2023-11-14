router.get('/ProviderConnectionData', function (req, res) {
    let authData = req.authDet;
    adminService.ProviderConnectionData(authData, function (response) {
        res.send(response);
    });
});
ProviderConnectionData: async function (authData, callback) {

		console.log(authData.id);
		var connection_details = await ConnectionRequest.find({ "provider_id":authData.id,"connection_status":{ $ne: 0 } }).exec();
		if(connection_details.length > 0)
		{
			var connection_arr = [];
			for(var i = 0; i < connection_details.length; i++)
			{
				var user_details = await User.findOne({ "_id":connection_details[i].non_provider_id }).exec();
				var user_name = user_details.name;
				var email = user_details.email;
				if(user_details.profile_picture == null) {
					var profile_img = null;
				} else {
					var profile_img = staging_siteurl+'public/profile_image/'+user_details.profile_picture;
				}

				connection_arr.push({
					connection_id: connection_details[i]._id,
					provider_id: connection_details[i].provider_id,
					non_provider_id: connection_details[i].non_provider_id,
					connection_status: connection_details[i].connection_status,
					user_name: user_name,
					email: email,
					profile_img: profile_img,
				});
			}
			callback({ success: true, message: "Connection list", data: connection_arr });
		}
		else
		{
			callback({ success: false, message: "No data found" });
		}
},



{if (row.user_type === 2) {
    return 'Nurse Practitioners';
} else if (row.user_type === 3) {
    return 'Physicians';
} else {
    return 'Physician Assistants';
}}
if (row.connection_status === 1) {
    return <p type="button" className="btn btn-accept" style={{color:"#09518C"}}>
    Accepted
</p>;
}