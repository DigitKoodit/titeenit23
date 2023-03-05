import { TableCell } from './TableCell';

export interface TimetableData {
  day: string;
  startTime: string;
  endTime: string;
  title: string;
  description: string;
}

const Time = ({ data }: { data: TimetableData[] }) => {
  return (
    <>
      {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
        <tr key={'hour-' + hour}>
          <TableCell data={data}>{('0' + hour).slice(-2)}</TableCell>
          <TableCell data={data} hour={hour} day="fri" />
          <TableCell data={data} hour={hour} day="sat" />
          <TableCell data={data} hour={hour} day="sun" />
        </tr>
      ))}
    </>
  );
};

export const Timetable = ({ data }: { data: TimetableData[] }) => {
  return (
    <div className="w-full max-h-[36rem] overflow-scroll flex flex-row">
      <table className="w-full bg-[#302C36]">
        <tr>
          <th className="border-l border-t border-b border-gray-600"></th>
          <th className="min-w-[20rem] w-1/3 text-left border-t border-b border-gray-600 p-4">
            Perjantai 18.3
          </th>
          <th className="min-w-[20rem] w-1/3 text-left border border-gray-600 p-4 pl-8">
            Lauantai 19.3
          </th>
          <th className="min-w-[20rem] w-1/3 text-left border border-gray-600 p-4 pl-8">
            sunnuntai 20.3
          </th>
        </tr>
        <Time data={data} />
      </table>
    </div>
  );
};
