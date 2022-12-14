import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Components/AuthProvider/AuthContext";


type payloadType = {
	path: string,
	method?: string,
	body?: Record<string,string>
	authorization?: boolean,
	contentType?: string,
	isSetResponse?: true,
}


export const useFetch = (payload: payloadType)=>{

	console.log(payload);
	payload.isSetResponse = true;
	const authContext = useContext(AuthContext);
	// const [payload, setPayload] = useState(initPayload);
	const [fetchResponse, setFetchResponse] = useState<unknown>();
	
	const accessToken = authContext?.credentials?.tokens.accessToken;

	useEffect(()=>{
		callFetch(payload);

	},[]);
	const callFetch = async (payload: payloadType)=>{

		const headerObj = new Headers({"Content-Type":"application/json"});

		if(payload.contentType) headerObj.set("Content-Type", payload.contentType);
		if(payload.authorization) headerObj.set("Authorization", `Bearer ${accessToken}`);
		

		const resp = await fetch(`http://localhost:3500/api/v1${payload.path}`, {
			method: payload.method ? payload.method : "GET",
			headers: headerObj,
			body: JSON.stringify(payload.body)
		});
	
		if(!resp.ok) throw new Error(`Error fetching using the payload ${payload}`);
		const jsonData = await resp.json();
		console.log("🚀 ~ file: useFetch.tsx:44 ~ callFetch ~ jsonData", JSON.stringify(jsonData));
		
		if(payload.isSetResponse) setFetchResponse(jsonData);
	};


	console.log(fetchResponse);
	return [fetchResponse, callFetch];

};