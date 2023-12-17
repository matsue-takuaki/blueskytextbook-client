import React, { useState, useEffect } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { apiClient } from "@/lib/apiClient";
import { useInfo } from "@/context/info";
import Textbook from "@/lib/type";

interface Props {
  textbook: Textbook | undefined;
}

function Heart(props: Props) {
  const { textbook } = props;
  const { userId } = useInfo();
  const [like, setLike] = useState(false);
  useEffect(() => {
    const processHeart = async () => {
      await apiClient
        .post("/good/get_favorite", {
          sellerId: userId,
          textbookId: textbook?.id,
        })
        .then((response) => {
          setLike(response.data.favorite != undefined);
        });
    };
    processHeart();
  }, [textbook]);
  
  const heartSubmit = () => {
    const reversalLike = !like;
    setLike(reversalLike);
    if (reversalLike) {
      try {
        apiClient.post("/good/create_favorite", {
          sellerId: userId,
          textbookId: textbook?.id,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        apiClient.post("/good/delete_favorite", {
          sellerId: userId,
          textbookId: textbook?.id,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <button onClick={heartSubmit}>
      {like ? (
        <FavoriteIcon sx={{ color: "#ff1493", fontSize: 35 }} />
      ) : (
        <FavoriteBorderIcon sx={{ color: "#ff1493", fontSize: 35 }} />
      )}
    </button>
  );
}

export default Heart;
