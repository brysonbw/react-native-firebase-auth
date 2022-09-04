/** Formik (form) value types 
 * 
 * Using Formik with typescript
 * > This is what I've done but as always if you think differently by all means change this 
 * 
 * Docs: https://formik.org/docs/guides/typescript
*/

// Login Values
export interface LoginValues {
    email: string,
    password:string,
}

// SignUp Values
export interface SignupValues {
    username: string,
    email: string,
    password:string,
  }


// Password Reset Values
export interface PasswordResetValues {
    email: string
}
