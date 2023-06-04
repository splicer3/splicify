"use client";

import { BsPauseFill, BsPlayFill } from "react-icons/bs"
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2"
import { useEffect, useState } from "react";
import useSound from "use-sound";

import { Song } from "@/types";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import VolumeSlider from "./VolumeSlider";
import SongSlider from "./SongSlider";
import usePlayer from "@/hooks/usePlayer";

interface PlayerContentProps {
    song: Song;
    songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({
    song,
    songUrl,
}) => {
    const player = usePlayer();
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    
    const Icon = isPlaying ? BsPauseFill : BsPlayFill;
    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

    const onPlayNext = () => {
        if (player.ids.length === 0) {
            return;
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const nextSong = player.ids[currentIndex + 1];

        if (!nextSong) {
            return player.setId(player.ids[0]);
        }

        player.setId(nextSong)
    }

    const onPlayPrevious = () => {
        if (player.ids.length === 0) {
            return;
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const previousSong = player.ids[currentIndex - 1];

        if (!previousSong) {
            return player.setId(player.ids[player.ids.length - 1]);
        }

        player.setId(previousSong)
    };

    const [currTime, setCurrTime] = useState({
        min: 0,
        sec: 0,
    })

    const [seconds, setSeconds] = useState(0);

    const [play, { pause, duration, sound }] = useSound(
        songUrl,
        {
            volume: volume,
            onplay: () => setIsPlaying(true),
            onend: () => {
                setIsPlaying(false),
                onPlayNext();
            },
            onpause: () => setIsPlaying(false),
            format: ['mp3']
        }
    );

    useEffect(() => {
        sound?.play();

        return () => {
            sound?.unload();
        }
    }, [sound]);

    useEffect(() => {
        const sec = duration != null ? duration / 1000 : 0;
        const min = Math.floor(sec / 60);
        const secRemain = Math.floor(sec % 60);
        const time = {
          min: min,
          sec: secRemain,
        };
    });

    useEffect(() => {
        const interval = setInterval(() => {
            if (sound && isPlaying) {
              setSeconds(sound.seek([])); // setting the seconds state with the current state
              const min = Math.floor(sound.seek([]) / 60);
              const sec = Math.floor(sound.seek([]) % 60);
              setCurrTime({
                min,
                sec,
              });
            }
          }, 1000);
          return () => clearInterval(interval);
    });

    const handlePlay = () => {
        if (!isPlaying) {
            play();
        } else {
            pause();
        }
    }

    const toggleMute = () => {
        if (volume === 0) {
            setVolume(1)
        } else {
            setVolume(0)
        }
    };

    const setSongProgress = (value: number) => {
        sound.seek([value]);
    }
    
    return (

        <div className="flex flex-col justify-between items-center h-full">
        <div className="grid md:grid-cols-3 grid-cols-1 w-full">
            <div className="flex h-full justify-center md:justify-start">
                <div className="flex items-center gap-x-4">
                    <MediaItem data={song}/>
                    <LikeButton songId={song.id}/>
                </div>
            </div>
            <div className="hidden md:flex h-full w-full justify-end md:justify-center justify-items-center">
                <div className="h-full flex justify-end md:justify-center items-center w-full max-w-[722px] gap-x-6">
                <div>
                    <AiFillStepBackward
                        size={30}
                        onClick={onPlayPrevious}
                        className="
                            text-white
                            md:text-neutral-400
                            cursor-pointer
                            md:hover:text-white
                            hover:scale-90
                            hover:opacity-75
                            md:hover:scale-110
                            md:hover:opacity-100
                            transition
                        "
                    />
                </div>
                <div
                    onClick={handlePlay}
                    className="
                        flex
                        items-center
                        justify-center
                        h-10
                        w-10
                        rounded-full
                        bg-white
                        p-1
                        cursor-pointer
                        hover:scale-95
                        hover:opacity-75
                        md:hover:scale-105
                        md:hover:opacity-100
                        transition
                    "
                >
                    <Icon size={30} className="text-black right-4"/>
                </div>
                <div>
                    <AiFillStepForward
                        onClick={onPlayNext}
                        size={30}
                        className="
                            text-white
                            md:text-neutral-400
                            cursor-pointer
                            md:hover:text-white
                            hover:scale-90
                            hover:opacity-75
                            md:hover:scale-110
                            md:hover:opacity-100
                            transition
                        "
                    />
                </div>
                </div>
            </div>
            <div className="hidden md:flex justify-end w-auto pr-2">
                <div className="flex items-center gap-x-2 w-[120px]">
                    <VolumeIcon
                        onClick={toggleMute}
                        className="cursor-pointer hover:opacity-75 hover:scale-95 transition"
                        size={34}
                    />
                    <VolumeSlider
                        value={volume}
                        onChange={(value) => setVolume(value)}
                    />
                </div>
            </div>
        </div>
        <div className="flex md:hidden justify-center items-center gap-x-6 w-full h-full">
            <div>
                    <AiFillStepBackward
                        size={30}
                        onClick={onPlayPrevious}
                        className="
                            text-white
                            md:text-neutral-400
                            cursor-pointer
                            md:hover:text-white
                            hover:scale-90
                            hover:opacity-75
                            md:hover:scale-110
                            md:hover:opacity-100
                            transition
                        "
                    />
                </div>
                <div
                    onClick={handlePlay}
                    className="
                        flex
                        items-center
                        justify-center
                        h-10
                        w-10
                        rounded-full
                        bg-white
                        p-1
                        cursor-pointer
                        hover:scale-95
                        hover:opacity-75
                        md:hover:scale-105
                        md:hover:opacity-100
                        transition
                    "
                >
                    <Icon size={30} className="text-black right-4"/>
                </div>
                <div>
                    <AiFillStepForward
                        onClick={onPlayNext}
                        size={30}
                        className="
                            text-white
                            md:text-neutral-400
                            cursor-pointer
                            md:hover:text-white
                            hover:scale-90
                            hover:opacity-75
                            md:hover:scale-110
                            md:hover:opacity-100
                            transition
                        "
                    />
                </div>
            </div>
            <div className="flex justify-center w-full max-w-2xl h-auto mb-1">
            <SongSlider
                    value={seconds}
                    onChange={(value) => setSeconds(value)}
                    onCommit={(value) => setSongProgress(value)}
                    max={duration != null ? duration / 1000 : 0}
                />
            </div>
        </div>
    );
};
 
export default PlayerContent;