export const validation = (value) => {

    let errors  = {}     

    if(!value.id) {
        errors.id="Id is required.*"
    }
    if(!value.name) {
        errors.name="Name is required.*"
    } else if(value.name.length < 5) {
        errors.name="Name filed must be more than 5 characters.*"
    }
    if(!value.country) {
        errors.country="Country is required.*"
    }
    if(!value.address) {
        errors.address="Address is required.*"
    } else {
        errors = null;
    }

    return errors; 

};
