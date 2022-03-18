import { XxxNewsActionType } from '../../actions/news'

type XxxNewsStateType = {
  art_id: string,
  aut_id: string,
  aut_name: string,
  comm_count: number,
  cover: { type: number, images?: string[] },
  is_top: number,
  pubdate: string,
  title: string
}[]

const initState: XxxNewsStateType = []

const newsReducer = (state = initState, action: XxxNewsActionType): XxxNewsStateType => {
  if (action.type === 'NEWS/GET_NEWS') {
    return action.payload
  }
  return state
}


export default newsReducer

