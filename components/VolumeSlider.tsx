"use client";

import * as SliderPrimitive from "@radix-ui/react-slider"

interface SliderProps {
    value?: number;
    onChange?: (value: number) => void;
};

const VolumeSlider: React.FC<SliderProps> = ({
    value = 1,
    onChange,
}) => {
    const handleChange = (newValue: number[]) => {
        onChange?.(newValue[0]);
    }

    return (
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
                hover:cursor-pointer
            "
            defaultValue={[1]}
            value={[value]}
            onValueChange={handleChange}
            max={1}
            step={0.1}
        >
            <SliderPrimitive.Track
                className="
                    bg-neutral-600
                    relative
                    grow
                    rounded-full
                    h-[4px]
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
            <SliderPrimitive.Thumb className="block invisible group-hover:visible w-3 h-3 bg-white shadow-sm rounded-md" aria-label="Volume" />
        </SliderPrimitive.Root>
    );
}
 
export default VolumeSlider;