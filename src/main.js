import { Class_DoctorLookUp } from './../src/doctorLookUp.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function(){
    $("#formID").submit(function(event){
        event.preventDefault();
        //const location ="Portland";
        let medical_issue = $("#medicalIssueID").val();
        let first_name = $("#doctorFirstNameID").val();
        let last_name = $("#doctorLastNameID").val();
        let doctor_Location = $("#doctorLocationID").val();
        let listDoctors = new Class_DoctorLookUp();

        // if location is empty string then location  will 'be wa-seattle' by default.
        if(!doctor_Location){ doctor_Location = "or-portland";}
        
    
        if(medical_issue!==''  && first_name==='' && last_name==='')
        {
            let output="";
            console.log(medical_issue);
            (async()=>{
                
                const response = await listDoctors.getList_Doctors(medical_issue,doctor_Location);
                for(let idx=0; idx<response.data.length; idx++)
                    {

                        output+="First name: "+response.data[idx].profile.first_name +
                            "; Last name: "+response.data[idx].profile.last_name + 
                            "; Address: ["+response.data[idx].practices[0].visit_address.street+
                            ", "+response.data[idx].practices[0].visit_address.city+
                            ", "+response.data[idx].practices[0].visit_address.state+
                            ", "+response.data[idx].practices[0].visit_address.zip+
                            "]; Website: "+response.data[idx].profile.image_url;
                            if(response.data[idx].practices[0].accepts_new_patients===true)
                            {
                                output+="; Accepting a new patients: YES"+"<br><br>";
                            }
                            else
                            {
                                output+="; Accepting a new patients: NO"+"<br><br>";
                            }
                        
                    }
                    $("#outputID").html(output);

            })();
        }
        
        else if(medical_issue==='' && first_name!=='' && last_name!=='')
        {
        
            let results="";
            (async()=>{
                
                const response = await listDoctors.getDoctorsByName(first_name,last_name,doctor_Location);
                for(let idx=0; idx<response.data.length; idx++)
                    {
                        if(response.data[idx].profile.last_name===last_name)
                        {

                        results+="First name: "+response.data[idx].profile.first_name +
                            "; Last name: "+response.data[idx].profile.last_name + 
                            "; Address: ["+response.data[idx].practices[0].visit_address.street+
                            ", "+response.data[idx].practices[0].visit_address.city+
                            ", "+response.data[idx].practices[0].visit_address.state+
                            ", "+response.data[idx].practices[0].visit_address.zip+
                            "]; Website: "+response.data[idx].profile.image_url;
                            if(response.data[idx].practices[0].accepts_new_patients===true)
                            {
                                results+="; Accepting a new patients: YES"+"<br><br>";
                                
                            }
                            else
                            {
                                results+="; Accepting a new patients: NO"+"<br><br>";
                            }
                            
                        }
                        
                    }
                    $("#outputID").html(results);
            })();
            
        }
        else if(medical_issue==='' && first_name==='' && last_name==='')
        {
            let  errorMassage = "Please enter first, last name, and location or sypmtom and location to get list of doctors! ";
            $("#outputID").html(errorMassage);
        }
        else if((medical_issue===''&& first_name==='')||(medical_issue===''&& last_name===''))
        {
            let  errorMassage = "";
            if(last_name)
            {
                errorMassage = "Please enter first name!";
            }
            else
            {
                errorMassage = "Please enter last name!";
            }
            $("#outputID").html(errorMassage);
        }
        else if(medical_issue!=='' && first_name!=='' && last_name==='')
        {
            let  errorMassage = "Please choose searching doctors by symptom or by first and last name!";
            $("#outputID").html(errorMassage);

        }
        else if(medical_issue!=='' && last_name!=='' && first_name==='')
        {
            let  errorMassage = "Please choose searching doctors by symptom or by first and last name!";
            $("#outputID").html(errorMassage);

        }
        else if(medical_issue!=='' && first_name!=='' && last_name!=='')
        {
            let  errorMassage = "Please choose searching doctors by symptom or searching specific doctor by first and last name!";
            $("#outputID").html(errorMassage); 
        }
       
        
       

        
    });
});