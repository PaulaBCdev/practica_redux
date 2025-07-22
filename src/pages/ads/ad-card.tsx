import "./ad-card.css";
import Photo from "../../components/ui/photo";
import SellBuyTag from "../../components/ui/sell-buy-tag";
import type { AdvertType } from "./types";
import TagsList from "../../components/ui/tags-list";

interface AdCardProps {
  advert: AdvertType;
}

const AdCard = ({ advert }: AdCardProps) => {
  const { name, sale, price, tags, photo } = advert;
  return (
    <article className="card">
      <div className="img-container">
        <Photo src={photo} />
      </div>

      <SellBuyTag sale={sale} />

      <div className="ad-info">
        <p className="ad-price">{price} EUR</p>
        <p className="ad-name">
          {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
        </p>
      </div>

      <TagsList tags={tags} />
    </article>
  );
};

export default AdCard;
