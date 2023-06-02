import { useContext, useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { toast } from "react-hot-toast";

import { LikedSongsContext } from "@/contexts/LikedSongsContext";
import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";

interface LikeButtonProps {
  songId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();

  const authModal = useAuthModal();
  const { user } = useUser();

  const { likedSongs, setLikedSongs } = useContext(LikedSongsContext);
  const [isLiked, setIsLiked] = useState(false);
  

  useEffect(() => {
    if (likedSongs.includes(songId)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [likedSongs, songId]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async () => {
    if (!user) {
      return authModal.onOpen();
    }

    try {
      if (isLiked) {
        const { error } = await supabaseClient
          .from("liked_songs")
          .delete()
          .eq("user_id", user.id)
          .eq("song_id", songId);

        setLikedSongs((prevLikedSongs) =>
          prevLikedSongs.filter((id) => id !== songId)
        );
        setIsLiked(false);
      } else {
            const { error } = await supabaseClient
            .from("liked_songs")
            .insert([
        {
          user_id: user.id,
          song_id: songId,
        },
        ]);

        setLikedSongs((prevLikedSongs) => [...prevLikedSongs, songId]);
        setIsLiked(true);
      }

      toast.success(isLiked ? "Unliked!" : "Liked!");
    } catch (error) {
      toast.error("Something went wrong!");
    }

    router.refresh();
  };

  return (
    <button
      onClick={handleLike}
      className="hover:opacity-75 hover:scale-110 group/songitem:invisible group-hover/songitem:visible transition"
    >
      <Icon color={isLiked ? "#22c5e" : "white"} size={25} />
    </button>
  );
};

export default LikeButton;
