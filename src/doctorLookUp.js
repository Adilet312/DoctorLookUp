export class Class_DoctorLookUp
{
    async getList_Doctors(symptom,location)
    {
        try
        {
            let response = await fetch(`https://api.betterdoctor.com/2016-03-01/doctors?query=${symptom}&location=${location}&user_key=${process.env.API_KEY}`);
            let json_format_Response = await response.json();
            return json_format_Response;
        }
        catch(error)
        {
            let errorMassage = "There was an error handling your request:"+error.message;
            return errorMassage;
        }
        
    }

    // async getDoctorsByName(name,n_location)
    // {
    //     try
    //     {
    //         let response = await fetch(`https://api.betterdoctor.com/2016-03-01/doctors?name=${name}&location=${n_location}&user_key=${process.env.API_KEY}`);
    //         let json_format_Response = await response.json();
    //         return json_format_Response;
    //     }
    //     catch(error)
    //     {
    //         let errorMassage = "There was an error handling your request:"+error.message;
    //         return errorMassage;
    //     }
        
    // }
}