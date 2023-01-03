import {ENV_API} from "../ENVIRONMNET_VAR";

type payloadType = {
	path: string,
	method?: string,
	body?: Record<string,string> | FormData,
	authorization?: boolean,
	// contentType?: string,
	query?: Record<string,string>,
	showAlert?: boolean
	showSuccess?:boolean
}

export const fetchAPI = async function(payload: payloadType){

	try {
		const headerObj = new Headers();
		payload.body instanceof FormData ? null : headerObj.append("Content-Type","application/json");


		console.log(payload);
		if(!(payload.authorization === false)) {
			const jsonCredential =  localStorage.getItem("university-center-user");
			if(!jsonCredential) throw new Error("no credentials stored on local storage");

			const credentials = JSON.parse(jsonCredential);
			if(!credentials?.tokens) console.log("no credential tokens");
			headerObj.append("Authorization", `Bearer ${credentials.tokens.accessToken}`);
			console.log(payload.body instanceof FormData ? true :false);
		}

		// if(payload.contentType) headerObj.set("Content-Type", payload.contentType);
		if(!payload.method) payload.method = "GET";
		
		if(payload.query){
			const params = new URLSearchParams();

			for (const [key, value] of Object.entries(payload.query)) {
				console.log(`${key}: ${value}`);
				params.append(key, value);
			}
			payload.path = payload.path.concat("?",params.toString());
		}

		console.log(payload.body instanceof FormData ? true : false);
		const resp = await fetch(`${ENV_API.resourceServer}${payload.path}`,{
			method: payload.method,
			headers: headerObj,
			body: payload.body instanceof FormData ? payload.body : JSON.stringify(payload.body),
		});

		const data = await resp.json();
		if(!resp.ok) throw Error(data);
		if(payload.showSuccess === true) alert("Success!");


		return data;
		
	} catch (error) {
		if(!(payload.showAlert === false)) alert(`There was a problem with that operation or getting resources for that operation. ${error}`);
	}

};