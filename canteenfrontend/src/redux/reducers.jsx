const Details = (state=[],action) => {
    switch(action.type) {
        case "setDetails": return action.payload;
        default : return state;
    }
}

export default Details;