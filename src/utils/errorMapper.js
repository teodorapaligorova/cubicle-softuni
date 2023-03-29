exports.getErrorMessage = (error) => {

    if (Array.isArray(error)) {
        return error;
    } else if (error.name == 'MongoServerError') {
        if (error.code == 11000) {
            return [{
                msg: 'Username already exists'
            }];
        } else {
            return [{
                msg: 'Request error'
            }];
        }
    } else if (error.name == 'ValidationError') {
        return Object.values(error.errors).map(e => ({ msg: e.message }));
    } else if (typeof error.message == 'string') {
        return [{
            msg: error.message
        }];
    } else {
        return [{
            msg: 'Request error'
        }];
    }
}