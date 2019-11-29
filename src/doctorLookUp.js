export class Class_DoctorLookUp
{
    constructor(){   
        this.responseStatus = 0;
    }
    async getList_Doctors(symptom,location)
    {
        let listDoctors = [];
        let size = 0;
        let response = "";
        try{
            response = await fetch(`https://api.betterdoctor.com/2016-03-01/doctors?query=${symptom}&user_key=${process.env.API_KEY}`);
            this.responseStatus = response.status;
            let json_format_Response = await response.json();
            for(let idx = 0; idx < json_format_Response.data.length; idx++){
                if(json_format_Response.data[idx].practices.length===0){
                listDoctors[size] = json_format_Response.data[idx];
                size++;
                }
                else if(json_format_Response.data[idx].practices.length!==0){
                    let index = 0;
                     while(index < json_format_Response.data[idx].practices.length){
                        if(json_format_Response.data[idx].practices[index].visit_address.city===location){
                            listDoctors[size]=json_format_Response.data[idx];
                            size++;
                            /**Once we find doctor with specific  city then index will be initilize to max length in order to go out of the loop.  */
                            index = json_format_Response.data[idx].practices.length;
                        }
                    index++;
                    }
                }
            }
            return listDoctors;
        }
        catch(error){
            let errorMassage = "There was an error handling your request:"+response.message;
            return errorMassage;
        }
    }

    async getDoctorsByName(first_name,last_name,doctor_location)
    {
        let listDoctors=[];
        let size = 0;
        try{
            let response = await fetch(`https://api.betterdoctor.com/2016-03-01/doctors?first_name=${first_name}&last_name=${last_name}&user_key=${process.env.API_KEY}`);
            this.responseStatus = response.status;
            let json_format_Response = await response.json();
            for(let idx=0; idx < json_format_Response.data.length; idx++){
                if(json_format_Response.data[idx].profile.first_name===first_name && json_format_Response.data[idx].profile.last_name===last_name){   
                    /*if first and last name matches and a practice array is empty that means address is not specified. */
                    if(json_format_Response.data[idx].practices.length===0){
                        listDoctors[size]=json_format_Response.data[idx];
                        size++;
                    }
                    /**If there is practice array,which contains address , is not empty then look for each address that matches our city. */
                    else if(json_format_Response.data[idx].practices.length!==0){
                        let index = 0;
                        while(index<json_format_Response.data[idx].practices.length){
                            if(json_format_Response.data[idx].practices[index].visit_address.city===doctor_location){
                                listDoctors[size]=json_format_Response.data[idx];
                                size++;
                                /**Once we find doctor with specific  city then index will be initilize to max length in order to go out of the loop.  */
                                index = json_format_Response.data[idx].practices.length;
                            }
                            index++;
                        }
                     }
                }
            }
            return listDoctors;
        }
        catch(error){
            let errorMassage = "There was an error handling your request:"+error.message;
            return errorMassage;
        }
    }
    getStatus(){
        return this.responseStatus;
    }

}