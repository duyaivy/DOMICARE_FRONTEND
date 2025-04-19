// import classNames from 'classnames'
// import { isEqual } from 'lodash'
// import { createSearchParams, Link, useLocation } from 'react-router-dom'
// import { path } from 'src/constants/path.constant'
// import { statusName } from 'src/constants/purchases.constant'
// import { QueryPurchaseConfig } from 'src/hooks/useQueryConfig'

// interface StatusListProps {
//   queryString: QueryPurchaseConfig
// }
// export default function StatusList({ queryString }: StatusListProps) {
//   const isActive = (id: string) => isEqual(queryString.status, id)

//   return (
//     <ul className='bg-white flex justify-around items-center  text-black overflow-x-auto overflow-y-hidden w-full rounded-xs '>
//       {Array(7)
//         .fill(0)
//         .map((_, index) => {
//           return (
//             <li
//               key={index}
//               className={classNames('border-b-transparent  border-b-2 shrink-0 group cursor-pointer  h-full group', {
//                 'text-main  !border-b-main ': isActive((index - 1).toString())
//               })}
//             >
//               <Link
//                 to={{
//                   pathname: path.purchases,
//                   search: createSearchParams({
//                     status: (index - 1).toString()
//                   }).toString()
//                 }}
//                 className={classNames('group-hover:text-main p-4  duration-300 block w-full h-full')}
//               >
//                 {statusName[(index - 1) as keyof typeof statusName]}
//               </Link>
//             </li>
//           )
//         })}
//     </ul>
//   )
// }

export default function StatusList() {
  return <div>StatusList</div>
}
