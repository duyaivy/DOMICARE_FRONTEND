import SectionUser from '../../Layouts/SectionUser'

export default function History() {
  console.log(new Date().toISOString())
  return (
    <SectionUser title='Lịch sử dịch vụ' description='Xem lịch sử dịch vụ và trạng thái các dịch vụ tài khoản của bạn.'>
      <div className=''>Lịch sử</div>
    </SectionUser>
  )
}
