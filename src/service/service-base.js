export default class UserBase{

    TratarResponse(response)
    {
        if (response.data != null && response.data.AnswerType == 3)
        {
            return Promise.reject({
                'response':{
                    'data': response.data
                }
            });
        }
        return Promise.resolve(response);
    }
}