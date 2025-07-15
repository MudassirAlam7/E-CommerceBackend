export const customResponse = async (res, status, message, error, success, data)=>{
    res.status(status).json({
        status, 
        message, 
        error,
        success,
        data
    })

}