import { Class_DoctorLookUp } from './../src/doctorLookUp.js';
describe('Class_DoctorLookUp',()=>
{
    test('should make request based on medical issue  and get response a list of doctors.',()=>
    {
        let doctorList = new Class_DoctorLookUp();
        (async()=>
         {
            let response = doctorList.getDoctorsByName("John","Butler","Sykesville");
            expect(response).toEqual(Array(3));
        })();
    });

});
