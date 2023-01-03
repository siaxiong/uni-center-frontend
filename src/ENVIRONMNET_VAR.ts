
//********FOR PRODUCTION*********
const redirect_uri = "https://university.siaxiong.com",

const VARS = {
	idpDomain: "https://university-center.us.auth0.com",
	authorizeEndpoint: "https://university-center.us.auth0.com/authorize",
	redirect_uri: "https://university.siaxiong.com",
	authorizeParams: {
		client_id: "Of5Nq2d8uu7rVbvUn6RD1uSz4vZI06XQ",
		redirect_uri,
		grant_type: "authorization_code",
		response_type: "code",
		connection: "Google",
		code_challenge: "-StwiJTfXjf0vMqy34yVmFSQew5ErV-gs2fair_K7Hw",
		code_challenge_method: "S256",
		scope: "openid profile email",
		audience: "https://university-center.siaxiong.com",
	},
	resourceServer: `${redirect_uri}/api/v1`
};


//********FOR DEVELOPEMENT*********
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
// 	},
// 	resourceServer: "http://localhost:3500/api/v1"
// };



const urlParams = new URLSearchParams(Object.entries(VARS.authorizeParams));
const authorizeEndpointWithParams = `${VARS.authorizeEndpoint}?${urlParams}`;

export const ENV_API = {
	idpDomain: VARS.idpDomain,
	authorizeEndpointWithParams,
	authorizeParams: VARS.authorizeParams,
	resourceServer: VARS.authorizeParams,
};