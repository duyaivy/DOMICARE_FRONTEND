import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import config from '@/configs'
import { ICON_SIZE_EXTRA } from '@/configs/icon-size'
import { AppContext } from '@/core/contexts/app.context'
import classNames from 'classnames'
import { MessageSquare, Send } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
interface Message {
  sender_id: string
  message: string
  isSender?: boolean
}
export function Chat() {
  const [value, setValue] = useState<string>('')
  const [user, setUser] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>([])
  const { profile } = useContext(AppContext)
  //socket
  const socket = io(config.baseUrl)
  useEffect(() => {
    socket.auth = {
      _id: profile?._id
    }
    socket.connect()
    socket.on('receive chat', (data: Message) => {
      setMessages((prev) => [...prev, data])
    })
    return () => {
      socket.disconnect()
    }
  }, [socket, profile])
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setValue('')
    setMessages((prev) => [...prev, { sender_id: profile?._id as string, message: value, isSender: true }])
    socket.emit('private chat', { receiver_id: user, message: value })
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className='flex rounded-full mt-6 shadow-sm m-2 items-center justify-center size-16 cursor-pointer text-white bg-emerald-400'>
          <MessageSquare width={ICON_SIZE_EXTRA} height={ICON_SIZE_EXTRA} />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Chat</SheetTitle>
        </SheetHeader>
        <div className='px-4 max-h-10/12 overflow-y-scroll'>
          <div className=''>
            <Label htmlFor='sheet-demo-username'>Username</Label>
            <Input id='sheet-demo-username' value={user} onChange={(e) => setUser(e.target.value)} />
          </div>

          <div className=' w-full '>
            {messages.map((item) => (
              <div
                className={classNames('flex ', {
                  'justify-end': item.isSender
                })}
                key={item.sender_id}
              >
                <p
                  className={classNames(
                    ' max-w-4/6 px-2  py-1 my-0.5 text-white rounded-md',
                    {
                      ' bg-blue ': item.isSender
                    },
                    {
                      ' bg-gray ': !item.isSender
                    }
                  )}
                >
                  {item.message}
                </p>
              </div>
            ))}
          </div>
        </div>
        <SheetFooter>
          <form className='flex gap-2 w-full' onSubmit={handleSubmit}>
            <Input value={value} onChange={(e) => setValue(e.target.value)} className='flex-grow ' type='text' />
            <Button type='submit'>
              <Send size={ICON_SIZE_EXTRA} />
            </Button>
          </form>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
