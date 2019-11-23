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

    async getDoctorsByName(first_name,last_name,choosen_location)
    {
        try
        {
            let response = await fetch(`https://api.betterdoctor.com/2016-03-01/doctors?first_name=${first_name}&last_name=${last_name}&location=${choosen_location}&user_key=${process.env.API_KEY}`);
            let json_format_Response = await response.json();
            return json_format_Response;
        }
        catch(error)
        {
            let errorMassage = "There was an error handling your request:"+error.message;
            return errorMassage;
        }
        
    }
}