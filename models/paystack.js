const request =require("request");

const paystack = (req) => {
    const MySecretKey = 'sk_test_66884bd20ac9781e2ee8fd97f2a95c9fc563b195';
    //sk_test_xxxx to be replaced by your own secret key
    const initializePayment = (form, mycallback) => {
        const option = {
            url : 'https://api.paystack.co/transaction/initialize',
            headers : {
                Authorization:"Bearer "+MySecretKey,
                'content-type': 'application/json',
                'cache-control': 'no-cache'
           },
           form
        }
        const callback = (error, response, body)=>{
            return mycallback(error, body);
        }
        request.post(option,callback);
    }

    const verifyPayment = (ref,mycallback) => {
        const option = {
            url : 'https://api.paystack.co/transaction/verify/' + encodeURIComponent(ref),
            headers : {
                Authorization:"Bearer "+ MySecretKey,
                'content-type': 'application/json',
                'cache-control': 'no-cache'
           }
        }
        const callback = (error, response, body)=>{
            return mycallback(error, body);
        }
        request(option,callback);
    }
    return {initializePayment, verifyPayment};
}
module.exports = paystack