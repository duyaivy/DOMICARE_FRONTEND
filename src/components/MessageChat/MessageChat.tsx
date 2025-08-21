import classNames from 'classnames'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Conversation } from '@/models/interface/chat.interface'

export default function MessageChat({
  messages,
  userId,
  fetchMoreConversation,
  hasMore
}: {
  messages: Conversation[]
  userId?: string
  fetchMoreConversation: () => void
  hasMore: boolean
}) {
  return (
    <div
      id='scrollableDiv'
      style={{
        height: 400,
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse' // quan trọng ✅
      }}
    >
      <InfiniteScroll
        dataLength={messages.length}
        next={fetchMoreConversation}
        hasMore={hasMore}
        inverse={true}
        scrollableTarget='scrollableDiv'
        loader={<div className='w-full text-center py-2 text-sm text-gray-500'>Đang tải thêm...</div>}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          padding: '10px'
        }}
      >
        {messages.map((item) => (
          <div
            className={classNames('flex w-full', {
              'justify-end': userId === item.sender_id,
              'justify-start': userId !== item.sender_id
            })}
            key={item._id}
          >
            <p
              className={classNames('max-w-[70%] px-3 py-2 my-1 text-white rounded-lg break-words', {
                'bg-blue-500': userId === item.sender_id,
                'bg-gray-600': userId !== item.sender_id
              })}
            >
              {item.message}
            </p>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  )
}
