"use client";

import * as SliderPrimitive from "@radix-ui/react-slider"
import { usePrevious } from "@radix-ui/react-use-previous"

interface SliderProps {
    value?: number;
    onCommit?: (value: number) => void;
    onChange?: (value: number) => void;
    defaultValue?: number;
    max?: number;
};

const SongSlider: React.FC<SliderProps> = ({
    value = 0,
    onCommit,
    onChange,
    defaultValue = 0,
    max = 0,
}) => {
    const handleCommit = (newValue: number[]) => {
        onCommit?.(newValue[0]);
    }

    const handleChange = (newValue: number[]) => {
        onChange?.(newValue[0]);
    }

    const prevValue = usePrevious([value]);

    return (
        <form>
        <SliderPrimitive.Root
            className="
                relative
                flex
                group
                items-center
                select-none
                touch-none
                w-full
                h-15
                m-2
                hover:cursor-pointer
            "
            defaultValue={[defaultValue]}
            value={[value]}
            max={max}
            step={1}
            onValueChange={handleChange}

            onPointerUp={() => {
                if (String(prevValue) !== String(value)) {
                    onCommit?.(value);
                  }
            }}
        >
            <SliderPrimitive.Track
                className="
                    bg-neutral-600
                    relative
                    grow
                    rounded-full
                    h-[7px]
                    group-hover:scale-y-150
                    transition
                "
            >
                <SliderPrimitive.Range
                    className="
                        absolute
                        bg-white
                        group-hover:bg-gradient-to-r
                        group-hover:from-green-200 
                        group-hover:via-green-300 
                        group-hover:to-blue-500
                        active:from-green-200 
                        active:via-green-300 
                        active:to-blue-500
                        rounded-full
                        h-full
                    "
                />
            </SliderPrimitive.Track>
            <SliderPrimitive.Thumb 
            className="block invisible group-hover:visible w-3 h-3 bg-white shadow-sm rounded-md" 
            aria-label="Volume"
            />
        </SliderPrimitive.Root>
        </form>
    );
}
 
export default SongSlider;