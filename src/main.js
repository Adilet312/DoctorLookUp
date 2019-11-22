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
        let name_doctor = $("#nameDoctorID").val();
        let doctor_Location = $("#doctorLocationID").val();
        let listDoctors = new Class_DoctorLookUp();

        (async()=>{
            
            const response_json = await listDoctors.getList_Doctors(medical_issue,doctor_Location);
            //console.log(response_json);
            getElements(response_json);
        })();
        // (async()=>{
            
        //     const response_json = await listDoctors.getList_Doctors(medical_issue,doctor_Location);
        //     //console.log(response_json);
        //     getElements(response_json);
        // })();

        function getElements(response)
        {
            let results ="";
            for(let idx=0; idx<response.data.length; idx++)
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
            $("#outputID").html(results);
        }
    });
});