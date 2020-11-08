export const displayError = (file: string, fun: string, err: any): void => {
    console.log('------------------------------------------------------------');
    console.log('ERROR IN: ', file, ' => ', fun);
    console.log(err);
    console.log('------------------------------------------------------------');

};