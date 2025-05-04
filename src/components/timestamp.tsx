import moment from "moment";
import "moment/locale/id"; // Bahasa Indonesia

moment.locale("id"); // Set locale Indonesia

const TimestampComponent = ({ createdAt }: { createdAt?: string }) => {
  const formattedTime = moment.utc(createdAt).local().fromNow();

  return <p>{formattedTime}</p>;
};

export default TimestampComponent;
