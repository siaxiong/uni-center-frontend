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
    const {credentials, setCredentials} = useContext(AuthContext)
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("siaxiong23@icloud.com");
    const [password, setPassword] = useState("123password");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmationCode, setConfirmationCode] = useState("");
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

        setMissingField(true);
        setUserExist(false);
        setSubmitClicked(false);
        setConfirmation(false)
        setconfirmationDone(false);

    };

    const onClickSignIn = async (e) => {
        e.preventDefault();
        if(email&&password){
            axios({method:"POST",url:"/api/signin",data:{email,password}})
            .then(resp =>{
                // setIncorrectSignIngs(false);
                sessionStorage.setItem("/api/signin", JSON.stringify(resp.data.Credentials))
                setCredentials(resp.data.Credentials);
                navigate(`/${(resp.data.Credentials.role).toLowerCase()}`)
                console.log(`/${(resp.data.Credentials.role).toLowerCase()}`)
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
        if(!userExist&&firstName&&lastName&&email&&password&&(password===confirmPassword)){
            axios({method:"POST",url:"/api/signup",data:{email,password,fullName: `${firstName} ${lastName}`}})
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
        axios({method: "POST", url: "/api/confirmation", data:{email, confirmationCode}})
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
            setMissingField(!(email && password && (password === confirmPassword) && password && firstName && lastName));
        }

        //check if account with the email already existed
        if(!signIn&&email){
            (async()=>{
                const resp = await axios({url:"/api/userExistence", params:{email}});
                setUserExist(resp.data);
            })()
        }

    }, [firstName,lastName,email,password,confirmPassword, submitClicked])


    useEffect(()=>{
        if(credentials){
            navigate(`/${(credentials.role).toLowerCase()}`)

        }

    }, [credentials])


    return <form className={FormStyle["form"]}>
        <div className={FormStyle["form__action"]}>
            <button onClick={(e)=>toggleFormAction(e,true)} className={[signIn ? FormStyle["form__action-active"] : null].join(" ")}>Sign In</button>
            <button onClick={(e)=>toggleFormAction(e,false)} className={[signIn ? null : FormStyle["form__action-active"]].join(" ")}>Sign Up</button>
        </div>
        <div className={[FormStyle["form__action-body"], signIn&&!confirmation&&!confirmationDone ? FormStyle["form__action-active"] : null].join(" ")}>
            <div>
                <input type="text" id="email" className={!email&&missingField&&submitClicked ? FormStyle["form__field-required"] : null} placeholder="Email" onChange={(e)=>setEmail(e.target.value)} value={email} />
                {!email&&missingField&&submitClicked ? <p className={FormStyle["form__field-required-msg"]}>Email required!</p> : null}
            </div>
            <div>
                <input type="text" id="passsword" className={!password&&missingField&&submitClicked ? FormStyle["form__field-required"] : null} placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password} />
                {!password&&missingField&&submitClicked ? <p className={FormStyle["form__field-required-msg"]}>Password required!</p> : null}
            </div>
            {incorrectSignIns ? <p className={FormStyle["form__field-required-msg"]}>Email or password is incorrect! Try again.</p> : null}
            <button onClick={(e)=>onClickSignIn(e)} className={FormStyle["form__action-btn"]} type="click">Sign In</button>
            <button className={FormStyle["form__action-btn"]} onClick={e=>{e.preventDefault();setConfirmation(true);}}>Confirm Account</button>
        </div>
        <div className={[FormStyle["form__action-body"], (signIn | confirmation | confirmationDone) ? null : FormStyle["form__action-active"]].join(" ")}>
            <div>
                <input type="text" id="firstName" className={!firstName&&missingField&&submitClicked ? FormStyle["form__field-required"] : null} placeholder="First Name" onChange={(e)=>setFirstName(e.target.value)} value={firstName} />
                {!firstName&&missingField&&submitClicked ? <p className={FormStyle["form__field-required-msg"]}>First name required!</p> : null}
            </div>
            <div>
                <input type="text" id="lastName" className={!lastName&&missingField&&submitClicked ? FormStyle["form__field-required"] : null} placeholder="Last Name" onChange={(e)=>setLastName(e.target.value)} value={lastName} />
                {!lastName&&missingField&&submitClicked ? <p className={FormStyle["form__field-required-msg"]}>Last name required!</p> : null}
            </div>
            <div>
                <input type="text" id="email" className={!email&&missingField&&submitClicked ? FormStyle["form__field-required"] : null} placeholder="Email" onChange={(e)=>setEmail(e.target.value)} value={email} />
                {!email&&missingField&&submitClicked ? <p className={FormStyle["form__field-required-msg"]}>Email required!</p> : null}   
                {userExist ? <p className={FormStyle["form__field-required-msg"]}>Email already taken! Use different email.</p> : null}         
            </div>
            <div>
                <input type="text" id="password" className={!email&&missingField&&submitClicked ? FormStyle["form__field-required"] : null} placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password} />
                {!password&&missingField&&submitClicked ? <p className={FormStyle["form__field-required-msg"]}>Password required!</p> : null}
            </div>
            <div>
                <input type="text" id="confirmPassword" className={!confirmPassword&&missingField&&submitClicked ? FormStyle["form__field-required"] : null} placeholder="Password" onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword} />
                {!confirmPassword&&missingField&&submitClicked ? <p className={FormStyle["form__field-required-msg"]}>Confirm Password required!</p> : null}            
            </div>
            {/* <div className={FormStyle["form__radio-group"]}>
                <div className={FormStyle["form__radio"]}>
                    <input id="roleRadio1" type="radio" name="role" value="student" checked/>
                    <label for="roleRadio1" >Student</label>
                </div>
                <div className={FormStyle["form__radio"]}>
                    <input id="roleRadio2" type="radio" name="role" value="professor"/>
                    <label for="roleRadio2">Professor</label>
                </div>
                <div className={FormStyle["form__radio"]}>
                    <input id="roleRadio3" type="radio" name="role" value="admin"/>
                    <label for="roleRadio3">Admin</label>

                </div>
            </div> */}
            <button onClick={e=>onClickSignUp(e)} className={FormStyle["form__action-btn"]}>Sign Up</button>
        </div>
        <div className={[FormStyle["form__action-body"], FormStyle["form__confirmation"], !signIn&&confirmation ?  FormStyle["form__action-active"] : null].join(" ")}>
            <input type="text" id="confirmCode" placeholder="Confirmation code" onChange={(e)=>setConfirmationCode(e.target.value)} value={confirmationCode} />
            <button onClick={(e)=>{e.preventDefault();onClickConfirmation(e);setSubmitClicked(true)}}>Confirm</button>
        </div>
        <div className={[FormStyle["form__action-body"], FormStyle["form__confirmation"], signIn&&confirmation&&!confirmationDone ?  FormStyle["form__action-active"] : null].join(" ")}>
            <input type="text" placeholder="Email" onChange={e=>setEmail(e.target.value)} value={email} />
            <input type="text" placeholder="Confirmation Code" onChange={e=>setConfirmationCode(e.target.value)} value={confirmationCode} />
            <button onClick={e=>{e.preventDefault();onClickConfirmation(e);setSubmitClicked(true)}}>Confirm</button>
        </div>
        {confirmationDone ? <p className={FormStyle["form__confirmation-success"]}>The confirmation was successful! <FontAwesomeIcon icon={faCheck}/> </p> : null}

    </form>
}