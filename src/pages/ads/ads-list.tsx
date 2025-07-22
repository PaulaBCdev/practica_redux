import { Link } from "react-router";
import type { AdvertType } from "./types";
import AdCard from "./ad-card";

interface AdsListProps {
  list: AdvertType[];
}

const AdsList = ({ list }: AdsListProps) => {
  return list.map((ad) => (
    <li key={ad.id}>
      <Link to={`/adverts/${ad.id}`} className="a adCard">
        <AdCard advert={ad} />
      </Link>
    </li>
  ));
};

export default AdsList;
