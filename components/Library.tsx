"use client";

import { TbPlaylist } from "react-icons/tb"
import {AiOutlinePlus} from "react-icons/ai"
import { useRouter } from "next/navigation";
import { MdDeleteOutline } from "react-icons/md"

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import { Song } from "@/types";
import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import toast from "react-hot-toast";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

interface LibraryProps {
    songs: Song[];
    renderText: boolean;
}

const Library: React.FC<LibraryProps> = ({
    songs,
    renderText = true,
}) => {
    const subscribeModal = useSubscribeModal();
    const authModal = useAuthModal();
    const uploadModal = useUploadModal();
    const { user, subscription } = useUser();
    const supabaseClient = useSupabaseClient();

    const onPlay = useOnPlay(songs);
    const router = useRouter();

    const onUploadClick = () => {
        if (!user) {
            return authModal.onOpen();
        }

        if (!subscription) {
            return subscribeModal.onOpen();
        }

        return uploadModal.onOpen();
    };

    const onLibraryClick = () => {
        if (!user) {
            return authModal.onOpen();
        }

        if (!subscription) {
            return subscribeModal.onOpen();
        }

        return router.push('/library');
    };

    const onDeleteClick = async (song: Song) => {
        try {

        const imageFile = song.image_path;
        const songFile = song.song_path;

        if (!imageFile || !songFile || !user) {
            toast.error('Something is missing');
            return;
        }
        
        const {
            error: songError
        } = await supabaseClient
                    .storage
                    .from('songs')
                    .remove([songFile])
        if (songError) {
            return toast.error('Failed song file deletion.')
        }

        const {
            error: imageError
        } = await supabaseClient
                    .storage
                    .from('images')
                    .remove([imageFile])
        if (imageError) {
            return toast.error('Failed image file deletion.')
        }

        const {
            error: supabaseError
        } = await supabaseClient
                    .from('songs')
                    .delete()
                    .eq('id', song.id)

        if (supabaseError) {
            return toast.error(supabaseError.message);
        }

        router.refresh();
        toast.success('Song deleted!');

    } catch (error) {
        toast.error((error as Error).message);
    } finally {    
        router.refresh();
    }
}
    return ( 
    <div className="flex flex-col">
        <div
        className="
            flex
            items-center
            justify-between
            px-5
            pt-4
        "
        >
        {renderText &&
        <div
        onClick={onLibraryClick}
        className="
            inline-flex
            items-center
            gap-x-2
            cursor-pointer
        "
        >
            <TbPlaylist className="text-neutral-400 group-hover:text-white group-hover:transition" size={26}/>
            <p
            className="
                text-neutral-400
                font-medium
                text-md
                group-hover:text-white
                group-hover:transition
            "
            >
                Your Library
            </p>
        </div>
        }
        {!renderText &&
        <p className="
            text-neutral-400
            font-medium
            text-md
            group-hover:text-white
            group-hover:transition
        ">
            Add a song
        </p>
        }
        <AiOutlinePlus 
            onClick={onUploadClick}
            size={20}
            className="
                text-neutral-400
                cursor-pointer
                hover:text-white
                transition
            "
            />
        </div>
        <div
        className="
            flex
            flex-col
            w-full
            gap-y-2
            mt-4
            px-3
        "
        >
            {songs.map((item) => (
                <div className="flex items-center gap-x-4 w-full" key={item.id}>
                    <div className="flex-1 overflow-hidden">
                    <MediaItem
                    onClick={(id: string) => onPlay(id)}
                    data={item} />
                    </div>
                    <MdDeleteOutline
                        onClick={() => onDeleteClick(item)}
                        size={30}
                        className="
                            text-neutral-400
                            cursor-pointer
                            hover:text-white
                            transition
                        "
                    />
                </div>
            ))}
        </div>
    </div> );
}
 
export default Library;