"use client";

import * as RadixSlider from "@radix-ui/react-slider"

interface SliderProps {
    value?: number;
    onChange?: (value: number) => void;
};

const Slider: React.FC<SliderProps> = ({
    value = 1,
    onChange,
}) => {
    const handleChange = (newValue: number[]) => {
        onChange?.(newValue[0]);
    }

    return (
        <RadixSlider.Root
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
            <RadixSlider.Track
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
                <RadixSlider.Range
                    className="
                        absolute
                        bg-white
                        group-hover:bg-green-500
                        active:bg-green-500
                        rounded-full
                        h-full
                    "
                />
            </RadixSlider.Track>
            <RadixSlider.Thumb className="block invisible group-hover:visible w-3 h-3 bg-white shadow-sm rounded-md" aria-label="Volume" />
        </RadixSlider.Root>
    );
}
 
export default Slider;