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
        console.log(medical_issue,doctor_Location);
        (async()=>{
            let listDoctors = new Class_DoctorLookUp();
            const response_json = await listDoctors.getList_Doctors(medical_issue,doctor_Location);
            //console.log(response_json);
            getElements(response_json);
        })();
        function getElements(response)
        {
            console.log(response);
            $("#outputID").text(response.meta.practices.name);
        }
    });
});