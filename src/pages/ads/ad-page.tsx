import "./ad-page.css";
import { useNavigate, useParams } from "react-router";
import Page from "../../components/layout/page";
import { useEffect, useState } from "react";
import type { AdvertType } from "./types";
import { deleteAdvert, getAdvert } from "./service";
import { AxiosError } from "axios";
import Photo from "../../components/ui/photo";
import TagsList from "../../components/ui/tags-list";
import TrashButton from "../../components/ui/trash-button";
import ConfirmDelete from "../../components/ui/confirm-delete";

function AdvertPage() {
  const params = useParams();
  const [ad, setAd] = useState<AdvertType | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const adType = ad?.sale ? "sell" : "buy";

  useEffect(() => {
    if (!params.id) {
      navigate("/NotFoundPage", { replace: true });
      return;
    }

    getAdvert(params.id)
      .then((ad) => setAd(ad))
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.status === 404) {
            navigate("/NotFoundPage", { replace: true });
          }
        }
      });
  }, [params.id]);

  const handleShowConfirm = () => {
    setShowConfirm(true);
  };

  const handleDeleteAd = async () => {
    if (ad) {
      await deleteAdvert(ad.id);
      navigate("/", { replace: true });
    }
  };

  const handleHideMessage = () => {
    setShowConfirm(false);
  };

  return (
    <Page title="">
      {ad ? (
        <div className="ad-container">
          {showConfirm && (
            <ConfirmDelete
              handleDeleteAd={handleDeleteAd}
              handleHideMessage={handleHideMessage}
            />
          )}
          <div className="ad-img">
            <Photo src={ad.photo} />
          </div>

          <div className="ad-info">
            <div className="name-price-type">
              <div className="name-price">
                <p className="ad-p name">
                  {ad.name.charAt(0).toUpperCase() + ad.name.slice(1)}
                </p>
                <p className="ad-p price">{ad.price} EUR</p>
              </div>

              <div className="sale">
                <p className={`ad-p ad-sale ${adType}`}>
                  {adType.toUpperCase()}
                </p>
              </div>
            </div>

            <div className="tags-trash">
              <TagsList tags={ad.tags} className="ad-tags-list" />
              <div className="trash-container">
                <TrashButton showConfirm={handleShowConfirm} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Ad not available</p>
      )}
    </Page>
  );
}

export default AdvertPage;
