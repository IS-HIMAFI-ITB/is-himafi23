import { Button } from "./button";

type Props = {
  canScrollPrev: boolean;
  canScrollNext: boolean;
  onPrev(): void;
  onNext(): void;
};
const CarouselControls = (props: Props) => {
  return (
    <div className="flex justify-end gap-2 ">
      <Button
        onClick={() => {
          if (props.canScrollPrev) {
            props.onPrev();
          }
        }}
        disabled={!props.canScrollPrev}
        variant={"secondary"}
        className={""}
      >
        Prev
      </Button>
      <Button
        onClick={() => {
          if (props.canScrollNext) {
            props.onNext();
          }
        }}
        disabled={!props.canScrollNext}
        variant={"secondary"}
        className={""}
      >
        Next
      </Button>
    </div>
  );
};
export default CarouselControls;
