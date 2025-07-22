import "./confirm-delete.css";
import Button from "./button";

interface ConfirmDeleteProps {
  handleDeleteAd: () => void;
  handleHideMessage: () => void;
}

const ConfirmDelete = ({
  handleDeleteAd,
  handleHideMessage,
}: ConfirmDeleteProps) => {
  return (
    <div className="confirm-bg">
      <article className="confirm-card">
        <p className="confirm-p">Are you sure you want to delete this ad?</p>
        <div className="confirm-btns">
          <Button className="confirm-yes-btn" onClick={handleDeleteAd}>
            YES
          </Button>
          <Button className="confirm-no-btn" onClick={handleHideMessage}>
            NO
          </Button>
        </div>
      </article>
    </div>
  );
};

export default ConfirmDelete;
