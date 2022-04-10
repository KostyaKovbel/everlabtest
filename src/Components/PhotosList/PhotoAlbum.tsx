import { Photo } from "../../types/Photo";
import "./PhotoAlbum"

type Props = {
  photo: Photo,
};

export const PhotoAlbum: React.FC<Props> = ({ photo }) => {
  const { title, url } = photo;
  return (
    <div className="photo__place">
      <img src={url} alt={title} />
      <p>{title}</p>
    </div>
  )
}