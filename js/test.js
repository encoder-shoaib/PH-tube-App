function getTimeString(time){
    const hour = parseInt(time /3600)
    const remainingSecond = parseInt(time %3600)
    const minute = parseInt(remainingSecond /60)
    remainingSecond = remainingSecond %60;
    return ` ${hour}h ${minute}m ${remainingSecond}s ago`
}
getTimeString(677)