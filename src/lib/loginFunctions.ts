"use server"

import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";


export type loginData = {
    username: FormDataEntryValue | null, 
    password: FormDataEntryValue | null, 
    logged: boolean,
}
export type Msg = {
    username?: FormDataEntryValue | null,
    errorUsername?: string, 
    errorPassword?: string,
    message?: string
}

// -------------------------- gets initial data -------------------------- //

export const getLoginData = async () : Promise<RequestCookie | undefined> => {
    const cookieStore = await cookies();
    return cookieStore.get("loginData");
}

// -------------------------- saves data -------------------------- //

const saveData = async ({data} : {data : loginData}) : Promise<boolean> => {
    const cookieStore = await cookies();

    cookieStore.set("loginData", JSON.stringify(data),{
        httpOnly: true,
        sameSite: "strict",
    });

    return true;
}


// -------------------------- login in  -------------------------- //

export async function loginIn(
  previousState: { message?: string; error?: string } | undefined,
  formData: FormData
): Promise<Msg> {

    const username = formData.get("username")?.toString() ?? ' ' as string;
    const password = formData.get("password")?.toString() ?? ' ' as string;
    let msg : Msg = {username : username};

    const hasSpace = (str : string) => /\s/.test(str);
    const isInvalid = (str : string) => hasSpace(str) || str.trim().length < 6;

    if (isInvalid(username) || isInvalid(password)) {
        const msgErrors : Msg = {};

        if (isInvalid(username)) {
            msgErrors.errorUsername = hasSpace(username)
                ? "Username cannot have spaces"
                : "Invalid username";
        }

        if (isInvalid(password)) {
            msgErrors.errorPassword = hasSpace(password)
                ? "Password cannot have spaces"
                : "Invalid password";
        }

        return { ...msg, ...msgErrors };
    }

    const login = await getLoginData();

    if(!login){
        const data : loginData = {
            username: username,
            password: await bcrypt.hash(password, 10),
            logged: true,
        };

        await saveData({data});
        return {message: "Sucess"};
    }

    let loginData;

    try{ loginData = JSON.parse(login.value); }
    catch{return {errorPassword: "unknown error"} }

    const credentials = {
        username: loginData.username === username,
        password: await bcrypt.compare( password, loginData.password)
    };

    if(!credentials.username || !credentials.password){
        msg = {
            ...msg,
            ...(!credentials.username && {errorUsername:  "Invalid username"}),
            ...(!credentials.password && {errorPassword:  "Invalid password"}),
        };
        
    }else{
        msg = {message: "Sucess"};
        const req : loginData = {...loginData, logged : true};
        await saveData({data : req});
    }

    return msg;
}

// -------------------------- exit  -------------------------- //

export async function exit() : Promise<boolean> {
    const login = await getLoginData();
    
    if(!login || !login.value) return false

    const data = JSON.parse(login.value);
    data.logged = false;

    return await saveData({data});
}