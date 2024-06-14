import { create } from 'zustand';
import * as auth from '../../apis/auth';

const useInterfaceStore = create((set) => ({
  title : "",
  contents : "",
  addContents: async (state) => {
    set((state) => ({ title : state.title, contents : state.contents }));
    const response = await auth.creativeBoardContents({title:state.title,contents:state.contents});

    // const response = await auth.creativeBoardContents(state).
    //                          then((res)=>{useNavigate("/board")});
    // try{
      
    // }catch(error){
    //   console.log(error);
    // }
  }
                    
}));

export default useInterfaceStore;