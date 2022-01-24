interface SelectedHallsProps {
  SelectedHalls: string[];
}

const SelectHalls = (props: SelectedHallsProps) => {
  const HallsList = (halls: string[]) =>
    halls.map((hall: string) => {
      return (
        <div className="flex flex-row justify-around">
          <div className="w-6/12">{hall}</div>{" "}
          <div className="w-6/12">Afternoon</div>
        </div>
      );
    });
  return <div>{HallsList(props.SelectedHalls)}</div>;
};
export { SelectHalls };
