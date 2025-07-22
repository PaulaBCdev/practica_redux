import TrashImg from "../icons/trash.svg";

interface TrashButtonProps {
  showConfirm: () => void;
}

const TrashButton = ({ showConfirm }: TrashButtonProps) => {
  /*   const handleDeleteAd = async () => {
    await deleteAdvert(id);
    navigate("/", { replace: true });
  }; */

  return (
    <button className="trash-btn" onClick={showConfirm}>
      <img src={TrashImg} alt="Delete ad" />
    </button>
  );
};

export default TrashButton;
