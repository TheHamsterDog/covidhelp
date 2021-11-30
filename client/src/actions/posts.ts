import {POST_LOADED} from '../constants';
import axios from 'axios'
import {setAlert} from './alert';
import {setAuthToken} from '../setAuthToken';
const Posts = async (dispatch: Function, from:number, to:number)=>{
    const data:any = {from:from,to:to}
    const posts= await axios.get('/all',data);
    dispatch({type:POST_LOADED, payload: posts.data.msg})
}
export default Posts; 
