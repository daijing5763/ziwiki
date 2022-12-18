
export  function login_validate(values:{ [key: string]: string }) {
    const errors: { [key: string]: string } = {};
    if (!values.username) {
        errors.username = 'Required';
    }
    // validation for password
    if(!values.password){
        errors.password = "Required";
    } else if(values.password.length < 8 || values.password.length > 20){
        errors.password = "Must be greater then 8 and less then 20 characters long";
    } else if(values.password.includes(" ")){
        errors.password = "Invalid Password";
    }
    return errors;
}

export  function createrepo_validate(values:{ [key: string]: string }) {
    const errors: { [key: string]: string } = {};
    if (!values.repo_name) {
        errors.repo_name = 'Required';
    }
    if (!values.repo_git) {
        errors.repo_git = 'Required';
    }
    if (!values.repo_describe) {
        errors.repo_describe = 'Required';
    }
    if (!values.repo_from || values.repo_from == "" ) {
        errors.repo_from = 'Required';
    }

    if (!values.access_type) {
        errors.access_type = 'Required';
    }
    if (!values.repo_user_name) {
        errors.repo_user_name = 'Required';
    }
    if (!values.repo_access_token) {
        errors.repo_access_token = 'Required';
    }

    return errors;
}






export function registerValidate(values: { [key: string]: string }) {
    const errors: { [key: string]: string } = {};
    if(!values.username){
        errors.username = "Required";
    }else if(values.username.includes(" ")){
        errors.username = "Invalid Username...!"
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    // validation for password
    if(!values.password){
        errors.password = "Required";
    } else if(values.password.length < 8 || values.password.length > 20){
        errors.password = "Must be greater then 8 and less then 20 characters long";
    } else if(values.password.includes(" ")){
        errors.password = "Invalid Password";
    }

    // validate confirm password
    if(!values.cpassword){
        errors.cpassword = "Required";
    } else if(values.password !== values.cpassword){
        errors.cpassword = "Password Not Match...!"
    } else if(values.cpassword.includes(" ")){
        errors.cpassword = "Invalid Confirm Password"
    }

    return errors;
}