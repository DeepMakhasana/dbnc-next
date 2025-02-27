import Link from "next/link";
import { MotionTopBottomDiv } from "./motion/TopBottomDiv";
import LocationStatus from "./LocationStatus";

const Header = () => {
  return (
    <MotionTopBottomDiv className="flex justify-between items-center py-6">
      <Link href="/" className="flex gap-3 items-center">
        <img src="/liveyst.svg" alt="liveyst" className="w-10 h-10 object-contain" />
        <h3 className="text-xl font-bold">Liveyst</h3>
      </Link>
      {/* <MoreOption /> */}
      <LocationStatus />
    </MotionTopBottomDiv>
  );
};

export default Header;
