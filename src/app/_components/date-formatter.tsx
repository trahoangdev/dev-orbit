import { parseISO, format } from "date-fns";
import { vi } from "date-fns/locale";

type Props = {
  dateString: string;
};

const DateFormatter = ({ dateString }: Props) => {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "d MMMM, yyyy", { locale: vi })}</time>;
};

export default DateFormatter;
