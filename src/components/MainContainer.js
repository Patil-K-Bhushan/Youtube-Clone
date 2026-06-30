import { useSelector } from "react-redux";
import ButtonList from "./ButtonList";
import VideoContainer from "./VideoContainer";
import { getChipFilter } from "../utils/chips";

const MainContainer = () => {
  const activeChip = useSelector((store) => store.app.activeChip);

  return (
    <main className="min-w-0">
      <ButtonList />
      <VideoContainer filter={getChipFilter(activeChip)} />
    </main>
  );
};

export default MainContainer;
