import "./ad-page.css";
import { useNavigate, useParams } from "react-router";
import Page from "../../components/layout/page";
import { useEffect, useState } from "react";
import Photo from "../../components/ui/photo";
import TagsList from "../../components/ui/tags-list";
import TrashButton from "../../components/ui/trash-button";
import ConfirmDelete from "../../components/ui/confirm-delete";
import { useAppDispatch, useAppSelector } from "../../store";
import { getAdDetail } from "../../store/selectors";
import { adDelete, adsDetail } from "../../store/actions";

function AdvertPage() {
  const params = useParams();
  const ad = useAppSelector(getAdDetail(params.id));
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const adType = ad?.sale ? "sell" : "buy";
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!params.id) {
      navigate("/NotFoundPage", { replace: true });
      return;
    }
    dispatch(adsDetail(params.id));
  }, [params.id, dispatch]);

  const handleShowConfirm = () => {
    setShowConfirm(true);
  };

  const handleDeleteAd = async () => {
    if (ad) {
      dispatch(adDelete(ad.id));
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
