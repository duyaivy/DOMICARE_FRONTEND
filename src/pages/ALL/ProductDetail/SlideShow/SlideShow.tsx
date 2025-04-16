import { Carousel, CarouselContent, CarouselItem, CarouselPagination } from '@/components/ui/carousel'

interface SlideShowProps {
  landingImages?: string[]
}
export default function SlideShow({ landingImages }: SlideShowProps) {
  return (
    <Carousel
      autoChange={true}
      autoChangeInterval={10000}
      opts={{
        align: 'start'
      }}
      className='w-full flex justify-center my-4 mo:my-10'
    >
      <CarouselContent className='flex items-center'>
        {landingImages &&
          landingImages.map((item) => {
            return (
              <CarouselItem key={item} className='  w-full flex justify-center '>
                <img src={item} alt='item' className='block w-auto md:h-[500px] h-[350px] object-cover' />
              </CarouselItem>
            )
          })}
      </CarouselContent>
      <CarouselPagination />
    </Carousel>
  )
}
