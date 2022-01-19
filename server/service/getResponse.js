const errors = require('../errors/en');

exports.getRes = (status, obj = {}) => {
    let result = {status};
    if(!!status) {
        result.error = [getError(status)];
        if (obj?.error) {
            Array.isArray(obj.error) ? result.error.push(...obj.error) : result.error.push(obj.error);
        }
    }
    if (obj?.message) {
        if(Array.isArray(obj.message)) {
            result.message = obj.message;
        } else {
            result.message = [obj.message];
        }
    }
    if (obj?.data) {
        result.data = obj.data;
    }
    return result;
}

function getError(num) {
    if(errors[num]) {
        return errors[num];
    }
    return errors[100];
}