import classNames from "classnames"
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { getPhotos } from "../../API/photos";
import { Photo } from "../../types/Photo";
import { PhotoAlbum } from "../PhotosList/PhotoAlbum";
import "./PhotoPage.scss";

export const PhotosPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [albumId, setAlbumId] = useState<number>(0);
  const [photos, setPhotos] = useState<Photo[]>([]);
  
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getPhotos(albumId)
      .then(PhotosFromServer => setPhotos(PhotosFromServer))
      .finally(() => setIsLoading(false))
  }, [albumId]);

  const onSearch = () => {
    setIsLoading(true);
    setAlbumId(+searchQuery);
  }

  return (
  <div className="photo">
    <div className="control is-expanded photo__fields">
      <input 
        className={classNames(
          'input',
          'photo__field'
        )} 
        type="number"
        placeholder="place album number from 1 to 100" 
        id="input-search"
        value={searchQuery}
        autoCorrect="off"
        onChange={(event) => {
          const { value } = event.target;

          if (+value >= 0 && +value <= 100) {
            setSearchQuery(event.target.value);
          }
        }}
        />
      </div>
      <button 
        className={classNames(
          'button', 
          'is-primary', 
          'photo__button',
          {
            'is-loading': isLoading, 
          }

        )} 
        id="add-btn"
        disabled={+searchQuery === albumId || +searchQuery === 0}
        onClick={onSearch}
      >
        Search
      </button>

      {photos && (
        <div className="photo__album-place">
          {isLoading 
            ? (
              <TailSpin color="#00bfff" height={80} width={80} />
            ) : (
              photos.map(photo => (
                <PhotoAlbum key={photo.id} photo={photo} />
              ))
            ) }
        </div>
      )}
    </div>
  )
}