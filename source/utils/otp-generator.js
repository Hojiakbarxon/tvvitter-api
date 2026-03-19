import { generate } from "otp-generator";

export default function generateOtp(){
    let otp = generate(6, {
        lowerCaseAlphabets : false,
        upperCaseAlphabets : false,
        specialChars : false
    })

    return otp
}