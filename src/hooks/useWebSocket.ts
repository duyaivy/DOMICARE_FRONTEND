import { useEffect, useRef, useState } from 'react'
import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'

interface WebSocketConfig {
  url: string
  topics: {
    [key: string]: (message: any) => void
  }
  onConnect?: () => void
  onDisconnect?: () => void
  onError?: (error: any) => void
}

export const useWebSocket = (config: WebSocketConfig) => {
  const stompClient = useRef<Client | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (!config.url || !config.topics || Object.keys(config.topics).length === 0) {
      setIsConnected(false)
      return
    }
    if (stompClient.current) {
      stompClient.current.deactivate()
      stompClient.current = null
    }

    const client = new Client({
      webSocketFactory: () => new SockJS(config.url),
      debug: (str) => console.log('[STOMP]', str),
      reconnectDelay: 5000,
      onConnect: () => {
        setIsConnected(true)
        Object.entries(config.topics).forEach(([topic, callback]) => {
          client.subscribe(topic, (message) => {
            const data = JSON.parse(message.body)
            callback(data)
          })
        })

        config.onConnect?.()
      },
      onDisconnect: () => {
        setIsConnected(false)
        config.onDisconnect?.()
      },
      onStompError: (frame) => {
        setIsConnected(false)
        config.onError?.(frame)
      }
    })

    stompClient.current = client
    client.activate()

    return () => {
      // Cleanup on unmount or dependency change
      if (stompClient.current) {
        stompClient.current.deactivate()
        stompClient.current = null
        setIsConnected(false)
      }
    }
  }, [config])

  return {
    isConnected: isConnected
  }
}
