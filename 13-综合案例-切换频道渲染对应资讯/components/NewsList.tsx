import React, { useEffect } from 'react'
import avatar from '../assets/back.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { getNews } from '../store/actions/news'
import { RootReducerType } from '../store'

const NewsList = () => {
  const dispatch = useDispatch()
  const { channels, news } = useSelector((state: RootReducerType) => state)

  useEffect(() => {
    dispatch(getNews(channels.activeId))
  }, [channels.activeId, dispatch])

  return (
    <div className="list">
      {
        news.map(v => (
          <div className="article_item" key={v.art_id}>
            <h3 className="van-ellipsis">{v.title}</h3>
            <div className="img_box">
              {
                v.cover.type === 0
                  ? (<img src={avatar} className="w100" alt="" />)
                  : (<img src={v.cover.images?.[0]} className="w100" alt="" />)
              }
            </div>
            <div className="info_box">
              <span>{v.aut_id}</span>
              <span>{v.comm_count}条评论</span>
              <span>{v.pubdate}</span>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default NewsList
