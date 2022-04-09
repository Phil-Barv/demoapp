import axios from "axios";

export default class APIService{

    static AddProject(body,token){
        return fetch(`/project/create`,{
            'method':'POST',
             headers : {
            'Content-Type':'application/json',
             Authorization: 'Bearer ' + token
      },
      body:JSON.stringify(body)
    })
    .then(response => response.json())
    .catch(error => console.log(error))
    };

    static GetProjects(token){
        return axios({
            method: "GET",
            url:"/project",
            headers: {
              Authorization: 'Bearer ' + token
            }
          })
    };

}