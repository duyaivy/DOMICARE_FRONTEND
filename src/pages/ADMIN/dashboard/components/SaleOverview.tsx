import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { initialSaleOverview } from '@/core/constants/initialValue.const'
import { formatCurrentcy } from '@/utils/formatCurrentcy'

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
                <p className='text-sm text-muted-foreground text-right'>Tỉ lệ: {item.ratio}%</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className='flex-col justify-start gap-2 text-sm'>
        <div className='leading-none text-left text-muted-foreground w-full mt-3'>
          Dữ liệu doanh thu được tính toán từ quý gần nhất
        </div>
      </CardFooter>
    </Card>
  )
}
