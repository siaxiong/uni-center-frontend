import React, {useState, useEffect, useContext, useReducer} from "react";
import FormStyle from "./Form.module.css";
import GlobalStyle from "../../Components/GlobalStyle/GlobalStyle.module.css";
import axios from "axios";
import { AuthContext } from "../AuthProvider/AuthContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCheck
     } from '@fortawesome/free-solid-svg-icons'

export const Form = function(){
    const style = FormStyle;
    const {credentials, setCredentials} = useContext(AuthContext)
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("siaxiong23@icloud.com");
    const [password, setPassword] = useState("123password");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmationCode, setConfirmationCode] = useState("");
    const [signUpRole, setSignUpRole] = useState("");
    const [confirmation, setConfirmation] = useState(false);

    const [missingField, setMissingField] = useState(true);
    const [userExist, setUserExist] = useState(false);

    const [signIn, setSignIn] = useState(true);
    const [submitClicked, setSubmitClicked] = useState(false);
    const [incorrectSignIns, setIncorrectSignIngs] = useState(false);
    const [confirmationDone, setconfirmationDone] = useState(false);


    const toggleFormAction = (e,state)=>{
        e?.preventDefault();
        setSignIn(state);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setConfirmationCode("")
        setSignUpRole("")

        setMissingField(true);
        setUserExist(false);
        setSubmitClicked(false);
        setConfirmation(false)
        setconfirmationDone(false);

    };

    const onClickSignIn = async (e) => {
        e.preventDefault();
        if(email&&password){
            axios({method:"POST",url:"/api/v1/login",data:{email,password}})
            .then(resp =>{
                // setIncorrectSignIngs(false);
                console.log(resp)
                sessionStorage.setItem("/api/v1/login", JSON.stringify(resp.data.credentials))
                setCredentials({credentials: resp.data.credentials, user: resp.data.user});
                navigate(`/${(resp.data.user.role).toLowerCase()}`)
                // navigate(`/private`)

                console.log(`/${(resp.data.user.role).toLowerCase()}`)
                console.log(resp)
            })
            .catch(e=>{
                console.log(e);
                setIncorrectSignIngs(true);
                setSubmitClicked(false);
            })
        }else{
            setSubmitClicked(true);
        }
    }

    const onClickSignUp = async (e) => {
        e.preventDefault();
        console.log(userExist)
        if(!userExist&&firstName&&lastName&&email&&password&&(password===confirmPassword)&&signUpRole){
            axios({method:"POST",url:"/api/v1/register",data:{email,password,name: `${firstName} ${lastName}`, role: signUpRole}})
            .then(resp=>{
                console.log(resp);
                setConfirmation(true);
            })
            .catch(e=>console.log(e))
        }else{
            setSubmitClicked(true);
        }
    }

    const onClickConfirmation = async () => {
        axios({method: "PUT", url: "/api/v1/confirm", data:{email, confirmationCode}})
        .then(resp=>{
            console.log(resp);
            toggleFormAction(null,true);
            setconfirmationDone(true)
        })
        .catch(e=>console.log(e))
    }


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
            axios({url:"/api/v1/userExist", params:{email}})
            .then(resp=>{
                console.log("useExist.data")
                console.log(resp.data);
                setUserExist(resp.data.userExist)
            })
            .catch(e=>{
                console.log("user doesnt exist")
                console.log(e)});
        }

    }, [firstName,lastName,email,password,confirmPassword, signUpRole, submitClicked])


    useEffect(()=>{
        if(credentials){
            navigate(`/${(credentials.user.role).toLowerCase()}`)

            // navigate(`/private`)
        }

    }, [credentials])

    useEffect(()=>{
        console.log(signUpRole)
    }, [signUpRole])


    return <form className={[style["form"], style["card"]].join(" ")}>
        <div className={style["form__action"]}>
            <button onClick={(e)=>toggleFormAction(e,true)} className={[signIn ? style["form__action-active"] : null, style["is-info"]].join(" ")}>Sign In</button>
            <button onClick={(e)=>toggleFormAction(e,false)} className={[signIn ? null : style["form__action-active"], style["is-info"]].join(" ")}>Sign Up</button>
        </div>
        <div className={[style["form__action-body"], signIn&&!confirmation&&!confirmationDone ? style["form__action-active"] : null].join(" ")}>
            <div>
                <input type="text" id="email" className={[!email&&missingField&&submitClicked ? style["form__field-required"] : null, style["input"]].join(" ")} placeholder="Email" onChange={(e)=>setEmail(e.target.value)} value={email} />
                {!email&&missingField&&submitClicked ? <p className={style["form__field-required-msg"]}>Email required!</p> : null}
            </div>
            <div>
                <input type="text" id="passsword" className={[!password&&missingField&&submitClicked ? style["form__field-required"] : null, style["input"]].join(" ")} placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password} />
                {!password&&missingField&&submitClicked ? <p className={style["form__field-required-msg"]}>Password required!</p> : null}
            </div>
            {incorrectSignIns ? <p className={style["form__field-required-msg"]}>Email or password is incorrect! Try again.</p> : null}
            <button onClick={(e)=>onClickSignIn(e)} className={[style["form__action-btn"], style["button"], style["is-info"]].join(" ")} type="click">Sign In</button>
            <button className={[style["form__action-btn"], style["button"], style["is-info"]].join(" ")} onClick={e=>{e.preventDefault();setConfirmation(true);}}>Confirm Account</button>
            <div className={style["annoucement-texts"]}>
                <p>Users with different role will see different UI when logged in. However, only the Admin UI and logic are functional at the moment.</p>
                <div>
                    <p>***Test User***</p>
                    <p>jedixyqe@teleg.eu</p>
                    <p>123password</p>
                </div>
            </div>
        </div>
        <div className={[style["form__action-body"], (signIn | confirmation | confirmationDone) ? null : style["form__action-active"]].join(" ")}>
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
                <div className={style["form__radio"]}>
                    <input id="roleRadio1" type="radio" name="role" value="STUDENT" onChange={(e)=>setSignUpRole(e.target.value)} checked={signUpRole==="STUDENT"}/>
                    <label htmlFor="roleRadio1" >Student</label>
                </div>
                <div className={style["form__radio"]}>
                    <input id="roleRadio2" type="radio" name="role" value="PROFESSOR" onChange={(e)=>setSignUpRole(e.target.value)} checked={signUpRole==="PROFESSOR"}/>
                    <label htmlFor="roleRadio2">Professor</label>
                </div>
                <div className={style["form__radio"]}>
                    <input id="roleRadio3" type="radio" name="role" value="ADMIN" onChange={(e)=>setSignUpRole(e.target.value)} checked={signUpRole==="ADMIN"}/>
                    <label htmlFor="roleRadio3">Admin</label>
                </div>
            </div>
            <button onClick={e=>onClickSignUp(e)} className={[style["form__action-btn"], style["button"], style["is-info"]].join(" ")}>Sign Up</button>
        </div>
        <div className={[style["form__action-body"], style["form__confirmation"], !signIn&&confirmation ?  style["form__action-active"] : null].join(" ")}>
            <input type="text" id="confirmCode" className={style["input"]} placeholder="Confirmation code" onChange={(e)=>setConfirmationCode(e.target.value)} value={confirmationCode} />
            <button className={[style["button"], style["is-info"]].join(" ")} onClick={(e)=>{e.preventDefault();onClickConfirmation(e);setSubmitClicked(true)}}>Confirm</button>
        </div>
        <div className={[style["form__action-body"], style["form__confirmation"], signIn&&confirmation&&!confirmationDone ?  style["form__action-active"] : null].join(" ")}>
            <input type="text" placeholder="Email" className={style["input"]} onChange={e=>setEmail(e.target.value)} value={email} />
            <input type="text" placeholder="Confirmation Code" className={style["input"]} onChange={e=>setConfirmationCode(e.target.value)} value={confirmationCode} />
            <button className={[style["button"], style["is-info"]].join(" ")} onClick={e=>{e.preventDefault();onClickConfirmation(e);setSubmitClicked(true)}}>Confirm</button>
        </div>
        {confirmationDone ? <p className={style["form__confirmation-success"]}>The confirmation was successful! <FontAwesomeIcon icon={faCheck}/> </p> : null}

    </form>
}