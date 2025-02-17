import { MotionTopBottomDiv } from "./motion/TopBottomDiv";
import MoreOption from "./store/MoreOption";

const Header = () => {
  return (
    <MotionTopBottomDiv className="flex justify-between items-center py-6">
      <div>
        <img src="/bliveprofile.svg" alt="bliveprofile" className="w-10 h-10 object-contain" />
      </div>
      <MoreOption />
    </MotionTopBottomDiv>
  );
};

export default Header;
