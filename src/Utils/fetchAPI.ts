import {API} from "../ENVIRONMNET_VAR";

type payloadType = {
	path: string,
	method?: string,
	body?: Record<string,string>
	authorization?: boolean,
	contentType?: string,
	query?: Record<string,string>
}


export const fetchAPI = async function(payload: payloadType){

	try {
		const headerObj = new Headers({"Content-Type":"application/json"});

		console.log(payload);
		if(!(payload.authorization === false)) {
			const jsonCredential =  localStorage.getItem("university-center-user");
			if(!jsonCredential) throw new Error("no credentials stored on local storage");

			const credentials = JSON.parse(jsonCredential);
			if(!credentials?.tokens) console.log("no credential tokens");
			headerObj.append("Authorization", `Bearer ${credentials.tokens.accessToken}`);

		}
		if(payload.contentType) headerObj.append("Content-Type", payload.contentType);
		if(!payload.method) payload.method = "GET";
		
		if(payload.query){
			const params = new URLSearchParams();

			for (const [key, value] of Object.entries(payload.query)) {
				console.log(`${key}: ${value}`);
				params.append(key, value);
			}
			payload.path = payload.path.concat("?",params.toString());
		}

		
		const resp = await fetch(`${API.baseURL}/api/v1${payload.path}`,{
			method: payload.method,
			headers: headerObj,
			body: JSON.stringify(payload.body),
		});
		console.log("🚀 ~ file: fetchAPI.ts:44 ~ fetchAPI ~ resp", resp);
		const data = await resp.json();
		console.log("🚀 ~ file: fetch.ts:33 ~ fetchAPI ~ data", data);

		if(!resp.ok) throw Error(data);

		return data;
		
	} catch (error) {
		alert("There was a problem with that operation or getting resources for that operation.");
		return Promise.reject(new Error(`Problem with request to get data, ${payload}, from server`));
	}

};