const initialState={
    email:"",
}
const emailreducer=(state=initialState,action)=>{
    switch(action.type){
        case 'CHANGE_NAME':{
            return {
                ...state,
                email:action.payload
            }
        }
        default:return state
    }
    
}
export default emailreducer;