import {createContext} from "react";
import { Auth_Types } from "../../myTypes";

export const AuthContext = createContext<Auth_Types.CredentialsContext | null>(null);