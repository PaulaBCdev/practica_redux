import noPhoto from "../../assets/foto-not-available.png";
import "./photo.css";

interface PhotoProps {
  src: string | null;
  alt?: string;
}

const Photo = ({ src, alt }: PhotoProps) => (
  <img className="photo" src={src ?? noPhoto} alt={alt ?? "photo"} />
);

export default Photo;
