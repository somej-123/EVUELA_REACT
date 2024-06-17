import { create } from 'zustand';
import * as auth from '../../apis/auth';

const useMainBoardZustand = create((set) => ({
  boardIdx : "",
  boardCreateDatetime : "",
  testdata1:"",
  title : "",
  contents : "",
  addContents: async (state) => {
    set((state) => ({ title : state.title, contents : state.contents }));
    const response = await auth.creativeBoardContents({title:state.title,contents:state.contents});
  }
                    
}));

export default useMainBoardZustand;