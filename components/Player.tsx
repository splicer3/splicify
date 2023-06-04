"use client";

import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";

const Player = () => {
    const player = usePlayer();
    const { song } = useGetSongById(player.activeId);

    const songUrl = useLoadSongUrl(song!);

    if (!song || !songUrl || !player.activeId) {
        return null;
    }

    return (
        <div
            className="
                fixed
                bottom-0
                bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
                from-teal-400
                via-indigo-900
                to-black
                to-75%
                md:bg-gradient-to-r
                md:from-teal-900
                md:via-indigo-900
                md:via-20%
                md:to-[#0a0421]
                md:to-40%
                w-full
                py-2
                h-[150px]
                md:h-[105px]
                px-4
            "
        >
            <PlayerContent
                key={songUrl}
                song={song}
                songUrl={songUrl}
            />
        </div>
    );
}
 
export default Player;