export const API = {
	baseURL: "http://localhost:3500",
};

//********FOR PRODUCTION*********
const VARS = {
	idpDomain: "https://university-center.us.auth0.com",
	authorizeEndpoint: "https://university-center.us.auth0.com/authorize",
	authorizeParams: {
		client_id: "Of5Nq2d8uu7rVbvUn6RD1uSz4vZI06XQ",
		redirect_uri: "https://university.siaxiong.com",
		grant_type: "authorization_code",
		response_type: "code",
		connection: "Google",
		code_challenge: "-StwiJTfXjf0vMqy34yVmFSQew5ErV-gs2fair_K7Hw",
		code_challenge_method: "S256",
		scope: "openid profile email",
		audience: "https://university-center.siaxiong.com",
	}
};


//Change this when deploying to production!!!!!!!!
// const VARS = {
// 	idpDomain: "https://dev-university-center.us.auth0.com",
// 	authorizeEndpoint: "https://dev-university-center.us.auth0.com/authorize",
// 	authorizeParams: {
// 		client_id: "jEgIC99TfSJLEUjXFkHwpbd1wDXA6GET",
// 		redirect_uri: "http://localhost:3000",
// 		grant_type: "authorization_code",
// 		response_type: "code",
// 		connection: "Google",
// 		code_challenge: "-StwiJTfXjf0vMqy34yVmFSQew5ErV-gs2fair_K7Hw",
// 		code_challenge_method: "S256",
// 		scope: "openid profile email",
// 		audience: "https://dev-university-center.siaxiong.com",
// 	}
// };
const urlParams = new URLSearchParams(Object.entries(VARS.authorizeParams));
const authorizeEndpointWithParams = `${VARS.authorizeEndpoint}?${urlParams}`;

export const ENV_API = {
	idpDomain: VARS.idpDomain,
	authorizeEndpointWithParams,
	authorizeParams: VARS.authorizeParams,
};