"use client";

import SongItem from "@/components/SongItem";
import { useLikedSongs } from "@/hooks/useLikedSongs";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";
import { useEffect } from "react";

interface PageContentProps {
    songs: Song[];
    fetchedLikedSongs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({
    songs,
    fetchedLikedSongs
}) => {
    const onPlay = useOnPlay(songs);
    const {likedSongs, setLikedSongs} = useLikedSongs();
    const fetchedLikedSongsIds = fetchedLikedSongs?.map((item) => item.id)

    useEffect(() => {
            setLikedSongs((prevLikedSongs) => [...prevLikedSongs, ...fetchedLikedSongsIds])
    }, [fetchedLikedSongs]);

    if (songs.length === 0) {
        return (
            <div className="mt-4 text-neutral-400">
                No songs available.
            </div>
        )
    }

    return (
        <div
            className="
                grid
                grid-cols-2
                sm:grid-cols-3
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-8
                gap-4
                mt-4
            "
        >
            {songs.map((item) => (
                <SongItem
                    key={item.id}
                    onClick={(id: string) => onPlay(id)}
                    data={item}
                />
            ))}
        </div>
    );
}
 
export default PageContent;