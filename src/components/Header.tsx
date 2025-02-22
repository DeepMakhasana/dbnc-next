import { MotionTopBottomDiv } from "./motion/TopBottomDiv";
import MoreOption from "./store/MoreOption";

const Header = () => {
  return (
    <MotionTopBottomDiv className="flex justify-between items-center py-6">
      <div className="flex gap-3 items-center">
        <img src="/liveyst.svg" alt="liveyst" className="w-10 h-10 object-contain" />
        <h3 className="text-xl font-bold">Liveyst</h3>
      </div>
      <MoreOption />
    </MotionTopBottomDiv>
  );
};

export default Header;
