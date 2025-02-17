import { DoorClosed, DoorOpen, Radio } from "lucide-react";
import { MotionTopBottomDiv } from "../motion/TopBottomDiv";
import MoreOption from "./MoreOption";

const Header = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <MotionTopBottomDiv className="flex justify-between items-center py-6">
      {isOpen ? (
        <div className="flex gap-2 border-b-2 rounded py-2 px-4 text-green-800 border-green-800">
          <DoorOpen /> <strong>OPEN</strong>{" "}
          <div className="text-red-800 flex gap-1">
            <Radio className="w-4 h-4 " /> <span className="text-xs font-medium">Live</span>
          </div>
        </div>
      ) : (
        <div className="flex gap-2 border-b-2 rounded py-2 px-4 text-red-800 border-red-800">
          <DoorClosed /> <strong>CLOSE</strong>{" "}
          <div className="text-red-800 flex gap-1">
            <Radio className="w-4 h-4 " /> <span className="text-xs font-medium">Live</span>
          </div>
        </div>
      )}

      <MoreOption />
    </MotionTopBottomDiv>
  );
};

export default Header;
