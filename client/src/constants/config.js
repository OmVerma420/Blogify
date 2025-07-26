export const API_NOTIFICATION_MESSAGES = {
    loading: {
        title:'Loading...',
        message:'Data is being loaded, Please wait'
    },
    success: {
        title:'Success',
        message:'Data successfully loaded'
    },
    responseFailure: {
        title:'Error',
        message:'An error occurred while fetching response from the server, Please try again'
    },
    requestFailure: {
        title:'Error',
        message:'An error occurred while sending request to the server, Please try again'
    },
    networkError: {
        title:'Error',
        message:'Unable to connect with the server. Please check interneet connectivity and try again later'
    },
}

// API SERVICE CALL
export const SERVICE_URLS = {
    userSignup : { url:"/users/signup", method: 'POST'},
    userLogin : { url:"/users/login", method: 'POST'},
    uploadFile : { url:"/users/file/upload", method: 'POST'}
}
