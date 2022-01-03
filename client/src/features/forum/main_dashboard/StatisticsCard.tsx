interface StatisticsCardProps {
  numberOfEvents: number;
  engagement: number;
}

const StatisticsCard = ({
  numberOfEvents,
  engagement,
}: StatisticsCardProps) => {
  return (
    <div className="arma-card-gradient px-6 py-3 rounded-lg w-60 drop-shadow-xl">
      <div className="text-xl mb-2">Statistics</div>
      <div className="flex justify-between bg-white rounded-2xl p-2">
        <div className="pl-3 font-medium">Events</div>
        <div className="pr-3 arma-text-gradient text-transparent bg-clip-text text-[40px]">{numberOfEvents}</div>
      </div>
      <div className="flex justify-between bg-white rounded-2xl p-2 mt-4 mb-2">
        <div className="pl-3 font-medium">Engagement</div>
        <span className=" inline-block align-middle pr-3 arma-text-gradient text-transparent bg-clip-text text-[40px]" >{engagement}</span>
      </div>
    </div>
  );
};

export default StatisticsCard;
