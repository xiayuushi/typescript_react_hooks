import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChannels, toggleChannel } from '../store/actions/channels'
import { RootReducerType } from '../store'

const Channels = () => {
  const dispatch = useDispatch()
  const { channels } = useSelector((state: RootReducerType) => state)

  useEffect(() => {
    dispatch(getChannels())
  }, [])

  return (
    <ul className="catagtory">
      {
        channels.channels.map(v => (
          <li
            key={v.id}
            className={v.id === channels.activeId ? 'select' : ''}
            onClick={() => dispatch(toggleChannel(v.id))}
          >{v.name}</li>
        ))
      }
    </ul>
  )
}

export default Channels
