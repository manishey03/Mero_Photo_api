// import { parseISO, startOfDay } from 'date-fns';
// import { AvailableStatus, IAvailabilityBusiness, IAvailabilityFilter } from './type';

// export default class AvailabilityBusiness implements IAvailabilityBusiness {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   buildFilter(query: IAvailabilityFilter): { filter: Record<string, any>; limit: number; page: number } {
//     const filter = {
//       ...(query.date
//         ? {
//             date: startOfDay(parseISO(query.date)),
//           }
//         : {}),
//       status: AvailableStatus.Available,
//     };

//     const page = query.page ? Number(query.page) : 1;
//     const limit = query.limit ? Number(query.limit) : 10;

//     return { filter, limit, page };
//   }
// }
