const response = (res,status) => {
    return {response: res, status: parseInt(status)}
}

module.exports = response;