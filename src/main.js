import { Class_DoctorLookUp } from './../src/doctorLookUp.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import "./img/doctorPicture.jpg";

$(document).ready(function(){
    $("#formID").submit(function(event){
        event.preventDefault();
        let medical_issue = $("#medicalIssueID").val();
        let first_name = $("#doctorFirstNameID").val();
        let last_name = $("#doctorLastNameID").val();
        let city_location= $("#doctorLocationID").val();
        let listDoctors = new Class_DoctorLookUp();
        //if location is empty string then location  will 'Portland' by default.
        if(!city_location){ city_location = "Portland";}
        if(medical_issue!==''  && first_name==='' && last_name==='')
        {
            let output="";
            (async()=>
            {
                const response = await listDoctors.getList_Doctors(medical_issue,city_location);
                for(let idx=0; idx<response.length; idx++)
                    {
                        output+="First name: "+response[idx].profile.first_name +
                        "; Last name: "+response[idx].profile.last_name + 
                        "; Website: "+response[idx].profile.image_url+"; Address: [ ";
                        if(response[idx].practices.length!==0)  
                        {
                            let index = 0;
                            while(index < response[idx].practices.length)
                            {
                                if(response[idx].practices[index].visit_address.city==city_location)
                                {
                                    output+=response[idx].practices[index].visit_address.street + ", " +
                                    response[idx].practices[index].visit_address.city + ", " +
                                    response[idx].practices[index].visit_address.state + ", " +
                                    response[idx].practices[index].visit_address.zip;
                                    if(response[idx].practices[index].accepts_new_patients===true)
                                    { output+=" ]; Accepting a new patients: YES"+"<br><br>";}
                                    else{ output+=" ]; Accepting a new patients: NO"+"<br><br>";}
                                    index = response[idx].practices.length;
                                }
                                index++;
                            }
                        }
                        else 
                        {output+=" There is no an address section ]"+"<br><br>";}
                     }
                     if(!output){ output+="<br>Response status is "+listDoctors.getStatus()+" ok. There is no such a doctor in your area.";$("#outputID").html(output);}
                    else{ output+="<br>Response status is "+listDoctors.getStatus()+" ok."; $("#outputID").html(output);}
            })();
       }
       else if(medical_issue==='' && first_name!=='' && last_name!=='')
       {
            let results="";
            (async()=>{
                const response = await listDoctors.getDoctorsByName(first_name,last_name,city_location);
                for(let idx=0; idx<response.length; idx++)
                    {
                        results+="First name: "+response[idx].profile.first_name +
                        "; Last name: "+response[idx].profile.last_name + 
                        "; Website: "+response[idx].profile.image_url+"; Address: [ ";
                        if(response[idx].practices.length!==0)  
                        {
                            let index = 0;
                            while(index<response[idx].practices.length)
                            {
                                if(response[idx].practices[index].visit_address.city==city_location)
                                {
                                    results+=response[idx].practices[index].visit_address.street + ", " +
                                    response[idx].practices[index].visit_address.city + ", " +
                                    response[idx].practices[index].visit_address.state + ", " +
                                    response[idx].practices[index].visit_address.zip;
                                     if(response[idx].practices[index].accepts_new_patients===true)
                                    {results+=" ]; Accepting a new patients: YES"+"<br><br>";}
                                    else{   results+=" ]; Accepting a new patients: NO"+"<br><br>"; }
                                    index = response[idx].practices.length;
                                }
                                index++;
                            }
                        }
                        else 
                        {   results+=" There is no address section ]"+"<br><br>";}
                     }
                     if(!results)
                     { results+="<br>Response status is "+listDoctors.getStatus()+" ok. There is no such a doctor in your area."; $("#outputID").html(results); }
                     else{ results+="<br>Response status is "+listDoctors.getStatus()+" ok."; $("#outputID").html(results);}
            })();
            
        }
        else if(medical_issue==='' && first_name==='' && last_name==='')
        { let  errorMassage = "Please enter first, last name, and location or sypmtom and location to get list of doctors! "; $("#outputID").html(errorMassage);}
        else if((medical_issue===''&& first_name==='')||(medical_issue===''&& last_name===''))
        { let  errorMassage = ""; if(last_name){errorMassage = "Please enter first name!";}else{ errorMassage = "Please enter last name!";}$("#outputID").html(errorMassage);}
        else if(medical_issue!=='' && first_name!=='' && last_name==='')
        { let  errorMassage = "Please choose searching doctors by symptom or by first and last name!"; $("#outputID").html(errorMassage);}
        else if(medical_issue!=='' && last_name!=='' && first_name==='')
        {let  errorMassage = "Please choose searching doctors by symptom or by first and last name!";$("#outputID").html(errorMassage);}
        else if(medical_issue!=='' && first_name!=='' && last_name!=='')
        {let  errorMassage = "Please choose searching doctors by symptom or searching specific doctor by first and last name!";$("#outputID").html(errorMassage); }
       
    });
});


