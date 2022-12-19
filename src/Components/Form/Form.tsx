import React, {useState, useEffect} from "react";
import FormStyle from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
	faCheck
} from "@fortawesome/free-solid-svg-icons";
import { Auth_Types } from "../../myTypes";
import { fetchAPI } from "../../Utils/fetchAPI";
import {ENV_API } from "../../ENVIRONMNET_VAR";
export const Form = function(){


	const style = FormStyle;

	const navigate = useNavigate();

	const currentURLSearchParam = new URLSearchParams(window.location.search);
	const code = currentURLSearchParam.get("code");

	if(code){
		(async()=>{
			try {

				const tokensAndIdentityData = await fetchAPI({path:"/tokens", method:"POST", authorization:false, body:{code,url:ENV_API.idpDomain, redirect_uri: ENV_API.authorizeParams.redirect_uri, client_id: ENV_API.authorizeParams.client_id, grant_type: ENV_API.authorizeParams.grant_type}});
				const userRecord:Auth_Types.UserRecord = await fetchAPI({path:"/register", method:"POST", authorization:false, body: tokensAndIdentityData.identityData});

				localStorage.setItem("university-center-user", JSON.stringify({userRecord, tokens: tokensAndIdentityData.tokens}));
				if(userRecord.enrollmentStatus === "Accepted") navigate(`/${(userRecord.role).toLocaleLowerCase()}`);
				else if (userRecord.id) navigate("/pending");
				else navigate("/");
			} catch (error) {
				console.log(error);
			}

		})();
	}



	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("siaxiong23@icloud.com");
	const [password, setPassword] = useState("123password");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [signUpRole, setSignUpRole] = useState("");
	const [signUpFinish, setFinishSignUp] = useState(false);

	const [missingField, setMissingField] = useState(true);
	const [userExist, setUserExist] = useState(false);

	const [signIn, setSignIn] = useState(true);
	const [submitClicked, setSubmitClicked] = useState(false);
	const [incorrectSignIns, setIncorrectSignIngs] = useState(false);


	const toggleFormAction = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,state: boolean)=>{
		e?.preventDefault();
		setSignIn(state);
		setFirstName("");
		setLastName("");
		setEmail("");
		setPassword("");
		setConfirmPassword("");
		setSignUpRole("");

		setMissingField(true);
		setUserExist(false);
		setSubmitClicked(false);
		setFinishSignUp(false);
	};

	const onClickSignIn = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		try {
			if(email&&password){
				const data = await fetchAPI({path:"/login",method: "POST", authorization: false, body: {email, password}});
	
				localStorage.setItem("university-center-user", JSON.stringify(data));
				if(data.userRecord.enrollmentStatus !== "Accepted") navigate("/pending");
				else navigate(`/${data.userRecord.role}`);
			} else setSubmitClicked(true);
			
		} catch (error) {
			console.log(error);
			setIncorrectSignIngs(true);
			setSubmitClicked(false);
			
		}
	};

	const onClickSignUp = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		if(!userExist&&firstName&&lastName&&email&&password&&(password===confirmPassword)&&signUpRole){
			fetchAPI({path:"/register", method:"POST", authorization:false, body:{email,password,name: `${firstName} ${lastName}`, role: signUpRole}})
				.then(()=>setFinishSignUp(true))
				.catch(error=>console.log(error));
		}else{
			setSubmitClicked(true);
		}
	};


	useEffect(()=>{

		//for signing ins
		if(submitClicked&&signIn){
			setMissingField(!(email && password));
			setIncorrectSignIngs(false);
		}

		//for sign ups
		if(submitClicked&&!signIn){
			setMissingField(!(email && password && (password === confirmPassword) && password && firstName && lastName && signUpRole));
		}

		//check if account with the email already existed
		if(!signIn&&email){
			fetchAPI({path:"/userExist",authorization:false,query:{email}, showAlert: false})
				.then(data=>{setUserExist(data.userExist);console.log(data);})
				.catch(error=>{console.log(error);});
		}

	}, [firstName,lastName,email,password,confirmPassword, signUpRole, submitClicked]);


	return <form className={[style["form"], style["card"]].join(" ")}>
		<div className={style["form__action"]}>
			<button type="button" onClick={(e)=>toggleFormAction(e,true)} className={[signIn ? style["form__action-active"] : null, style["is-info"]].join(" ")}>Sign In</button>
			<button onClick={(e)=>toggleFormAction(e,false)} className={[signIn ? null : style["form__action-active"], style["is-info"]].join(" ")}>Sign Up</button>
		</div>
		<div className={[style["form__action-body"], signIn ? style["form__action-active"] : null].join(" ")}>
			<div>
				<input type="text" id="email" className={[!email&&missingField&&submitClicked ? style["form__field-required"] : null, style["input"]].join(" ")} placeholder="Email" onChange={(e)=>setEmail(e.target.value)} value={email} />
				{!email&&missingField&&submitClicked ? <p className={style["form__field-required-msg"]}>Email required!</p> : null}
			</div>
			<div>
				<input type="text" id="passsword" className={[!password&&missingField&&submitClicked ? style["form__field-required"] : null, style["input"]].join(" ")} placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password} />
				{!password&&missingField&&submitClicked ? <p className={style["form__field-required-msg"]}>Password required!</p> : null}
			</div>
			{incorrectSignIns ? <p className={style["form__field-required-msg"]}>Email or password is incorrect! Try again.</p> : null}
			<button onClick={(e)=>onClickSignIn(e)} className={[style["form__action-btn"], style["button"], style["is-info"]].join(" ")} type="button">Sign In</button>
			<a href={ENV_API.authorizeEndpointWithParams}><button  className={[style["form__action-btn"], style["button"], style["is-info"]].join(" ")} type="button">Sign In Via Google</button></a>
			{/* <div className={style["annoucement-texts"]}>
				<p>Users with different role will see different UI when logged in. However, only the Admin UI and logic are functional at the moment.</p>
				<div>
					<p>***Test User***</p>
					<p>jedixyqe@teleg.eu</p>
					<p>123password</p>
				</div>
			</div> */}
		</div>
		<div className={[style["form__action-body"], (signIn || signUpFinish) ? null : style["form__action-active"]].join(" ")}>
			<div>
				<input type="text" id="firstName" className={[!firstName&&missingField&&submitClicked ? style["form__field-required"] : null, style["input"]].join(" ")} placeholder="First Name" onChange={(e)=>setFirstName(e.target.value)} value={firstName} />
				{!firstName&&missingField&&submitClicked ? <p className={style["form__field-required-msg"]}>First name required!</p> : null}
			</div>
			<div>
				<input type="text" id="lastName" className={[!lastName&&missingField&&submitClicked ? style["form__field-required"] : null, style["input"]].join(" ")} placeholder="Last Name" onChange={(e)=>setLastName(e.target.value)} value={lastName} />
				{!lastName&&missingField&&submitClicked ? <p className={style["form__field-required-msg"]}>Last name required!</p> : null}
			</div>
			<div>
				<input type="text" id="email" className={[!email&&missingField&&submitClicked ? style["form__field-required"] : null, style["input"]].join(" ")} placeholder="Email" onChange={(e)=>setEmail(e.target.value)} value={email} />
				{!email&&missingField&&submitClicked ? <p className={style["form__field-required-msg"]}>Email required!</p> : null}   
				{userExist ? <p className={style["form__field-required-msg"]}>Email already taken! Use different email.</p> : null}         
			</div>
			<div>
				<input type="text" id="password" className={[!email&&missingField&&submitClicked ? style["form__field-required"] : null, style["input"]].join(" ")} placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password} />
				{!password&&missingField&&submitClicked ? <p className={style["form__field-required-msg"]}>Password required!</p> : null}
			</div>
			<div>
				<input type="text" id="confirmPassword" className={[!confirmPassword&&missingField&&submitClicked ? style["form__field-required"] : null, style["input"]].join(" ")} placeholder="Password" onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword} />
				{!confirmPassword&&missingField&&submitClicked ? <p className={style["form__field-required-msg"]}>Confirm Password required!</p> : null}            
			</div>
			<div className={style["form__radio-group"]}>
				<p>Desired Role</p>
				<div className={style["form__radio"]}>
					<input id="roleRadio1" type="radio" name="role" value="Student" onChange={(e)=>setSignUpRole(e.target.value)} checked={signUpRole==="Student"}/>
					<label htmlFor="roleRadio1" >Student</label>
				</div>
				<div className={style["form__radio"]}>
					<input id="roleRadio2" type="radio" name="role" value="Professor" onChange={(e)=>setSignUpRole(e.target.value)} checked={signUpRole==="Professor"}/>
					<label htmlFor="roleRadio2">Professor</label>
				</div>
				<div className={style["form__radio"]}>
					<input id="roleRadio3" type="radio" name="role" value="Admin" onChange={(e)=>setSignUpRole(e.target.value)} checked={signUpRole==="Admin"}/>
					<label htmlFor="roleRadio3">Admin</label>
				</div>
			</div>
			<button onClick={e=>onClickSignUp(e)} className={[style["form__action-btn"], style["button"], style["is-info"]].join(" ")}>Sign Up</button>
		</div>
		{signUpFinish ? <p className={style["form__confirmation-success"]}>The sign up was successful! <FontAwesomeIcon icon={faCheck}/> </p> : null}

	</form>;
};