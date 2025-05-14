import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrentcy } from '@/utils/formatCurrentcy'
const initialSaleOverview = [
  {
    id: 1,
    name: 'Olivia Martin',
    email: 'olivia.martin@example.com',
    avatar: '/avatars/01.png',
    ratio: 78,
    amount: 12063450
  },
  {
    id: 2,
    name: 'Jackson Lee',
    email: 'jackson.lee@example.com',
    avatar: '/avatars/02.png',
    amount: 12063450,
    ratio: 98
  },
  {
    id: 3,
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@example.com',
    avatar: '/avatars/03.png',
    amount: 1934900,
    ratio: 98
  },
  {
    id: 4,
    name: 'William Kim',
    email: 'william.kim@example.com',
    avatar: '/avatars/04.png',
    amount: 1278600,
    ratio: 98
  }
]
export function SaleOverview() {
  return (
    <Card className='flex flex-col '>
      <CardHeader className='items-center pb-0'>
        <CardTitle className='text-lg font-semibold capitalize'>Nhân viên ưu tú</CardTitle>
        <CardDescription>Tháng 5 - 2025</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-0 px-5'>
        <div className='space-y-8'>
          {initialSaleOverview.map((item) => (
            <div className='flex items-center' key={item.id}>
              <Avatar className='size-9'>
                <AvatarImage src={item.avatar} alt='Avatar' />
                <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className='ml-4 space-y-1'>
                <p className='text-sm font-medium leading-none'>{item.name}</p>
                <p className='text-sm text-muted-foreground'>{item.email}</p>
              </div>
              <div className='ml-auto font-medium'>
                <p className='text-sm font-medium text-right'>{formatCurrentcy(item.amount)} VND</p>
                <p className='text-sm text-muted-foreground text-right'>Tỉ lệ thành công: {item.ratio}%</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className='flex-col justify-start gap-2 text-sm'>
        {/* <div className='flex items-center gap-2 font-medium leading-none text-center'>
          Tỉ lệ tư vấn thành công tăng 5.2% trong tháng này <TrendingUp className='h-4 w-4' />
        </div> */}
        <div className='leading-none text-left text-muted-foreground w-full mt-3'>
          Dữ liệu doanh thu được tính toán từ quý gần nhất
        </div>
      </CardFooter>
    </Card>
  )
}
